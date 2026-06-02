<script setup>
import { computed } from 'vue'
import { VDialog } from 'vuetify/components'
import IconButton from './Buttons/IconButton.vue'

const emits = defineEmits(['update:modelValue'])

const props = defineProps({
    modelValue:      { type: Boolean, default: false },
    showCloseButton: { type: Boolean, default: false },
    width:           { type: [String, Number], default: '500' },
    height:          { type: [String, Number], default: null },
})

const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => emits('update:modelValue', value),
})

const closeDialog = () => (isOpen.value = false)
</script>

<template>
    <VDialog v-model="isOpen" :width="width" :height="height">
        <template v-if="isOpen && showCloseButton">
            <IconButton
                icon="x"
                class="absolute right-[-1rem] top-[-1rem] z-10 shadow"
                variant="flat"
                density="compact"
                color="white"
                @click="closeDialog"
            />
        </template>
        <slot name="default" />
    </VDialog>
</template>
