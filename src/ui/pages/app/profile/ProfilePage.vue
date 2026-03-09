<template>
  <ProfilePageView :deps="deps" />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

import { createSaveProfile } from '@/infra/profile/save-profile.ts'
import { createViewProfile } from '@/infra/profile/view-profile.ts'

const ProfilePageView = defineAsyncComponent(
  () => import('./ProfilePageView.vue'),
)

const deps = {
  saveProfile: createSaveProfile(window.localStorage),
  viewProfile: createViewProfile(window.localStorage),
}
</script>
