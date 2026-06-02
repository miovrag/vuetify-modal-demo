<script setup>
import { computed } from 'vue'
import { VRadioGroup } from 'vuetify/components'

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: { type: [Number, String, Boolean], default: 0 },
    isInline:   { type: Boolean, default: false },
    id:         { type: String, default: '' },
    color:      { type: String, default: 'primary' },
})

const proxyValue = computed({
    get: () => props.modelValue,
    set: (value) => emits('update:modelValue', value),
})
</script>

<template>
    <VRadioGroup hide-details :id="id" :color="color" :inline="isInline" v-model="proxyValue">
        <slot name="default" />
    </VRadioGroup>
</template>
