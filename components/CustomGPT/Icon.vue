<script setup>
import { VIcon } from 'vuetify/components'

defineProps({
    icon:       { type: String, required: true },
    size:       { type: [String, Number], default: 'default' },
    color:      { type: String, default: undefined },
    endSpace:   { type: Boolean, default: false },
    startSpace: { type: Boolean, default: false },
    family:     { type: String, default: 'tabler' },
})
</script>

<template>
    <VIcon
        :size="size"
        :color="color"
        :start="endSpace"
        :end="startSpace"
        :icon="`${family}:${icon}`"
        class="change-path-stroke"
    />
</template>

<style scoped lang="scss">
.change-path-stroke:deep(path) { stroke-width: 1.5; }
</style>
