<script setup>
import { computed } from 'vue'
import { VCheckbox } from 'vuetify/components'
import InputLabel from '../InputLabel.vue'

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: { type: [Number, String, Array, Boolean], default: false },
    value:      { type: [Number, String, Array, Boolean], default: true },
    label:      { type: String, default: null },
    id:         { type: String, default: null },
    density:    { type: String, default: 'compact' },
    multiple:   { type: Boolean, default: false },
    disabled:   { type: Boolean, default: false },
    color:      { type: String, default: 'primary' },
    textColor:  { type: String, default: undefined },
})

const proxyChecked = computed({
    get: () => props.modelValue,
    set: (val) => emits('update:modelValue', val),
})
</script>

<template>
    <VCheckbox
        hide-details
        :id="id"
        :density="density"
        :label="label"
        :value="value"
        :color="color"
        :multiple="multiple"
        :disabled="disabled"
        v-model="proxyChecked"
    >
        <template #label="{ label: lbl, props: lProps }" v-if="$slots.label || label">
            <slot name="label" :id="id">
                <InputLabel :id="id" :value="lbl" v-bind="lProps" />
            </slot>
        </template>
    </VCheckbox>
</template>
