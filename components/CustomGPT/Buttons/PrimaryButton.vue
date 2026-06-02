<script setup>
import ButtonBase from './ButtonBase.vue'

defineProps({
    type:     { type: String, default: 'button' },
    block:    { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    flat:     { type: Boolean, default: false },
    density:  { type: String, default: 'default' },
    variant:  { type: String, default: 'flat' },
    rounded:  { type: [String, Number, Boolean], default: undefined },
})
</script>

<template>
    <ButtonBase color="primary" :type="type" :flat="flat" :block="block" :rounded="rounded" :variant="variant" :density="density" :disabled="disabled">
        <template #prepend v-if="$slots.prepend"><slot name="prepend" /></template>
        <template #default v-if="$slots.default"><slot name="default" /></template>
        <template #append v-if="$slots.append"><slot name="append" /></template>
    </ButtonBase>
</template>
