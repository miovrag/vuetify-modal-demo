<script setup>
defineProps({
    loading: { type: Boolean, default: false },
    color:   { type: String, default: 'primary' },
})
</script>

<template>
    <VProgressLinear :color="color" height="4" indeterminate :active="loading" />
</template>
