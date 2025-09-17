<template>
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
          @input="e => checkEntropy((e.target as HTMLInputElement).value)"
          type="password"
          placeholder="Enter a password"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
      />
      <!-- Label -->
      <p :class="entropyColor" class="mt-1 text-sm">
        {{ entropyLabel }}
      </p>

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
import { ref } from 'vue'
import {entropy, entropyColor, checkEntropy, entropyLabel, entropyBg, redundancyRatio} from "~/utils/entropy";

// Fields ref
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')


// Compute progress percentage (cap at 100%)
const progressValue = computed(() => {
  return Math.min((entropy.value / 128) * 100, 100);
});

// method to handle register action
function handleRegister() {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match!')
    return
  }
  if (entropy.value < 75) { // Entropy value to low
    alert('Password is too weak. Please choose a stronger one.')
    return
  }
  console.log('Registered:', { name: name.value, email: email.value })
}
</script>
