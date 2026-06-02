<script setup>
import { ref } from 'vue'
import Modal from '~/components/CustomGPT/Modal.vue'
import Card from '~/components/CustomGPT/Card.vue'
import TextInput from '~/components/CustomGPT/TextInput.vue'
import SwitchInput from '~/components/CustomGPT/Switch.vue'
import DropdownList from '~/components/CustomGPT/DropdownList.vue'
import PrimaryButton from '~/components/CustomGPT/Buttons/PrimaryButton.vue'
import ButtonBase from '~/components/CustomGPT/Buttons/ButtonBase.vue'

const isOpen = ref(false)

const form = ref({
    name: '',
    welcomeMessage: '',
    model: null,
    liveChat: false,
})

const modelOptions = [
    { title: 'GPT-4o', value: 'gpt-4o' },
    { title: 'GPT-4o Mini', value: 'gpt-4o-mini' },
    { title: 'Claude 3.5 Sonnet', value: 'claude-sonnet' },
    { title: 'Gemini 1.5 Pro', value: 'gemini-pro' },
]

const save = () => { isOpen.value = false }
</script>

<template>
    <div class="min-h-screen bg-body flex items-center justify-center p-8">

        <div class="text-center">
            <p class="text-sm text-muted mb-6">CustomGPT · Vuetify component demo</p>
            <PrimaryButton @click="isOpen = true">
                Configure agent
            </PrimaryButton>
        </div>

        <Modal v-model="isOpen" width="520" :show-close-button="true">
            <Card>
                <template #title>Agent configuration</template>

                <template #body>
                    <div class="flex flex-col gap-4">

                        <!-- Agent name -->
                        <div class="flex flex-col gap-2">
                            <span class="text-sm font-medium text-heading">Agent name</span>
                            <TextInput
                                v-model="form.name"
                                placeholder="My support agent"
                            />
                        </div>

                        <!-- Welcome message -->
                        <div class="flex flex-col gap-2">
                            <span class="text-sm font-medium text-heading">Welcome message</span>
                            <TextInput
                                v-model="form.welcomeMessage"
                                placeholder="Hi! How can I help you today?"
                            />
                        </div>

                        <!-- AI model -->
                        <DropdownList
                            v-model="form.model"
                            :options="modelOptions"
                            label="AI model"
                            label-position="top"
                        />

                        <div class="border-t border-divider" />

                        <!-- Live chat switch -->
                        <div class="flex items-center justify-between gap-4">
                            <div class="flex flex-col gap-1">
                                <span class="text-sm font-medium text-heading">Enable live chat</span>
                                <span class="text-xs text-muted">Allow visitors to request a human agent</span>
                            </div>
                            <SwitchInput v-model="form.liveChat" />
                        </div>

                    </div>
                </template>

                <template #actions>
                    <div class="flex justify-end gap-2 w-full">
                        <ButtonBase variant="outlined" color="secondary" rounded="md" @click="isOpen = false">
                            Cancel
                        </ButtonBase>
                        <PrimaryButton @click="save">Save changes</PrimaryButton>
                    </div>
                </template>
            </Card>
        </Modal>
    </div>
</template>
