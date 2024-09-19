<template>
  <div
    aria-live="assertive"
    class="z-[99] fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
  >
    <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
      <UINotification
        v-for="notification in notifications"
        :key="notification.id"
        :kind="notification.kind"
        :title="$t('notification.title.' + notification.kind)"
        :sub-title="subtitle(notification.subtitle)"
        @close="close(notification)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { useI18n } from 'vue-i18n'
import { UINotification } from '@/components'
import { type Notification, type Notifications, popNotification } from '@/libs/notifications'

const { te, t } = useI18n()
const notifications: Notifications = inject<Notifications>('notifications', [])

const subtitle = (value: string) =>
  te('notification.' + value) ? t('notification.' + value) : value
const close = (item: Notification) => {
  popNotification(item)
}
</script>

<style scoped>
</style>