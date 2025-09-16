<template>
  <form @submit.prevent="handleLogin" class="space-y-4">
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

    <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold"
    >
      Sign In
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

function handleLogin() {
  console.log('Login:', { email: email.value, password: password.value })
}
</script>
