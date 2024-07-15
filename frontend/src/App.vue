<template>
  <NavBar></NavBar>
  <div id="app-view" class="bg-green-600 rounded-xl relative">
    <router-view />
  </div>
</template>

<style>
body {
  background: #0c1625;
  color: white;
  font-family: "system-ui";
}

#app-view {
  background: #1d1f24;
  margin: 10px;
  width: calc(100dvw - 20px);
  height: calc(100dvh - 4rem - 20px);
}

.inset-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

<script setup>
import NavBar from "@/components/NavBar/NavBar.vue";
</script>
