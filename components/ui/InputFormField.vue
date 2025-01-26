<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem>
      <FormLabel>
        <slot name="label"></slot>
      </FormLabel>
      <FormControl>
        <Input
          :type="type"
          :placeholder="placeholder"
          v-bind="componentField"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, useSlots, computed } from "vue";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

type Props = {
  name: string;
  type?: string;
  placeholder?: string;
};

withDefaults(defineProps<Props>(), {
  type: "text",
});

const slots = useSlots();
const hasDescriptionSlot = computed(() => {
  return !!slots.description;
});
</script>
