<template>
  <div class="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center p-4">
    <div class="max-w-xl w-full bg-zinc-800 rounded-lg p-8">
      <h1 class="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
        How do I know it's you?
      </h1>

      <p class="text-center text-zinc-400 mb-8">
        Let's see if you remember these special moments...
      </p>

      <form @submit.prevent="checkAnswers" class="space-y-8">
        <div>
          <label class="block text-sm font-medium text-zinc-300 mb-2">
            When did we first meet?
          </label>
          <div class="flex gap-2 justify-center">
            <div class="flex gap-2">
              <input
                ref="month1"
                v-model="date.month1"
                maxlength="1"
                @input="handleDateInput($event, 'month1', 'month2')"
                @keydown.delete="handleDelete($event, 'month1', null)"
                type="text"
                class="w-12 h-12 text-center rounded-lg bg-zinc-700 text-white border border-zinc-600 focus:border-purple-400 focus:outline-none text-xl"
              />
              <input
                ref="month2"
                v-model="date.month2"
                maxlength="1"
                @input="handleDateInput($event, 'month2', 'day1')"
                @keydown.delete="handleDelete($event, 'month2', 'month1')"
                type="text"
                class="w-12 h-12 text-center rounded-lg bg-zinc-700 text-white border border-zinc-600 focus:border-purple-400 focus:outline-none text-xl"
              />
            </div>
            <div class="flex items-center text-zinc-400">-</div>
            <div class="flex gap-2">
              <input
                ref="day1"
                v-model="date.day1"
                maxlength="1"
                @input="handleDateInput($event, 'day1', 'day2')"
                @keydown.delete="handleDelete($event, 'day1', 'month2')"
                type="text"
                class="w-12 h-12 text-center rounded-lg bg-zinc-700 text-white border border-zinc-600 focus:border-purple-400 focus:outline-none text-xl"
              />
              <input
                ref="day2"
                v-model="date.day2"
                maxlength="1"
                @input="handleDateInput($event, 'day2', 'year1')"
                @keydown.delete="handleDelete($event, 'day2', 'day1')"
                type="text"
                class="w-12 h-12 text-center rounded-lg bg-zinc-700 text-white border border-zinc-600 focus:border-purple-400 focus:outline-none text-xl"
              />
            </div>
            <div class="flex items-center text-zinc-400">-</div>
            <div class="flex gap-2">
              <input
                ref="year1"
                v-model="date.year1"
                maxlength="1"
                @input="handleDateInput($event, 'year1', 'year2')"
                @keydown.delete="handleDelete($event, 'year1', 'day2')"
                type="text"
                class="w-12 h-12 text-center rounded-lg bg-zinc-700 text-white border border-zinc-600 focus:border-purple-400 focus:outline-none text-xl"
              />
              <input
                ref="year2"
                v-model="date.year2"
                maxlength="1"
                @input="handleDateInput($event, 'year2', 'year3')"
                @keydown.delete="handleDelete($event, 'year2', 'year1')"
                type="text"
                class="w-12 h-12 text-center rounded-lg bg-zinc-700 text-white border border-zinc-600 focus:border-purple-400 focus:outline-none text-xl"
              />
              <input
                ref="year3"
                v-model="date.year3"
                maxlength="1"
                @input="handleDateInput($event, 'year3', 'year4')"
                @keydown.delete="handleDelete($event, 'year3', 'year2')"
                type="text"
                class="w-12 h-12 text-center rounded-lg bg-zinc-700 text-white border border-zinc-600 focus:border-purple-400 focus:outline-none text-xl"
              />
              <input
                ref="year4"
                v-model="date.year4"
                maxlength="1"
                @input="handleDateInput($event, 'year4', null)"
                @keydown.delete="handleDelete($event, 'year4', 'year3')"
                type="text"
                class="w-12 h-12 text-center rounded-lg bg-zinc-700 text-white border border-zinc-600 focus:border-purple-400 focus:outline-none text-xl"
              />
            </div>
          </div>
          <div class="flex justify-center gap-20 mt-2 text-xs text-zinc-400">
            <span>MM</span>
            <span>DD</span>
            <span>YYYY</span>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-zinc-300 mb-2">
            What movie did we watch on our first date?
          </label>
          <input
            v-model="movieAnswer"
            type="text"
            class="w-full p-3 rounded-lg bg-zinc-700 text-white border border-zinc-600 focus:border-purple-400 focus:outline-none"
            placeholder="Enter your answer..."
          />
        </div>

        <div v-if="error" class="text-red-400 text-sm text-center">
          {{ error }}
        </div>

        <button
          type="submit"
          class="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const movieAnswer = ref('')
const error = ref('')

const date = ref({
  month1: '',
  month2: '',
  day1: '',
  day2: '',
  year1: '',
  year2: '',
  year3: '',
  year4: ''
})

const month1 = ref(null)
const month2 = ref(null)
const day1 = ref(null)
const day2 = ref(null)
const year1 = ref(null)
const year2 = ref(null)
const year3 = ref(null)
const year4 = ref(null)

const handleDateInput = (event, current, next) => {
  // Get the input value and limit to one character
  event.target.value = event.target.value.slice(-1)
  const value = event.target.value

  // Only allow numbers
  if (/^[0-9]$/.test(value)) {
    date.value[current] = value

    // Move to next input if available
    if (next) {
      nextTick(() => {
        // Access the refs directly instead of creating new ones
        const refs = {
          month1, month2, day1, day2,
          year1, year2, year3, year4
        }
        const nextElement = refs[next]
        if (nextElement?.value) {
          nextElement.value.focus()
        }
      })
    }
  } else {
    date.value[current] = ''
  }
}

const handleDelete = (event, current, previous) => {
  if (event.key === 'Backspace' && !date.value[current] && previous) {
    // Access the refs directly instead of creating new ones
    const refs = {
      month1, month2, day1, day2,
      year1, year2, year3, year4
    }
    const previousElement = refs[previous]
    if (previousElement?.value) {
      previousElement.value.focus()
    }
  }
}

const checkAnswers = () => {
  const enteredDate = `${date.value.month1}${date.value.month2}-${date.value.day1}${date.value.day2}-${date.value.year1}${date.value.year2}${date.value.year3}${date.value.year4}`
  const correctDate = '03-01-2025'

  if (enteredDate === correctDate && movieAnswer.value.toLowerCase() === 'interstellar') {
    const expirationTime = new Date().getTime() + (6 * 60 * 60 * 1000) // 6 hours
    localStorage.setItem('auth', JSON.stringify({
      authenticated: true,
      expiration: expirationTime
    }))
    router.push('/')
  } else {
    error.value = 'Hmm, something\'s not quite right. Try again!'
  }
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}
</style>
