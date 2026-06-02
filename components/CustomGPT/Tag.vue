<script setup>
defineProps({
    label:   { type: String, required: true },
    color:   { type: String, default: '#fff' },
    bgColor: { type: String, default: '#7367F0' },
})
</script>

<template>
    <span
        class="inline-block py-1 px-3 rounded uppercase"
        style="font-size: 11px; vertical-align: middle;"
        :style="{ backgroundColor: bgColor, color: color }"
        v-text="label"
    />
</template>
