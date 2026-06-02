<script setup>
import { VBtn } from 'vuetify/components'

defineProps({
    type:     { type: String, default: 'button' },
    block:    { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    flat:     { type: Boolean, default: false },
    color:    { type: String, default: 'primary' },
    density:  { type: String, default: 'default', validator: (v) => [null, 'default', 'comfortable', 'compact'].includes(v) },
    variant:  { type: String, default: null, validator: (v) => [null, 'text', 'flat', 'elevated', 'tonal', 'outlined', 'plain'].includes(v) },
    rounded:  { type: [String, Number, Boolean], default: undefined },
    border:   { type: [String, Number, Boolean], default: false },
    icon:     { type: Boolean, default: false },
    size:     { type: String, default: undefined },
})
</script>

<template>
    <v-btn
        :block="block"
        :disabled="disabled"
        :flat="flat"
        :type="type"
        :density="density"
        :variant="variant"
        :color="color"
        :rounded="rounded"
        :border="border"
        :icon="icon"
        :size="size"
    >
        <template #prepend v-if="$slots.prepend"><slot name="prepend" /></template>
        <template #default v-if="$slots.default"><slot name="default" /></template>
        <template #append v-if="$slots.append"><slot name="append" /></template>
    </v-btn>
</template>
