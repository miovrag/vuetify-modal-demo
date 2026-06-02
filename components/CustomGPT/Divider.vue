<script setup>
import { VDivider } from 'vuetify/components'
defineProps({
    thickness:  { type: [Number, String], default: 1 },
    isVertical: { type: Boolean, default: false },
})
</script>

<template>
    <v-divider color="divider" :thickness="thickness" :vertical="isVertical" />
</template>
