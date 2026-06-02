<script setup>
import { VAlert } from 'vuetify/components'

defineProps({
    status:   { type: String, required: true },
    message:  { type: String, default: '' },
    closable: { type: Boolean, default: false },
})
</script>

<template>
    <VAlert :closable="closable" :color="status" close-label="Close Alert">
        <template v-if="$slots.prepend" #prepend><slot name="prepend" /></template>
        <template v-if="$slots.title" #title><slot name="title" /></template>
        <template v-if="$slots.text" #text><slot name="text" /></template>
        <template v-if="$slots.append" #append><slot name="append" /></template>
        <slot><span>{{ message }}</span></slot>
    </VAlert>
</template>
