<script setup>
import { computed } from 'vue'
import { VNavigationDrawer } from 'vuetify/components'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    absolute:      { type: Boolean, default: false },
    color:         { type: String, default: '' },
    elevation:     { type: [Number, String], default: 0 },
    expandOnHover: { type: Boolean, default: false },
    floating:      { type: Boolean, default: false },
    location:      { type: String, default: 'start', validator: (v) => ['left', 'right', 'top', 'bottom', 'start', 'end'].includes(v) },
    modelValue:    { type: Boolean, default: false },
    permanent:     { type: Boolean, default: false },
    rail:          { type: Boolean, default: false },
    railWidth:     { type: [Number, String], default: 60 },
    temporary:     { type: Boolean, default: false },
    width:         { type: [Number, String], default: 300 },
    hideScroll:    { type: Boolean, default: false },
})

const isOpen = computed({
    get: () => (props.rail ? true : props.modelValue),
    set: (val) => emit('update:modelValue', val),
})
</script>

<template>
    <VNavigationDrawer
        :absolute="absolute"
        :color="color"
        :elevation="elevation"
        :expand-on-hover="expandOnHover"
        :floating="floating"
        :location="location"
        :permanent="permanent"
        :rail="rail"
        :rail-width="railWidth"
        :temporary="temporary"
        :width="width"
        v-model="isOpen"
        :class="{ 'navigation-drawer': hideScroll }"
    >
        <slot />
        <template #append v-if="$slots.append">
            <slot name="append" />
        </template>
    </VNavigationDrawer>
</template>

<style scoped lang="scss">
.navigation-drawer :deep(.v-navigation-drawer__content) {
    overflow: hidden !important;
}
</style>
