<script setup>
import { ref } from 'vue'
import NavigationDrawer from '~/components/CustomGPT/NavigationDrawer.vue'
import Modal from '~/components/CustomGPT/Modal.vue'
import Card from '~/components/CustomGPT/Card.vue'
import TextInput from '~/components/CustomGPT/TextInput.vue'
import SwitchInput from '~/components/CustomGPT/Switch.vue'
import DropdownList from '~/components/CustomGPT/DropdownList.vue'
import PrimaryButton from '~/components/CustomGPT/Buttons/PrimaryButton.vue'
import ButtonBase from '~/components/CustomGPT/Buttons/ButtonBase.vue'
import Icon from '~/components/CustomGPT/Icon.vue'

const isRail = ref(false)
const activeNav = ref('agents')
const isOpen = ref(false)

const navItems = [
    { id: 'dashboard',      label: 'Dashboard',      icon: 'layout-dashboard' },
    { id: 'agents',         label: 'Agents',          icon: 'robot' },
    { id: 'sources',        label: 'Sources',         icon: 'database' },
    { id: 'analytics',      label: 'Analytics',       icon: 'chart-bar' },
    { id: 'conversations',  label: 'Conversations',   icon: 'messages' },
]

const form = ref({
    name: '',
    welcomeMessage: '',
    model: null,
    liveChat: false,
})

const modelOptions = [
    { title: 'GPT-4o',           value: 'gpt-4o' },
    { title: 'GPT-4o Mini',      value: 'gpt-4o-mini' },
    { title: 'Claude 3.5 Sonnet', value: 'claude-sonnet' },
    { title: 'Gemini 1.5 Pro',   value: 'gemini-pro' },
]

const save = () => { isOpen.value = false }
</script>

