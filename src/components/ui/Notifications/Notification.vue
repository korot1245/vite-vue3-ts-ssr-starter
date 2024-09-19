<template>
  <div
    class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden p-4"
  >
    <div class="flex items-start">
      <div class="flex-shrink-0">
        <Icon
          v-if="kind === 'success'"
          class="h-6 w-6 text-green-400"
          icon="material-symbols:check-circle-outline"
          :ssr="true"
        />
        <Icon
          v-if="kind === 'info'"
          class="h-6 w-6 text-blue-400"
          icon="mdi:information-circle-outline"
          :ssr="true"
        />
        <Icon v-if="kind === 'error'" class="h-6 w-6 text-red-400" icon="ph:x-circle" :ssr="true" />

        <Icon
          v-if="kind === 'warning'"
          class="h-6 w-6 text-yellow-400"
          icon="tabler:exclamation-circle"
          :ssr="true"
        />
      </div>
      <div class="ml-3 w-0 flex-1">
        <p class="text-sm font-medium text-gray-900">{{ title }}</p>
        <p class="mt-1 text-sm text-gray-500">{{ subTitle }}</p>
      </div>
      <div class="ml-4 flex-shrink-0 flex">
        <button
          class="bg-white outline-none rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          @click="$emit('close')"
        >
          <Icon class="h-5 w-5" icon="material-symbols:close" :ssr="true" />
        </button>
      </div>
    </div>
  </div>
</template>
  <script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  kind: string // "error", "success", "info", "warning"
  title: string
  subTitle: string
}>()
defineEmits(['close'])
</script>
  