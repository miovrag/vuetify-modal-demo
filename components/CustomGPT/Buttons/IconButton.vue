<script setup>
import ButtonBase from './ButtonBase.vue'
import Icon from '../Icon.vue'

defineProps({
    icon:     { type: String, default: '' },
    family:   { type: String, default: 'tabler' },
    type:     { type: String, default: 'button' },
    block:    { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    flat:     { type: Boolean, default: false },
    density:  { type: String, default: 'default' },
    variant:  { type: String, default: 'text' },
    size:     { type: String, default: 'default' },
    iconSize: { type: [String, Number], default: 'default' },
    color:    { type: String, default: 'default' },
})
</script>

<template>
    <ButtonBase icon :type="type" :variant="variant" :density="density" :flat="flat" :disabled="disabled" :block="block" :size="size" :color="color">
        <template #default>
            <slot>
                <Icon v-if="icon" :icon="icon" :size="iconSize" :family="family" />
            </slot>
        </template>
    </ButtonBase>
</template>
