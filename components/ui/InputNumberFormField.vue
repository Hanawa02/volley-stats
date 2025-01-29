<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem>
      <FormLabel>
        <slot name="label"></slot>
      </FormLabel>
      <NumberField v-bind="{ ...componentField, ...delegatedProps }">
        <NumberFieldContent>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldContent>
      </NumberField>
      <FormMessage />
    </FormItem>
  </FormField>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, useSlots, computed } from "vue";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import type { NumberFieldRootProps } from "radix-vue";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "~/components/ui/number-field";
import { Input } from "~/components/ui/input";

type Props = {
  name: string;
} & NumberFieldRootProps;

const props = withDefaults(defineProps<Props>(), {
  type: "text",
});

const delegatedProps = computed(() => {
  const { class: _, name: __, ...delegated } = props;

  return delegated;
});

const slots = useSlots();
const hasDescriptionSlot = computed(() => {
  return !!slots.description;
});
</script>
