<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <!-- Name input -->
        <div>
          <label class="block text-gray-700 mb-1" for="name">Full Name</label>
          <input
              id="name"
              v-model="name"
              type="text"
              placeholder="Your name"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
          />
        </div>

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
              placeholder="Enter a password"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
          />
        </div>

        <!-- Confirm Password input -->
        <div>
          <label class="block text-gray-700 mb-1" for="confirmPassword">Confirm Password</label>
          <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
          />
        </div>

        <!-- Submit button -->
        <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold"
        >
          Register
        </button>
      </form>

      <!-- Footer links -->
      <p class="text-sm text-gray-500 mt-4 text-center">
        Already have an account?
        <NuxtLink to="/login" class="text-blue-600 hover:underline">Sign In</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

function handleRegister() {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match!')
    return
  }
  // Replace with your register logic
  console.log('Name:', name.value)
  console.log('Email:', email.value)
  console.log('Password:', password.value)
}
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>
