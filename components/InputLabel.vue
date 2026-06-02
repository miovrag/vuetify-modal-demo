<script setup>
defineProps({
    value: { type: String, default: '' },
    id:    { type: String, default: '' },
})
</script>

<template>
    <label :for="id" class="text-sm font-medium text-heading block mb-1">{{ value }}</label>
</template>
