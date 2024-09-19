<template>
  <div class="p-5">
    <p class="text-3xl mb-5 text-blue-900">SSR Starter (NodeJs + vite + vue 3 + TS + SSR )</p>
  </div>

  <UINotifications />
</template>

<script setup lang="ts">
import { UINotifications } from '@/components'
import { useHead } from '@unhead/vue'
useHead({
  title: 'SSR Starter'
})
</script>

<style scoped>
</style>