<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem class="w-full">
      <FormLabel>
        <slot name="label"></slot>
      </FormLabel>
      <FormControl>
        <SelectInput :options="accessTypeOptions" v-bind="componentField" />
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
import { access_type_admin, access_type_statistics, access_type_read_only } from "translations";

type Props = {
  name: string;
};

const props = defineProps<Props>();

const accessTypeOptions = computed<Option[]>(() => [
  { label: access_type_admin(), value: "admin" },
  { label: access_type_statistics(), value: "statistics" },
  { label: access_type_read_only(), value: "read_only" },
]);
</script>
