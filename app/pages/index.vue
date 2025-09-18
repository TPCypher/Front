<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated'],
})

const { user, clear: clearSession } = useUserSession()

async function logout() {
  await clearSession()
  await navigateTo('/login')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
      <!-- Welcome -->
      <h1 class="text-2xl font-bold text-gray-800">
        Welcome back,
        <span class="text-indigo-600">{{ user?.username }}</span> 👋
      </h1>
      <p class="mt-2 text-gray-500">
        You are logged in with <span class="font-medium">{{ user?.email }}</span>
      </p>

      <!-- Profile icon -->
      <div class="mt-6 flex justify-center">
        <div class="h-20 w-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
          {{ user?.username?.charAt(0).toUpperCase() }}
        </div>
      </div>

      <!-- Buttons -->
      <div class="mt-8 space-y-3">
        <button
            @click="logout"
            class="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl shadow transition"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>
