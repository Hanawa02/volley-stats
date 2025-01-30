<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem>
      <FormLabel>
        <slot name="label"></slot>
      </FormLabel>
      <FormControl>
        <DatePicker v-bind="componentField">
          <template v-if="hasPlaceholder" v-slot:placeholder>
            <slot name="placeholder"></slot>
          </template>
        </DatePicker>
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
import DatePicker from "~/components/ui/DatePicker.vue";

type Props = {
  name: string;
  placeholder?: string;
};

defineProps<Props>();

const slots = useSlots();
const hasPlaceholder = computed(() => {
  return !!slots.placeholder;
});
</script>
