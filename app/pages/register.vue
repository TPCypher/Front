<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>

      <AuthRegisterForm />

      <p class="text-sm text-gray-500 mt-4 text-center">
        Already have an account?
        <NuxtLink to="/login" class="text-blue-600 hover:underline">Sign In</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import AuthRegisterForm from '~/components/Auth/RegisterForm.vue'
</script>
