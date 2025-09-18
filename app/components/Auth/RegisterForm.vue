<template>
  <form @submit.prevent="register" class="space-y-4">
    <!-- Name input -->
    <div>
      <label class="block text-gray-700 mb-1" for="username">Full Name</label>
      <input
          id="username"
          v-model="username"
          type="text"
          placeholder="Your username"
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
          placeholder="test@gmail.com"
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
          @input="e => { checkEntropy((e.target as HTMLInputElement).value); validatePassword()}"
          type="password"
          placeholder="Enter a password"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
      />

      <!-- Inline messages -->
      <p :class="entropyColor" class="mt-1 text-sm">
        {{ entropyLabel }}
      </p>
      <div v-if="passwordErrors.length" class="text-red-600 text-sm mt-1">
        <ul class="list-disc list-inside">
          <li v-for="(err, idx) in passwordErrors" :key="idx">{{ err }}</li>
        </ul>
      </div>

      <!-- Progress bar -->
      <div class="w-full h-2 bg-gray-200 rounded mt-2">
        <div
            class="h-2 rounded transition-all duration-300"
            :class="entropyBg"
            :style="{ width: `${progressValue}%` }"
        ></div>
      </div>

      <p class="text-gray-600 text-sm mt-1">
        Redundancy: {{ (redundancyRatio * 100).toFixed(3) }} %
      </p>
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
      <p v-if="confirmError" class="text-red-600 text-sm mt-1">{{ confirmError }}</p>
    </div>

    <!-- Submit button -->
    <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold"
    >
      Register
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import {
  entropy,
  entropyColor,
  checkEntropy,
  entropyLabel,
  entropyBg,
  redundancyRatio
} from '~/utils/entropy'

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

// Error messages
const passwordErrors = ref<string[]>([])
const confirmError = ref('')

const credentials = reactive({
  username,
  email,
  password,
})

const progressValue = computed(() => Math.min((entropy.value / 128) * 100, 100))

// Password validation function
function validatePassword() {
  const pwd = password.value
  const errors: string[] = []

  if (pwd.length < 12) errors.push('Password must be at least 12 characters.')
  if (!/[A-Z]/.test(pwd)) errors.push('Include at least one uppercase letter.')
  if (!/[a-z]/.test(pwd)) errors.push('Include at least one lowercase letter.')
  if (!/[0-9]/.test(pwd)) errors.push('Include at least one number.')
  if (!/[\W_]/.test(pwd)) errors.push('Include at least one special character.')

  if(entropy.value < 100) errors.push('Password entropy is too low.')

  passwordErrors.value = errors
}

async function register() {
  // Confirm password check
  if (password.value !== confirmPassword.value) {
    confirmError.value = 'Passwords do not match!'
    return
  } else {
    confirmError.value = ''
  }

  // Password errors
  validatePassword()
  if (passwordErrors.value.length > 0) return

  const config = useRuntimeConfig()


  // Submit request
  $fetch(`http://back.localhost/api/utilisateur/register`, {
    method: 'POST',
    body: credentials,
  }).then(async () => {
    await navigateTo('/login')
  }).catch((reason) => {
    confirmError.value = reason;
  })
}

</script>
