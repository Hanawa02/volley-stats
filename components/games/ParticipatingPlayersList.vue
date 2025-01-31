<template>
  <div class="w-full">
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <template v-for="row in table.getRowModel().rows" :key="row.id">
              <TableRow :data-state="row.getIsSelected() && 'selected'">
                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                  <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                </TableCell>
              </TableRow>
              <TableRow v-if="row.getIsExpanded()">
                <TableCell :colspan="row.getAllCells().length">
                  {{ JSON.stringify(row.original) }}
                </TableCell>
              </TableRow>
            </template>
          </template>

          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 md:text-center">
              {{ members_table_no_players_added() }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="flex items-center justify-end space-x-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground">
        {{ table.getFilteredSelectedRowModel().rows.length }} of
        {{ table.getFilteredRowModel().rows.length }} row(s) selected.
      </div>
      <div class="space-x-2">
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          {{ members_table_previous_button() }}
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          {{ members_table_next_button() }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";

import AddMemberDialog from "~/components/teams/AddMemberDialog";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { valueUpdater } from "~/lib/utils";
import {
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import { ArrowUpDown, ChevronDown } from "lucide-vue-next";
import { h, ref, shallowRef } from "vue";

import type { ParticipatingPlayer } from "~/composables/games";
import type { TeamMember } from "~/composables/teams";
import { defineModel } from "vue";
import {
  members_table_filter_placeholder,
  members_table_next_button,
  members_table_no_players_added,
  members_table_previous_button,
  members_table_add_players_button,
  members_table_remove_players_button,
  members_table_select_all_members_aria_label,
  members_table_select_row_member_aria_label,
  members_table_header_player_name,
  members_table_header_player_uniform_numbers,
  members_table_header_player_access_type,
  members_table_header_player_positions,
} from "translations";
import type { Row, Table as TableType } from "@tanstack/vue-table";
import { useUsers } from "~/composables/usersConnections";

import { Badge } from "~/components/ui/badge";
import { playerPositionTranslation } from "~/utils/player-position";
import { memberTypeTranslation } from "~/utils/member-type";

const { users, loadUsers } = useUsers();

const selectedPlayers = defineModel<ParticipatingPlayer[]>();

type Props = {
  teamId: string;
};

const props = defineProps<Props>();

const client = useSupabaseClient();

const { data: allPlayers } = await useAsyncData("allPlayers", async () => {
  if (!props.teamId) {
    return [];
  }

  const { data } = await client
    .from("team_members")
    .select("*")
    .eq("team_id", props.teamId)
    .order("created_at");

  return data ?? [];
});

const convertToParticipatingPlayer = (player: TeamMember): ParticipatingPlayer => ({
  playerId: player.id,
  name: player.name,
  uniformNumber: player.uniform_number,
});

const togglePlayer = (player: TeamMember, value: boolean) => {
  if (value) {
    selectedPlayers.value.push(convertToParticipatingPlayer(player));
  } else {
    selectedPlayers.value = selectedPlayers.value.filter((p) => p.playerId !== player.id);
  }
};

const toggleAllPlayers = (value: boolean) => {
  allPlayers.value.forEach((player) => togglePlayer(player, value));
};

const columns: ColumnDef<TeamMember>[] = [
  {
    id: "select",
    header: ({ table }: { table: TableType<TeamMember> }) =>
      h(Checkbox, {
        checked:
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate"),
        "onUpdate:checked": (value: boolean) => {
          table.toggleAllPageRowsSelected(!!value);
          toggleAllPlayers(value);
        },
        ariaLabel: members_table_select_all_members_aria_label(),
      }),
    cell: ({ row }: { row: Row<TeamMember> }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        "onUpdate:checked": (value: boolean) => {
          row.toggleSelected(!!value);
          togglePlayer(row.original, value);
        },
        ariaLabel: members_table_select_row_member_aria_label(),
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => [members_table_header_player_name(), h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }: { row: Row<TeamMember> }) => {
      return h("div", { class: "capitalize" }, row.original.name);
    },
  },
  {
    accessorKey: "uniformNumber",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => [
          members_table_header_player_uniform_numbers(),
          h(ArrowUpDown, { class: "ml-2 h-4 w-4" }),
        ]
      );
    },
    cell: ({ row }: { row: Row<TeamMember> }) => {
      return h("div", { class: "flex flex-wrap gap-1" }, [
        h(Badge, { variant: "outline" }, () => row.original.uniform_number),
      ]);
    },
  },
  {
    accessorKey: "positions",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => [members_table_header_player_positions(), h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => {
      return h(
        "div",
        { class: "capitalize" },
        (row.original.positions ?? [])
          .map((position) => playerPositionTranslation(position))
          .join(", ")
      );
    },
  },
];

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const expanded = ref<ExpandedState>({});

const table = useVueTable({
  data: allPlayers,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
  onExpandedChange: (updaterOrValue) => valueUpdater(updaterOrValue, expanded),
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
    get columnVisibility() {
      return columnVisibility.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
    get expanded() {
      return expanded.value;
    },
  },
});
</script>
