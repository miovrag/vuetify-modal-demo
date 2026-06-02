<script setup>
import { computed } from 'vue'
import { VSelect } from 'vuetify/components'
import InputLabel from '../InputLabel.vue'
import Icon from './Icon.vue'

const emits = defineEmits(['update:modelValue', 'change'])

const props = defineProps({
    modelValue:   { type: [String, Number, Boolean, Array, null], required: true },
    options:      { type: Array, required: true },
    title:        { type: String, default: 'title' },
    value:        { type: String, default: 'value' },
    label:        { type: [Boolean, String], default: false },
    labelPosition:{ type: String, default: 'inline', validator: (v) => ['top', 'left', 'inline'].includes(v) },
    id:           { type: String, default: '' },
    flat:         { type: Boolean, default: false },
    rounded:      { type: [Boolean, String, Number], default: 'md' },
    variant:      { type: String, default: 'outlined' },
    density:      { type: String, default: 'compact' },
    disabled:     { type: Boolean, default: false },
    loading:      { type: Boolean, default: false },
    bgColor:      { type: String, default: 'white' },
    multiple:     { type: Boolean, default: false },
    hideSelected: { type: Boolean, default: false },
})

const modelValue = computed({
    get: () => props.modelValue,
    set: (value) => { emits('update:modelValue', value); emits('change', value) },
})

const isLabelTop    = computed(() => props.label && props.labelPosition === 'top')
const isLabelLeft   = computed(() => props.label && props.labelPosition === 'left')
const isLabelInline = computed(() => props.label && props.labelPosition === 'inline')
const itemActive    = (value) => props.multiple ? modelValue.value?.includes(value) : modelValue.value === value
const optionDetails = (index) => props.options[index]
</script>

<template>
    <div :class="{ 'gap-2': !flat, 'flex-col': isLabelTop, flex: isLabelTop || isLabelLeft, 'flex-row items-center justify-between': isLabelLeft }">
        <InputLabel v-if="isLabelTop || isLabelLeft" :value="String(label)" :id="id" />
        <v-select
            hide-details
            :hide-selected="hideSelected"
            :id="id"
            :flat="flat"
            :items="options"
            :rounded="rounded"
            :density="density"
            :loading="loading"
            :variant="variant"
            :item-title="title"
            :item-value="value"
            :bg-color="bgColor"
            :disabled="disabled"
            :multiple="multiple"
            :class="['flex-1', { 'overflow-hidden': !!rounded }]"
            v-model="modelValue"
        >
            <template v-if="isLabelInline" #label="{ props: lProps }">
                <InputLabel :value="String(label)" v-bind="lProps" />
            </template>
            <template #item="{ item, props: iProps, index }">
                <slot name="item" :item="item" :props="iProps" :index="index" :isActive="itemActive(item.value)">
                    <p
                        :key="index"
                        v-bind="iProps"
                        class="m-1 cursor-pointer rounded px-3 py-2"
                        :class="[`bg-${itemActive(item.value) ? 'primary' : 'white'}`]"
                    >
                        <Icon v-if="optionDetails(index)?.icon" class="me-1" :icon="optionDetails(index).icon" />
                        <span v-text="item.title" />
                    </p>
                </slot>
            </template>
        </v-select>
    </div>
</template>