<template>
    <!-- Sidebar -->
    <NavigationDrawer permanent :rail="isRail" :rail-width="72" :width="260" color="white">

        <!-- Logo -->
        <div class="flex items-center gap-3 px-4 h-16 border-b border-divider shrink-0">
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="shrink-0">
                <path d="M9.4 26.6009C8.4 26.6009 7.5 25.9889 7.1 25.071H0C0.4 28.0288 2.5 30.4767 5.3 31.1907C4.4 34.8625 6.3 38.2284 9.2 39.7583C9.3 43.8381 12.5 47 16.5 47C19.2 47 21.6 45.4701 22.9 43.1242V30.9867H17.7V34.1486C18.6 34.5565 19.2 35.4745 19.2 36.4945C19.2 37.9224 18.1 39.0443 16.7 39.0443C15.3 39.0443 14.2 37.9224 14.2 36.4945C14.2 35.4745 14.8 34.5565 15.7 34.1486V28.9468H23V19.8692H17.2V15.6874H14.8C14.4 16.6053 13.5 17.2173 12.5 17.2173C11.1 17.2173 10 16.0953 10 14.6674C10 13.2395 11.1 12.1175 12.5 12.1175C13.5 12.1175 14.4 12.7295 14.8 13.6474H19.2V17.8293H23V4.87583C21.7 2.52993 19.4 1 16.6 1C12.7 1 9.4 4.16186 9.3 8.24168C6.3 9.66962 4.5 13.2395 5.4 16.8093C2.6 17.6253 0.5 19.9712 0.1 22.929H7.2C7.6 22.0111 8.5 21.3991 9.5 21.3991C10.9 21.3991 12 22.5211 12 23.949C12 25.3769 10.8 26.6009 9.4 26.6009Z" fill="#7367F0"/>
                <path d="M42.6 16.8093C43.5 13.3415 41.7 9.77162 38.7 8.24168C38.6 4.16186 35.3 1 31.4 1C28.7 1 26.3 2.52993 25 4.87583V10.4856H30C30.4 9.56763 31.3 8.95565 32.3 8.95565C33.7 8.95565 34.8 10.0776 34.8 11.5055C34.8 12.9335 33.7 14.0554 32.3 14.0554C31.3 14.0554 30.4 13.4435 30 12.5255H25V37.0044H28.8V32.2106H33.4C33.8 31.2927 34.7 30.6807 35.7 30.6807C37.1 30.6807 38.2 31.8027 38.2 33.2306C38.2 34.6585 37.1 35.7805 35.7 35.7805C34.7 35.7805 33.8 35.1685 33.4 34.2506H30.8V39.0443H25V43.1242C26.3 45.4701 28.6 47 31.4 47C35.4 47 38.6 43.7361 38.7 39.7583C41.7 38.3304 43.5 34.8625 42.6 31.1907C42.9 31.0887 43.1 30.9867 43.4 30.8847V26.8049H35V21.7051C34.1 21.2971 33.5 20.3792 33.5 19.3592C33.5 17.9313 34.6 16.8093 36 16.8093C37.4 16.8093 38.5 17.9313 38.5 19.3592C38.5 20.3792 37.9 21.2971 37 21.7051V24.765H45.3V29.6608C47 28.4368 48 26.2949 48 24.051C48 20.6851 45.7 17.7273 42.6 16.8093Z" fill="#7367F0"/>
            </svg>
            <Transition name="fade">
                <span v-if="!isRail" class="font-semibold text-heading text-md leading-none">CustomGPT</span>
            </Transition>
        </div>

        <!-- Nav items -->
        <nav class="flex flex-col gap-1 p-3 flex-1">
            <button
                v-for="item in navItems"
                :key="item.id"
                class="flex items-center gap-3 px-3 py-2 rounded-md w-full text-left transition-colors duration-150 cursor-pointer"
                :class="activeNav === item.id
                    ? 'bg-primary-8 text-primary'
                    : 'text-body hover:bg-gray-100'"
                @click="activeNav = item.id"
            >
                <Icon :icon="item.icon" size="20" :color="activeNav === item.id ? '#7367F0' : undefined" class="shrink-0" />
                <Transition name="fade">
                    <span v-if="!isRail" class="text-sm font-medium truncate">{{ item.label }}</span>
                </Transition>
            </button>
        </nav>

        <!-- Bottom: collapse toggle -->
        <template #append>
            <div class="p-3 border-t border-divider">
                <button
                    class="flex items-center gap-3 px-3 py-2 rounded-md w-full text-body hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
                    @click="isRail = !isRail"
                >
                    <Icon :icon="isRail ? 'layout-sidebar-right-expand' : 'layout-sidebar-left-collapse'" size="20" class="shrink-0" />
                    <Transition name="fade">
                        <span v-if="!isRail" class="text-sm font-medium">Collapse</span>
                    </Transition>
                </button>
            </div>
        </template>
    </NavigationDrawer>

    <!-- Main content -->
    <VMain class="bg-body">
        <div class="flex items-center justify-center min-h-screen p-8">
            <div class="text-center">
                <p class="text-sm text-muted mb-6">CustomGPT · Vuetify component demo</p>
                <PrimaryButton @click="isOpen = true">Configure agent</PrimaryButton>
            </div>
        </div>
    </VMain>

    <!-- Modal -->
    <Modal v-model="isOpen" width="520" :show-close-button="true">
        <Card>
            <template #title>Agent configuration</template>

            <template #body>
                <div class="flex flex-col gap-4">

                    <div class="flex flex-col gap-2">
                        <span class="text-sm font-medium text-heading">Agent name</span>
                        <TextInput v-model="form.name" placeholder="My support agent" />
                    </div>

                    <div class="flex flex-col gap-2">
                        <span class="text-sm font-medium text-heading">Welcome message</span>
                        <TextInput v-model="form.welcomeMessage" placeholder="Hi! How can I help you today?" />
                    </div>

                    <DropdownList v-model="form.model" :options="modelOptions" label="AI model" label-position="top" />

                    <div class="border-t border-divider" />

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
                    <ButtonBase variant="outlined" color="secondary" rounded="md" @click="isOpen = false">Cancel</ButtonBase>
                    <PrimaryButton @click="save">Save changes</PrimaryButton>
                </div>
            </template>
        </Card>
    </Modal>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity 120ms ease; }
.fade-enter-from,
.fade-leave-to    { opacity: 0; }
</style>
