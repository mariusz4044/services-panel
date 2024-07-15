<script setup>
const props = defineProps(["title", "href", "icon", "active"]);
</script>

<template>
  <router-link
    :to="props.href"
    active-class="active"
    class="mx-3 h-1/1 flex flex-col items-center text-gray-500 hover-nav"
  >
    <i :class="['fa-regular', icon]"></i>
    <label class="text-xl mt-0.5">{{ props.title }}</label>
  </router-link>
</template>

<style scoped>
.hover-nav {
  @apply hover:cursor-pointer hover:text-violet-500 hover:text-opacity-75 duration-200;
}
</style>
