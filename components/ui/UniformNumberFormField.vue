<template>
  <FormField v-slot="{ value }" :name="name">
    <FormItem class="w-full">
      <FormLabel>
        <slot name="label"></slot>
      </FormLabel>
      <FormControl>
        <TagsInput :model-value.camel="value" :convertValue="removeNonNumbers">
          <TagsInputItem v-for="item in value" :key="item" :value="item">
            <TagsInputItemText />
            <TagsInputItemDelete />
          </TagsInputItem>

          <TagsInputInput placeholder="Type the uniform numbers with enter after each one" />
        </TagsInput>
      </FormControl>
    </FormItem>
  </FormField>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from "@/components/ui/tags-input";

type Props = {
  name: string;
};

const props = defineProps<Props>();
const removeNonNumbers = (value: string) => {
  const result = parseInt(value, 10);

  if (isNaN(result)) {
    return "";
  }

  return value;
};
</script>
