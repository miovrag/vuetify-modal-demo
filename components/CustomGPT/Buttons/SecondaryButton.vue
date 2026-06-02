<script setup>
import ButtonBase from './ButtonBase.vue'

defineProps({
    type:     { type: String, default: 'button' },
    block:    { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    flat:     { type: Boolean, default: false },
    density:  { type: String, default: 'default' },
    variant:  { type: String, default: 'flat' },
})
</script>

<template>
    <ButtonBase color="secondary" :type="type" :variant="variant" :density="density" :flat="flat" :disabled="disabled" :block="block">
        <template #prepend><slot name="prepend" /></template>
        <template #default><slot name="default" /></template>
        <template #append><slot name="append" /></template>
    </ButtonBase>
</template>
