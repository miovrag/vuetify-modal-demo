<script setup>
import { VChip } from 'vuetify/components'

defineProps({
    color:           { type: String, default: undefined },
    bgCustomOpacity: { type: [String, Number], default: 0.12 },
})
</script>

<template>
    <VChip tag="div" :color="color">
        <template #prepend v-if="$slots.prepend"><slot name="prepend" /></template>
        <template #default><slot /></template>
        <template #append v-if="$slots.append"><slot name="append" /></template>
    </VChip>
</template>

<style scoped>
:deep(.v-chip__underlay) { --v-activated-opacity: v-bind(bgCustomOpacity); }
</style>
