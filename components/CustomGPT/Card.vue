<script setup>
import { VCard, VCardItem, VCardSubtitle, VCardText, VCardTitle, VCardActions } from 'vuetify/components'

defineProps({
    noBodyPadding:    { type: Boolean, default: false },
    noActionsPadding: { type: Boolean, default: false },
    noTitlePadding:   { type: Boolean, default: false },
})
</script>

<template>
    <VCard density="comfortable" class="shadow-card" rounded="card">
        <template v-if="$slots.title || $slots.subTitle">
            <slot name="title-wrapper">
                <VCardItem :class="{ 'p-0': noTitlePadding }">
                    <VCardTitle v-if="$slots.title"><slot name="title" /></VCardTitle>
                    <VCardSubtitle v-if="$slots.subTitle"><slot name="subTitle" /></VCardSubtitle>
                </VCardItem>
            </slot>
        </template>
        <slot name="body-wrapper">
            <VCardText :class="{ 'p-0': noBodyPadding }">
                <slot name="body" />
            </VCardText>
        </slot>
        <VCardActions v-if="$slots.actions" :class="{ 'p-0': noActionsPadding }">
            <slot name="actions" />
        </VCardActions>
    </VCard>
</template>
