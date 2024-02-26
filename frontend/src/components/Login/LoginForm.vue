<script setup>
import Input from "@/components/Basic/Input.vue";
</script>

<template>
  <Teleport to="#app-view">
    <form
      class="absolute flex flex-col inset-center w-1/6 min-w-max bg-gray-800 items-center px-10 py-10 rounded shadow-sm shadow-black"
    >
      <h2 class="text-3xl mb-10">Register</h2>
      <Input
        text="Enter your login"
        class="login-input"
        icon="fa-solid fa-user"
      />
      <Input
        text="Enter your Password"
        class="login-input"
        icon="fa-solid fa-lock"
      />
      <Input
        text="Repeat your password"
        class="login-input"
        icon="fa-solid fa-lock"
      />
      <Input
        text="Enter referal code (optional)"
        class="login-input"
        icon="fa-solid fa-gift"
      />
      <label for="termsCheckbox" class="mt-5 flex items-center">
        <input
          type="checkbox"
          name="termsCheckbox"
          class="accent-blue-500 mt-0.5"
        />
        <span class="ml-2 text-sm"> Accept terms and conditions </span>
      </label>
      <button
        type="submit"
        class="mt-10 bg-blue-800 w-full h-11 rounded border-2 border-blue-700 hover:bg-blue-900 transition duration-300 hover:scale-1.05 active:bg-blue-800 active:scale-105 font-bold text-lg tracking-wide"
      >
        Register
      </button>
    </form>
  </Teleport>
</template>

<style scoped>
.login-input {
  @apply my-2 w-full border-b-2 border-gray-500 hover:border-blue-400 transition duration-300;
}
</style>
