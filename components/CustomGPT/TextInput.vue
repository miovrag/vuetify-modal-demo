<script setup>
import { computed, useTemplateRef } from 'vue'
import { VTextField } from 'vuetify/components'

const inputRef = useTemplateRef('_inputRef')

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue:  { type: [String, Number], default: '' },
    autoFocus:   { type: Boolean, default: false },
    density:     { type: String, default: 'compact' },
    variant:     { type: String, default: 'outlined' },
    loading:     { type: Boolean, default: false },
    type:        { type: String, default: 'text' },
    id:          { type: String, default: null },
    placeholder: { type: [Boolean, String, Number], default: null },
    readonly:    { type: Boolean, default: false },
    rounded:     { type: [Boolean, String, Number], default: 'md' },
    flat:        { type: Boolean, default: true },
    bgColor:     { type: String, default: '#fff' },
})

const modelValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
})

defineExpose({ focus: () => inputRef.value.focus() })
</script>

<template>
    <VTextField
        hide-details
        ref="_inputRef"
        :id="id"
        :type="type"
        :flat="flat"
        :rounded="rounded"
        :loading="loading"
        :variant="variant"
        :density="density"
        :bg-color="bgColor"
        :readonly="readonly"
        :placeholder="placeholder == null ? undefined : String(placeholder)"
        v-model="modelValue"
    >
        <template #prepend-inner v-if="$slots['prepend-inner']"><slot name="prepend-inner" /></template>
        <template #append-inner v-if="$slots['append-inner']"><slot name="append-inner" /></template>
    </VTextField>
</template>
