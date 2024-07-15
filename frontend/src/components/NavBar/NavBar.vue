<script setup>
import { ref, onMounted, inject } from "vue";
import Avatar from "@/components/User/Avatar.vue";
import TokenIcon from "@/components/User/TokenIcon.vue";
import LogoIcon from "@/components/Main/LogoIcon.vue";
import DepositButton from "@/components/NavBar/DepositButton.vue";
import LoginForm from "@/components/Login/LoginForm.vue";
import NavItem from "@/components/NavBar/NavItem.vue";

const user = inject("$user");
const showLoginForm = ref(false);

onMounted(() => {});
</script>

<template>
  <div class="w-1/1 h-16 shadow-lg" id="nav-bar">
    <nav class="flex flex-row mx-14 items-center h-16 justify-between">
      <div class="flex">
        <LogoIcon class="w-32 h-auto" />
      </div>
      <div class="flex">
        <NavItem href="/home" title="Home" icon="fa-folder"></NavItem>
        <NavItem
          href="/contact"
          title="Contact"
          icon="fa-address-book"
        ></NavItem>
      </div>
      <div class="flex flex-row h-16 items-center" v-if="user.nick">
        <DepositButton @click="user.tokens--" />
        <div
          class="flex flex-row ml-5 items-center justify-center p-4 bg-gray-900 h-8 rounded border border-gray-700 font-bold tracking-wide"
        >
          <label class="mr-1.5">{{ user.tokens }}</label>
          <TokenIcon class="w-4 h-4" />
        </div>
        <Avatar class="w-12 h-12 ml-5 bg-amber-700 rounded-3xl" />
      </div>
      <div class="flex flex-row h-16 items-center" v-if="!user.nick">
        <button
          class="px-2 h-10 bg-green-600 rounded font-bold hover:bg-green-700 transition duration-200 flex flex-row items-center justify-center active:scale-95"
          @click="showLoginForm = !showLoginForm"
        >
          <label>Join now</label>
          <i class="fa-solid fa-arrow-right-to-bracket mx-2 relative"></i>
        </button>
        <LoginForm v-if="showLoginForm" />
      </div>
    </nav>
  </div>
</template>

<style scoped>
#nav-bar {
  background: #131417;
}
</style>
