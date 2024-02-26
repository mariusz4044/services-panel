<template>
  <img :src="userAvatar" alt=" user avatar" />
</template>

<script setup>
import { onMounted, inject } from "vue";
const user = inject("$user");

const userAvatar = require(`@/assets/${user.avatar}`);
</script>
