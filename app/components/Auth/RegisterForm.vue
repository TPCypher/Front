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
          @input="checkEntropy"
          type="password"
          placeholder="Enter a password"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
      />
      <p :class="entropyColor" class="mt-1 text-sm">
        {{ entropyLabel }}
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

<script setup>
import { ref } from 'vue'

// Fields
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const entropy = ref(0) // Entropy value
const entropyLabel = ref('Too weak')
const entropyColor = ref('text-red-600')

function checkEntropy() {
  const pwd = password.value
  if (!pwd) {
    entropy.value = 0
    entropyLabel.value = ''
    entropyColor.value = ''
    return
  }

  let R = 0
  if (/[a-z]/.test(pwd)) R += 26
  if (/[A-Z]/.test(pwd)) R += 26
  if (/[0-9]/.test(pwd)) R += 10
  if (/[^a-zA-Z0-9]/.test(pwd)) R += 32

  entropy.value = pwd.length * Math.log2(R)

  if (entropy.value < 28) {
    entropyLabel.value = 'Very Weak'
    entropyColor.value = 'text-red-600'
  } else if (entropy.value < 36) {
    entropyLabel.value = 'Weak'
    entropyColor.value = 'text-orange-500'
  } else if (entropy.value < 60) {
    entropyLabel.value = 'Reasonable'
    entropyColor.value = 'text-yellow-500'
  } else if (entropy.value < 128) {
    entropyLabel.value = 'Strong'
    entropyColor.value = 'text-green-600'
  } else {
    entropyLabel.value = 'Very Strong'
    entropyColor.value = 'text-green-800'
  }
}

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
