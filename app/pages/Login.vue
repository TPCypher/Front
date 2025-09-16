<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Sign In</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <!-- Email input -->
        <div>
          <label class="block text-gray-700 mb-1" for="email">Email</label>
          <input
              id="email"
              v-model="email"
              type="email"
              placeholder="you@example.com"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
          />
        </div>

        <!-- Password input -->
        <div>
          <label class="block text-gray-700 mb-1" for="password">Password</label>
          <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Enter your password"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
          />
        </div>

        <!-- Submit button -->
        <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold"
        >
          Sign In
        </button>
      </form>

      <!-- Footer links -->
      <p class="text-sm text-gray-500 mt-4 text-center">
        Don't have an account?
        <NuxtLink to="/register" class="text-blue-600 hover:underline">Sign Up</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

function handleLogin() {
  // Replace with your login logic
  console.log('Email:', email.value)
  console.log('Password:', password.value)
}
</script>

<style>
/* Optional: add smooth font rendering */
body {
  font-family: 'Inter', sans-serif;
}
</style>
