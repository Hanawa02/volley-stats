<template>
  <div>
    <div class="bg-orange-300 border-blue-600 border-4">
      <section><slot name="opponent">Opponent Team</slot></section>
      <section class="bg-white w-full h-2 border-blue-600 border-y-2"></section>
      <section class="grid grid-cols-3">
        <div :class="attackAreaStyle"><slot name="rotation-4">4</slot></div>
        <div :class="attackAreaStyle"><slot name="rotation-3">3</slot></div>
        <div :class="attackAreaStyle"><slot name="rotation-2">2</slot></div>
        <hr class="col-span-3 border-blue-600 border-t-2" />
        <div :class="defenseAreaStyle">
          <slot name="rotation-5">5</slot>
        </div>
        <div :class="defenseAreaStyle"><slot name="rotation-6">6</slot></div>
        <div :class="defenseAreaStyle"><slot name="rotation-1">1</slot></div>
      </section>
    </div>
    <section
      v-if="hasLibero1Slot || hasLibero2Slot"
      class="flex bg-blue-200 border-x-4 border-b-4 border-dashed border-blue-600"
    >
      <slot name="rotation-libero-1"></slot>
      <slot name="rotation-libero-2"></slot>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from "vue";
const defenseAreaStyle = "aspect-[2/3] border border-orange-200/20";
const attackAreaStyle = "aspect-square border border-orange-200/20";

const slots = useSlots();
const hasLibero1Slot = computed(() => slots["rotation-libero-1"] !== undefined);
const hasLibero2Slot = computed(() => slots["rotation-libero-2"] !== undefined);

const rotation1AreaStyle = computed(() => {
  if (hasLibero1Slot.value && hasLibero2Slot.value) {
    return [defenseAreaStyle, "grid grid-rows-3"];
  }

  if (hasLibero1Slot.value || hasLibero2Slot.value) {
    return [defenseAreaStyle, "grid grid-rows-2"];
  }

  return defenseAreaStyle;
});
</script>
