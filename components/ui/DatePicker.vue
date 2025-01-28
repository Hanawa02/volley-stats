<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(
            'flex w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground'
          )
        "
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <template v-if="hasValue">{{ formatedValue }}</template>
        <template v-else-if="hasPlaceholder">
          <slot name="placeholder" />
        </template>
        <template v-else>{{ date_picker_default_placeholder() }}</template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto max-w-sm p-0">
      <FancyCalendar
        :value="calendarValue"
        @update:model-value="updateValue"
        initial-focus
      />
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { Button } from "~/components/ui/button";
import FancyCalendar from "~/components/ui/FancyCalendar.vue";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { languageTag } from "~/i18n/generated/runtime.js";

import { cn } from "~/lib/utils";
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from "@internationalized/date";
import { Calendar as CalendarIcon } from "lucide-vue-next";
import { computed, defineModel } from "vue";
import { date_picker_default_placeholder } from "translations";

const df = new DateFormatter(languageTag(), {
  dateStyle: "long",
});

const value = defineModel<Date>();

const slots = useSlots();
const hasPlaceholder = computed(() => !!slots.placeholder);

const hasValue = computed(() => !!value.value);

const calendarValue = computed(() => {
  return value.value ? new Date(value.value) : new Date();
});

const updateValue = (data: DateValue | undefined) => {
  if (!data) {
    value.value = undefined;
    return;
  }

  value.value = data.toDate(getLocalTimeZone());
};

const formatedValue = computed(() => {
  return value.value ? df.format(value.value) : "";
});
</script>
