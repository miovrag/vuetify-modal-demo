<script setup>
defineProps({
    color:    { type: String, default: 'primary' },
    size:     { type: [Number, String], default: 20 },
    width:    { type: [Number, String], default: 4 },
    disabled: { type: Boolean, default: false },
})
</script>

<template>
    <VProgressCircular
        :indeterminate="!disabled"
        :size="size"
        :color="disabled ? 'secondary' : color"
        :width="width"
    />
</template>
