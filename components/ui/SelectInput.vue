<template>
  <Select>
    <SelectTrigger>
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem v-for="option in options" :value="option.value">
          {{ option.label }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Option = {
  label: string;
  value: string;
};

type Props = {
  placeholder?: string;
  options: Option[];
};

defineProps<Props>();
</script>
