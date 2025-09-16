<template>
  <form @submit.prevent="handleLogin" class="space-y-4">
    <!-- Email input -->
    <div>
      <label class="block text-gray-700 mb-1" for="email">Email</label>
      <input
          id="email"
          v-model="email"
          type="email"
          placeholder="exemple@gmail.com"
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

    <!-- Error -->
    <p v-if="errorMessage" class="text-red-600 text-sm">{{ errorMessage }}</p>

    <!-- Submit button -->
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
import { useRouter } from 'vue-router'


const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

async function handleLoginasync(event) {
  const body = await readBody(event)
  try {
    // Example: call your backend login API
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    })
    // If backend returns JWT
    if (response.token) {
      // Save in session cookie
      setUserSession(event, {
        user: { email: body.email },
        token: response.token
      })
      router.push('/'); // redirection Home page
    } else {
      errorMessage.value = 'Invalid credentials.'
    }
  } catch (err) {
    errorMessage.value = err?.data?.message || 'Login failed.'
  }
}
</script>
