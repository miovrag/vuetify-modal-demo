<script setup>
import { computed, onMounted } from 'vue'
import Icon from './Icon.vue'

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
    underlined:      { type: Boolean, default: false },
    tabs:            { type: Array, default: () => [] },
    modelValue:      { type: [Number, String], default: 0 },
    hideUnavailable: { type: Boolean, default: false },
    showBorders:     { type: Boolean, default: false },
    altTextColor:    { type: Boolean, default: false },
    gap:             { type: String, default: 'gap-2' },
    marginTop:       { type: String, default: 'mt-6' },
    fullWidth:       { type: Boolean, default: false },
})

const activeTab = computed({
    get: () => props.modelValue,
    set: (value) => emits('update:modelValue', value),
})

const changeActiveTab = (index) => {
    if (props.tabs?.[index]?.available) activeTab.value = index
}

onMounted(() => {
    if (!props.tabs[activeTab.value]?.available) {
        activeTab.value = props.tabs.findIndex((tab) => tab.available)
    }
})
</script>

<template>
    <div :class="{ flex: underlined }">
        <div
            v-show="tabs.length"
            class="flex flex-wrap"
            :class="{
                [gap]: !underlined,
                [marginTop]: true,
                'flex-1': fullWidth,
            }"
        >
            <slot name="before" />
            <template v-for="(tab, index) in tabs" :key="`tab-${index}`">
                <div
                    v-if="tab.available"
                    class="flex items-center justify-center gap-2 px-4 py-2 cursor-pointer transition-colors duration-150"
                    :class="[
                        !underlined ? 'rounded' : 'rounded-tl rounded-tr',
                        {
                            'bg-primary text-white': tab.available && activeTab === index,
                            'text-secondary': !altTextColor && !underlined && !(tab.available && activeTab === index),
                            'text-primary': (altTextColor || underlined) && !(tab.available && activeTab === index),
                            'border border-primary': showBorders,
                            'flex-1': fullWidth,
                        },
                    ]"
                    @click.prevent="changeActiveTab(index)"
                >
                    <Icon v-if="tab.icon" :icon="tab.icon" :family="tab.family" />
                    <span v-text="tab.name" />
                </div>
                <div
                    v-else-if="!hideUnavailable"
                    class="flex items-center gap-2 px-4 py-2 cursor-not-allowed opacity-50"
                    :class="{ 'border border-primary': showBorders }"
                >
                    <Icon v-if="tab.icon" :icon="tab.icon" />
                    <span v-text="tab.name" />
                </div>
            </template>
            <slot name="after" />
        </div>
    </div>
</template>
