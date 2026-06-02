<script setup>
import { VChip } from 'vuetify/components'
import Icon from './Icon.vue'

defineProps({
    icon:            { type: String, required: true },
    family:          { type: String, default: 'tabler' },
    iconSize:        { type: [String, Number], default: 'default' },
    color:           { type: String, required: true },
    rounded:         { type: String, default: 'md' },
    bgCustomOpacity: { type: [String, Number, null], default: 0.12 },
})
</script>

<template>
    <VChip tag="div" :color="color" :rounded="rounded">
        <Icon :icon="icon" :color="color" :family="family" :size="iconSize" />
    </VChip>
</template>

<style scoped>
:deep(.v-chip__underlay) { --v-activated-opacity: v-bind(bgCustomOpacity); }
</style>
