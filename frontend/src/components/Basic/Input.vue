<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  text: String,
  icon: String,
});
</script>

<template>
  <div class="w-full flex flex-col relative">
    <label class="text-sm text-gray-400 my-1">{{ props.text }} </label>
    <div v-if="props.icon" class="absolute bottom-1 right-1.5 text-gray-400">
      <i :class="props.icon"></i>
    </div>
    <input type="text" class="bg-transparent" />
  </div>
</template>

<style scoped>
input {
  outline: none;
}
</style>
