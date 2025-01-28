<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button size="auto" variant="outline" role="combobox" :aria-expanded="open" class="w-full">
        <div v-if="value?.length > 0" class="flex gap-1 flex-wrap">
          <Badge v-for="v in value">{{
            options.find((option) => option.value === v)?.label
          }}</Badge>
        </div>
        <p v-else>
          <slot name="placeholder"> {{ combo_box_placeholder() }}</slot>
        </p>
        {{ value ? options.find((option) => option.value === value)?.label : "Select option..." }}
        <ChevronsUpDown class="ml-auto h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0">
      <Command>
        <CommandInput class="h-9" placeholder="Search option..." />
        <CommandEmpty>
          <slot name="no-option-found"> {{ combo_box_no_option_found() }} </slot>
        </CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              @select="handleSelect(option.value)"
            >
              <Check
                :class="
                  cn('h-4 w-4 mr-2', value?.includes(option.value) ? 'opacity-100' : 'opacity-0')
                "
              />
              {{ option.label }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { Badge } from "~/components/ui/badge";

import { combo_box_placeholder, combo_box_no_option_found } from "translations";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { Check, ChevronsUpDown } from "lucide-vue-next";

export type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
};

const props = defineProps<Props>();
const value = defineModel<string[]>();
const open = ref(false);

const handleSelect = (newValue: string) => {
  const valueAlreadySelected = value.value?.includes(newValue);
  if (valueAlreadySelected) {
    value.value = value.value?.filter((v) => v !== newValue);
  } else {
    value.value = [...(value.value || []), newValue];
  }
};
</script>
