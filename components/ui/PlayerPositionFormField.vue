<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem class="w-full">
      <FormLabel>
        <slot name="label"></slot>
      </FormLabel>
      <FormControl>
        <SelectInput :options="playerPositionOptions" v-bind="componentField" />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import SelectInput, { type Option } from "~/components/ui/SelectInput.vue";
import {
  access_type_admin,
  access_type_statistics,
  access_type_read_only,
  player_position_coach,
  player_position_libero,
  player_position_setter,
  player_position_middle_blocker,
  player_position_opposite_hitter,
  player_position_outside_hitter,
} from "translations";

type Props = {
  name: string;
};

const props = defineProps<Props>();

const playerPositionOptions = computed<Option[]>(() => [
  { label: player_position_coach(), value: "coach" },
  { label: player_position_libero(), value: "libero" },
  { label: player_position_setter(), value: "setter" },
  { label: player_position_middle_blocker(), value: "middle_blocker" },
  { label: player_position_opposite_hitter(), value: "opposite_hitter" },
  { label: player_position_outside_hitter(), value: "outside_hitter" },
]);
</script>
