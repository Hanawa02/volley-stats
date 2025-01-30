<template>
  <FormField v-slot="{ value, handleChange }" :name="name">
    <FormItem
      class="flex flex-row items-center justify-between rounded-lg border p-4"
    >
      <div class="space-y-0.5 pr-4">
        <FormLabel class="text-base">
          <slot name="label" />
        </FormLabel>
        <FormDescription>
          <slot name="description" />
        </FormDescription>
      </div>
      <FormControl>
        <Switch :checked="value" aria-readonly @update:checked="handleChange" />
      </FormControl>
    </FormItem>
  </FormField>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Switch } from "~/components/ui/switch";

type Props = {
  name: string;
};

defineProps<Props>();
</script>
