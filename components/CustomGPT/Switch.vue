<script setup>
import { computed } from 'vue'
import { VSwitch } from 'vuetify/components'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    modelValue:  { type: Boolean, required: true },
    density:     { type: String, default: 'compact' },
    showDetails: { type: Boolean, default: false },
    size:        { type: String, default: 'default' },
})

const proxyModelValue = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
})
</script>

<template>
    <VSwitch
        inset
        v-model="proxyModelValue"
        color="primary"
        :density="density"
        :hide-details="!props.showDetails"
        :data-checked="modelValue"
        :class="{ 'v-switch-large': size === 'large' }"
    >
        <template #label><slot name="label" /></template>
    </VSwitch>
</template>

<style>
.v-switch .v-switch__thumb { background-color: #999999; }
.v-switch[data-checked='true'] .v-switch__thumb { background-color: white; }
.v-switch .v-switch__track { background-color: white; border: 1px solid #999999; }
.v-switch[data-checked='true'] .v-switch__track { border: 0; }

.v-switch-large .v-selection-control__wrapper { width: 42px; height: 26px; }
.v-switch-large .v-switch__track { width: 42px; height: 26px; }
.v-switch-large .v-switch__thumb { width: 20px; height: 20px; }
</style>
