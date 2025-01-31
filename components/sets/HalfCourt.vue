<template>
  <div class="bg-orange-300 border-blue-600 border-4">
    <section><slot name="opponent">Opponent Team</slot></section>
    <section class="bg-white w-full h-2 border-blue-600 border-y-2"></section>
    <section class="grid grid-cols-3">
      <div :class="attackAreaStyle"><slot name="rotation-4">4</slot></div>
      <div :class="attackAreaStyle"><slot name="rotation-3">3</slot></div>
      <div :class="attackAreaStyle"><slot name="rotation-2">2</slot></div>
      <hr class="col-span-3 border-blue-600 border-t-2" />
      <div :class="defenseAreaStyle"><slot name="rotation-5">5</slot></div>
      <div :class="defenseAreaStyle"><slot name="rotation-6">6</slot></div>
      <div :class="defenseAreaStyle"><slot name="rotation-1">1</slot></div>
    </section>
  </div>
</template>

<script setup lang="ts">
const defenseAreaStyle = "aspect-[2/3]";
const attackAreaStyle = "aspect-square";
</script>
