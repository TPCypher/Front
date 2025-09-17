<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Sign In</h2>

      <AuthLoginForm />

      <p class="text-sm text-gray-500 mt-4 text-center">
        Don't have an account?
        <NuxtLink to="/register" class="text-blue-600 hover:underline">Sign Up</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import AuthLoginForm from '~/components/Auth/LoginForm.vue'
</script>