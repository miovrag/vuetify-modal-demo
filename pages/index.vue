<script setup>
import { ref } from 'vue'
import NavigationDrawer from '~/components/CustomGPT/NavigationDrawer.vue'
import Icon from '~/components/CustomGPT/Icon.vue'
import PrimaryButton from '~/components/CustomGPT/Buttons/PrimaryButton.vue'
import SecondaryButton from '~/components/CustomGPT/Buttons/SecondaryButton.vue'
import ButtonBase from '~/components/CustomGPT/Buttons/ButtonBase.vue'
import IconButton from '~/components/CustomGPT/Buttons/IconButton.vue'
import TextInput from '~/components/CustomGPT/TextInput.vue'
import SwitchInput from '~/components/CustomGPT/Switch.vue'
import DropdownList from '~/components/CustomGPT/DropdownList.vue'
import Checkbox from '~/components/CustomGPT/Checkbox.vue'
import RadioGroup from '~/components/CustomGPT/RadioGroup.vue'
import Card from '~/components/CustomGPT/Card.vue'
import Modal from '~/components/CustomGPT/Modal.vue'
import Alert from '~/components/CustomGPT/Alert.vue'
import Chip from '~/components/CustomGPT/Chip.vue'
import ChipWithIcon from '~/components/CustomGPT/ChipWithIcon.vue'
import Tag from '~/components/CustomGPT/Tag.vue'
import Divider from '~/components/CustomGPT/Divider.vue'
import CircularLoader from '~/components/CustomGPT/CircularLoader.vue'
import ProgressBar from '~/components/CustomGPT/ProgressBar.vue'
import HorizontalTabs from '~/components/CustomGPT/HorizontalTabs.vue'

const isRail = ref(false)
const activeSection = ref('colors')
const isModalOpen = ref(false)

// ── Nav ──────────────────────────────────────────────────────────────
const navItems = [
    { id: 'colors',     label: 'Colors',        icon: 'palette' },
    { id: 'typography', label: 'Typography',     icon: 'typography' },
    { id: 'icons',      label: 'Icons',          icon: 'icons' },
    { id: 'buttons',    label: 'Buttons',        icon: 'hand-click' },
    { id: 'inputs',     label: 'Form Controls',  icon: 'forms' },
    { id: 'cards',      label: 'Cards',          icon: 'layout-cards' },
    { id: 'chips',      label: 'Chips & Tags',   icon: 'tag' },
    { id: 'alerts',     label: 'Alerts',         icon: 'alert-circle' },
    { id: 'feedback',   label: 'Feedback',       icon: 'loader' },
    { id: 'tabs',       label: 'Tabs',           icon: 'layout-navbar' },
    { id: 'modals',     label: 'Modals',         icon: 'layout-bottombar' },
]

const scrollTo = (id) => {
    activeSection.value = id
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// ── Colors ───────────────────────────────────────────────────────────
const palettes = [
    { name: 'Primary',   swatches: [['8','#F4F3FE'],['16','#E9E7FD'],['100','#E3E1FC'],['200','#C7C2F9'],['300','#ABA4F6'],['400','#8F85F3'],['DEFAULT','#7367F0'],['600','#685DD8'],['700','#6258CC'],['800','#5C52C0'],['900','#564DB4']] },
    { name: 'Secondary', swatches: [['16','#E9E9EA'],['100','#EEEEEF'],['200','#DCDDDF'],['300','#CBCCCE'],['400','#B9BBBE'],['DEFAULT','#A8AAAE'],['600','#98999D'],['700','#8F9194'],['800','#86888B'],['900','#7E7F82']] },
    { name: 'Success',   swatches: [['100','#D4F4E2'],['200','#A9E9C5'],['300','#7EDDA9'],['400','#53D28C'],['DEFAULT','#28C76F'],['600','#24B364'],['700','#22A95E'],['800','#209F59'],['900','#1E9553']] },
    { name: 'Danger',    swatches: [['50','#FBF2F2'],['100','#FBDDDD'],['200','#F7BBBB'],['300','#F29899'],['400','#EE7677'],['DEFAULT','#EA5455'],['600','#D34C4D'],['700','#C74748'],['800','#BB4344'],['900','#AF3F40']] },
    { name: 'Warning',   swatches: [['100','#FFECD9'],['200','#FFD9B4'],['300','#FFC58E'],['400','#FFB269'],['DEFAULT','#FF9F43'],['600','#E68F3C'],['700','#D98739'],['800','#CC7F36'],['900','#BF7732']] },
    { name: 'Info',      swatches: [['100','rgb(204,228,250)'],['200','rgb(153,200,245)'],['300','rgb(102,173,239)'],['400','rgb(51,145,234)'],['DEFAULT','rgb(0,118,229)'],['600','rgb(0,106,206)'],['700','rgb(0,100,195)'],['800','rgb(0,94,183)'],['900','rgb(0,89,172)']] },
    { name: 'Gray',      swatches: [['8','#F5F6FB'],['100','#F6F6F7'],['200','#DBDADE'],['300','#C9C7CE'],['400','#B7B5BE'],['DEFAULT','#A5A2AD'],['600','#93909D'],['700','#817D8D'],['800','#6F6B7D'],['900','#5D586C']] },
    { name: 'Teal',      swatches: [['100','#DAEFEF'],['DEFAULT','#46AEAE']] },
    { name: 'Orange',    swatches: [['100','#FFF4E8'],['200','#FFE3C7'],['300','#FFCFA0'],['400','#FFB266'],['DEFAULT','#F7922F'],['600','#D46F1F'],['700','#A95518'],['800','#7A3C10'],['900','#4A2208']] },
    { name: 'Dark Yellow', swatches: [['DEFAULT','#D7B300']] },
]

const uiColors = [
    { name: 'heading', hex: '#212121' }, { name: 'body', hex: '#565656' },
    { name: 'muted', hex: '#B7B5BE' },   { name: 'placeholder', hex: '#999999' },
    { name: 'white', hex: '#FFFFFF' },   { name: 'black', hex: '#000000' },
]

// ── Form controls ─────────────────────────────────────────────────────
const textVal = ref('')
const switchVal = ref(false)
const dropdownVal = ref(null)
const checkboxVal = ref(false)
const radioVal = ref('a')

const dropdownOptions = [
    { title: 'Option one', value: 'a' },
    { title: 'Option two', value: 'b' },
    { title: 'Option three', value: 'c' },
]

// ── Tabs ─────────────────────────────────────────────────────────────
const activeTab = ref(0)
const tabs = [
    { name: 'General',  icon: 'settings',  available: true },
    { name: 'Sources',  icon: 'database',  available: true },
    { name: 'Sharing',  icon: 'share',     available: true },
    { name: 'Advanced', icon: 'adjustments', available: false },
]

// ── Icons sample ─────────────────────────────────────────────────────
const iconList = ['robot','database','chart-bar','messages','settings','user','bell','search','plus','edit','trash','check','x','chevron-down','chevron-right','upload','download','external-link','copy','lock','eye','star','heart','alert-circle','info-circle','help-circle']

// ── Modal form ────────────────────────────────────────────────────────
const form = ref({ name: '', message: '', model: null, liveChat: false })
const modelOptions = [
    { title: 'GPT-4o', value: 'gpt-4o' }, { title: 'GPT-4o Mini', value: 'gpt-4o-mini' },
    { title: 'Claude 3.5 Sonnet', value: 'claude-sonnet' }, { title: 'Gemini 1.5 Pro', value: 'gemini-pro' },
]
</script>

<template>
    <!-- ── Sidebar ──────────────────────────────────────────────────── -->
    <NavigationDrawer permanent :rail="isRail" :rail-width="72" :width="220" color="white">
        <div class="flex items-center gap-3 px-4 h-16 border-b border-divider shrink-0">
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="shrink-0">
                <path d="M9.4 26.6009C8.4 26.6009 7.5 25.9889 7.1 25.071H0C0.4 28.0288 2.5 30.4767 5.3 31.1907C4.4 34.8625 6.3 38.2284 9.2 39.7583C9.3 43.8381 12.5 47 16.5 47C19.2 47 21.6 45.4701 22.9 43.1242V30.9867H17.7V34.1486C18.6 34.5565 19.2 35.4745 19.2 36.4945C19.2 37.9224 18.1 39.0443 16.7 39.0443C15.3 39.0443 14.2 37.9224 14.2 36.4945C14.2 35.4745 14.8 34.5565 15.7 34.1486V28.9468H23V19.8692H17.2V15.6874H14.8C14.4 16.6053 13.5 17.2173 12.5 17.2173C11.1 17.2173 10 16.0953 10 14.6674C10 13.2395 11.1 12.1175 12.5 12.1175C13.5 12.1175 14.4 12.7295 14.8 13.6474H19.2V17.8293H23V4.87583C21.7 2.52993 19.4 1 16.6 1C12.7 1 9.4 4.16186 9.3 8.24168C6.3 9.66962 4.5 13.2395 5.4 16.8093C2.6 17.6253 0.5 19.9712 0.1 22.929H7.2C7.6 22.0111 8.5 21.3991 9.5 21.3991C10.9 21.3991 12 22.5211 12 23.949C12 25.3769 10.8 26.6009 9.4 26.6009Z" fill="#7367F0"/>
                <path d="M42.6 16.8093C43.5 13.3415 41.7 9.77162 38.7 8.24168C38.6 4.16186 35.3 1 31.4 1C28.7 1 26.3 2.52993 25 4.87583V10.4856H30C30.4 9.56763 31.3 8.95565 32.3 8.95565C33.7 8.95565 34.8 10.0776 34.8 11.5055C34.8 12.9335 33.7 14.0554 32.3 14.0554C31.3 14.0554 30.4 13.4435 30 12.5255H25V37.0044H28.8V32.2106H33.4C33.8 31.2927 34.7 30.6807 35.7 30.6807C37.1 30.6807 38.2 31.8027 38.2 33.2306C38.2 34.6585 37.1 35.7805 35.7 35.7805C34.7 35.7805 33.8 35.1685 33.4 34.2506H30.8V39.0443H25V43.1242C26.3 45.4701 28.6 47 31.4 47C35.4 47 38.6 43.7361 38.7 39.7583C41.7 38.3304 43.5 34.8625 42.6 31.1907C42.9 31.0887 43.1 30.9867 43.4 30.8847V26.8049H35V21.7051C34.1 21.2971 33.5 20.3792 33.5 19.3592C33.5 17.9313 34.6 16.8093 36 16.8093C37.4 16.8093 38.5 17.9313 38.5 19.3592C38.5 20.3792 37.9 21.2971 37 21.7051V24.765H45.3V29.6608C47 28.4368 48 26.2949 48 24.051C48 20.6851 45.7 17.7273 42.6 16.8093Z" fill="#7367F0"/>
            </svg>
            <Transition name="fade">
                <span v-if="!isRail" class="font-semibold text-heading text-md leading-none">CustomGPT</span>
            </Transition>
        </div>

        <nav class="flex flex-col gap-0.5 p-3">
            <button
                v-for="item in navItems" :key="item.id"
                class="flex items-center gap-3 px-3 py-2 rounded-md w-full text-left transition-colors duration-150 cursor-pointer"
                :class="activeSection === item.id ? 'bg-primary-8 text-primary' : 'text-body hover:bg-gray-100'"
                @click="scrollTo(item.id)"
            >
                <Icon :icon="item.icon" size="18" :color="activeSection === item.id ? '#7367F0' : undefined" class="shrink-0" />
                <Transition name="fade">
                    <span v-if="!isRail" class="text-sm font-medium truncate">{{ item.label }}</span>
                </Transition>
            </button>
        </nav>

        <template #append>
            <div class="p-3 border-t border-divider">
                <button class="flex items-center gap-3 px-3 py-2 rounded-md w-full text-body hover:bg-gray-100 transition-colors duration-150 cursor-pointer" @click="isRail = !isRail">
                    <Icon :icon="isRail ? 'layout-sidebar-right-expand' : 'layout-sidebar-left-collapse'" size="18" class="shrink-0" />
                    <Transition name="fade">
                        <span v-if="!isRail" class="text-sm font-medium">Collapse</span>
                    </Transition>
                </button>
            </div>
        </template>
    </NavigationDrawer>

    <!-- ── Main content ─────────────────────────────────────────────── -->
    <VMain class="bg-body">
        <div class="max-w-4xl mx-auto px-8 py-10 flex flex-col gap-16">

            <!-- ══ COLORS ══════════════════════════════════════════════ -->
            <section id="colors">
                <h2 class="text-heading font-semibold mb-1">Colors</h2>
                <p class="text-sm text-muted mb-6">Full production palette from tailwind.config.js</p>

                <div class="flex flex-col gap-8">
                    <div v-for="palette in palettes" :key="palette.name">
                        <p class="text-xs font-medium text-muted uppercase tracking-wider mb-3">{{ palette.name }}</p>
                        <div class="flex flex-wrap gap-2">
                            <div v-for="[label, hex] in palette.swatches" :key="label" class="flex flex-col items-center gap-1">
                                <div class="w-12 h-12 rounded-md border border-divider shadow-sm" :style="{ backgroundColor: hex }" />
                                <span class="text-xs text-muted">{{ label }}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p class="text-xs font-medium text-muted uppercase tracking-wider mb-3">UI / Text</p>
                        <div class="flex flex-wrap gap-2">
                            <div v-for="c in uiColors" :key="c.name" class="flex flex-col items-center gap-1">
                                <div class="w-12 h-12 rounded-md border border-divider shadow-sm" :style="{ backgroundColor: c.hex }" />
                                <span class="text-xs text-muted">{{ c.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Divider />

            <!-- ══ TYPOGRAPHY ══════════════════════════════════════════ -->
            <section id="typography">
                <h2 class="text-heading font-semibold mb-1">Typography</h2>
                <p class="text-sm text-muted mb-6">Inter variable font · 4-pt size scale</p>

                <div class="flex flex-col gap-4 bg-white rounded-card p-6 shadow-card">
                    <div class="flex items-baseline gap-4 border-b border-divider pb-4">
                        <span class="text-xs text-muted w-24 shrink-0">h1 · 38px/500</span>
                        <h1 class="text-heading m-0">Heading one</h1>
                    </div>
                    <div class="flex items-baseline gap-4 border-b border-divider pb-4">
                        <span class="text-xs text-muted w-24 shrink-0">h2 · 32px/500</span>
                        <h2 class="text-heading m-0">Heading two</h2>
                    </div>
                    <div class="flex items-baseline gap-4 border-b border-divider pb-4">
                        <span class="text-xs text-muted w-24 shrink-0">h3 · 26px/500</span>
                        <h3 class="text-heading m-0">Heading three</h3>
                    </div>
                    <div class="flex items-baseline gap-4 border-b border-divider pb-4">
                        <span class="text-xs text-muted w-24 shrink-0">h4 · 22px/500</span>
                        <h4 class="text-heading m-0">Heading four</h4>
                    </div>
                    <div class="flex items-baseline gap-4 border-b border-divider pb-4">
                        <span class="text-xs text-muted w-24 shrink-0">h5 · 18px/500</span>
                        <h5 class="text-heading m-0">Heading five</h5>
                    </div>
                    <div class="flex items-baseline gap-4 border-b border-divider pb-4">
                        <span class="text-xs text-muted w-24 shrink-0">h6 · 15px/500</span>
                        <h6 class="text-heading m-0">Heading six</h6>
                    </div>
                    <div class="flex items-baseline gap-4 border-b border-divider pb-4">
                        <span class="text-xs text-muted w-24 shrink-0">body · 15px/400</span>
                        <p class="text-body m-0">Body text — the quick brown fox jumps over the lazy dog.</p>
                    </div>
                    <div class="flex items-baseline gap-4 border-b border-divider pb-4">
                        <span class="text-xs text-muted w-24 shrink-0">small · 13px</span>
                        <p class="paragraph-small text-body m-0">Small — the quick brown fox jumps over the lazy dog.</p>
                    </div>
                    <div class="flex items-baseline gap-4">
                        <span class="text-xs text-muted w-24 shrink-0">caption · 11px</span>
                        <caption class="paragraph-extra-small text-muted">Caption text — supplementary information</caption>
                    </div>
                </div>

                <div class="flex gap-8 mt-4 bg-white rounded-card p-6 shadow-card">
                    <div v-for="[weight, label] in [['400','Regular'],['500','Medium'],['600','Semibold'],['700','Bold']]" :key="weight">
                        <p class="text-xs text-muted mb-1">{{ label }} · {{ weight }}</p>
                        <p class="text-heading text-lg m-0" :style="{ fontWeight: weight }">Inter</p>
                    </div>
                </div>
            </section>

            <Divider />

            <!-- ══ ICONS ═══════════════════════════════════════════════ -->
            <section id="icons">
                <h2 class="text-heading font-semibold mb-1">Icons</h2>
                <p class="text-sm text-muted mb-6">Tabler via Iconify API · <code class="bg-gray-100 px-1 rounded text-xs">&#x3C;Icon icon="name" size="20" /&#x3E;</code></p>

                <div class="bg-white rounded-card shadow-card p-6">
                    <div class="flex flex-wrap gap-6">
                        <div v-for="icon in iconList" :key="icon" class="flex flex-col items-center gap-2 w-16">
                            <div class="w-10 h-10 flex items-center justify-center rounded-md bg-gray-8">
                                <Icon :icon="icon" size="20" color="#5D586C" />
                            </div>
                            <span class="text-xs text-muted text-center leading-tight break-all">{{ icon }}</span>
                        </div>
                    </div>
                    <div class="flex gap-4 mt-6 pt-6 border-t border-divider">
                        <div class="flex items-center gap-2" v-for="[size, label] in [[16,'16px'],[20,'20px'],[24,'24px'],[32,'32px']]" :key="size">
                            <Icon icon="star" :size="size" color="#7367F0" />
                            <span class="text-xs text-muted">{{ label }}</span>
                        </div>
                    </div>
                </div>
            </section>

            <Divider />

            <!-- ══ BUTTONS ═════════════════════════════════════════════ -->
            <section id="buttons">
                <h2 class="text-heading font-semibold mb-1">Buttons</h2>
                <p class="text-sm text-muted mb-6">All variants and sizes</p>

                <div class="bg-white rounded-card shadow-card p-6 flex flex-col gap-6">
                    <!-- Variants -->
                    <div>
                        <p class="text-xs font-medium text-muted uppercase tracking-wider mb-3">Variants</p>
                        <div class="flex flex-wrap gap-3 items-center">
                            <PrimaryButton>Primary</PrimaryButton>
                            <SecondaryButton>Secondary</SecondaryButton>
                            <ButtonBase color="danger" variant="flat">Danger</ButtonBase>
                            <ButtonBase variant="outlined" color="primary">Outlined</ButtonBase>
                            <ButtonBase variant="outlined" color="secondary">Ghost</ButtonBase>
                            <ButtonBase variant="tonal" color="primary">Tonal</ButtonBase>
                            <ButtonBase variant="text" color="primary">Text</ButtonBase>
                            <PrimaryButton disabled>Disabled</PrimaryButton>
                        </div>
                    </div>
                    <!-- Sizes -->
                    <div>
                        <p class="text-xs font-medium text-muted uppercase tracking-wider mb-3">Sizes</p>
                        <div class="flex flex-wrap gap-3 items-center">
                            <PrimaryButton size="x-small">X-Small</PrimaryButton>
                            <PrimaryButton size="small">Small</PrimaryButton>
                            <PrimaryButton>Default</PrimaryButton>
                            <PrimaryButton size="large">Large</PrimaryButton>
                        </div>
                    </div>
                    <!-- With icons -->
                    <div>
                        <p class="text-xs font-medium text-muted uppercase tracking-wider mb-3">With icons</p>
                        <div class="flex flex-wrap gap-3 items-center">
                            <PrimaryButton>
                                <template #prepend><Icon icon="plus" size="16" /></template>
                                Create agent
                            </PrimaryButton>
                            <ButtonBase variant="outlined" color="primary">
                                <template #append><Icon icon="external-link" size="16" /></template>
                                View docs
                            </ButtonBase>
                            <IconButton icon="settings" color="default" />
                            <IconButton icon="trash" color="danger" variant="text" />
                            <IconButton icon="edit" color="primary" variant="tonal" />
                        </div>
                    </div>
                    <!-- Status colors -->
                    <div>
                        <p class="text-xs font-medium text-muted uppercase tracking-wider mb-3">Status colors</p>
                        <div class="flex flex-wrap gap-3 items-center">
                            <ButtonBase color="success" variant="flat">Success</ButtonBase>
                            <ButtonBase color="warning" variant="flat">Warning</ButtonBase>
                            <ButtonBase color="danger" variant="flat">Danger</ButtonBase>
                            <ButtonBase color="info" variant="flat">Info</ButtonBase>
                        </div>
                    </div>
                </div>
            </section>

            <Divider />

            <!-- ══ FORM CONTROLS ═══════════════════════════════════════ -->
            <section id="inputs">
                <h2 class="text-heading font-semibold mb-1">Form Controls</h2>
                <p class="text-sm text-muted mb-6">TextInput · DropdownList · Checkbox · RadioGroup · Switch</p>

                <div class="bg-white rounded-card shadow-card p-6 flex flex-col gap-6">
                    <!-- TextInput -->
                    <div class="flex flex-col gap-2 max-w-sm">
                        <p class="text-xs font-medium text-muted uppercase tracking-wider">TextInput</p>
                        <div class="flex flex-col gap-2">
                            <span class="text-sm font-medium text-heading">Agent name</span>
                            <TextInput v-model="textVal" placeholder="Enter agent name" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <span class="text-sm font-medium text-heading">Disabled</span>
                            <TextInput :model-value="'Disabled value'" placeholder="Disabled" readonly />
                        </div>
                    </div>

                    <Divider />

                    <!-- DropdownList -->
                    <div class="flex flex-col gap-2 max-w-sm">
                        <p class="text-xs font-medium text-muted uppercase tracking-wider">DropdownList</p>
                        <DropdownList v-model="dropdownVal" :options="dropdownOptions" label="Select option" label-position="top" />
                    </div>

                    <Divider />

                    <!-- Checkbox -->
                    <div>
                        <p class="text-xs font-medium text-muted uppercase tracking-wider mb-2">Checkbox</p>
                        <div class="flex gap-6">
                            <Checkbox v-model="checkboxVal" label="Enable feature" />
                            <Checkbox :model-value="true" label="Checked" color="primary" />
                            <Checkbox :model-value="false" label="Disabled" disabled />
                            <Checkbox :model-value="true" label="Success" color="success" />
                            <Checkbox :model-value="true" label="Danger" color="danger" />
                        </div>
                    </div>

                    <Divider />

                    <!-- RadioGroup -->
                    <div>
                        <p class="text-xs font-medium text-muted uppercase tracking-wider mb-2">RadioGroup</p>
                        <RadioGroup v-model="radioVal" :is-inline="true">
                            <VRadio density="compact" value="a" label="Option A" color="primary" />
                            <VRadio density="compact" value="b" label="Option B" color="primary" />
                            <VRadio density="compact" value="c" label="Option C" color="primary" />
                        </RadioGroup>
                    </div>

                    <Divider />

                    <!-- Switch -->
                    <div>
                        <p class="text-xs font-medium text-muted uppercase tracking-wider mb-2">Switch</p>
                        <div class="flex gap-8 items-center">
                            <SwitchInput v-model="switchVal">
                                <template #label><span class="text-sm text-body ml-2">Enable live chat</span></template>
                            </SwitchInput>
                            <SwitchInput :model-value="true">
                                <template #label><span class="text-sm text-body ml-2">On (default)</span></template>
                            </SwitchInput>
                            <SwitchInput :model-value="false" size="large">
                                <template #label><span class="text-sm text-body ml-2">Large</span></template>
                            </SwitchInput>
                        </div>
                    </div>
                </div>
            </section>

            <Divider />

            <!-- ══ CARDS ════════════════════════════════════════════════ -->
            <section id="cards">
                <h2 class="text-heading font-semibold mb-1">Cards</h2>
                <p class="text-sm text-muted mb-6">rounded-card (6px) · shadow-card · bg-surface</p>

                <div class="grid grid-cols-2 gap-4">
                    <Card>
                        <template #title>Card with title</template>
                        <template #body>
                            <p class="text-body text-sm">Body content goes here. Cards use <code class="bg-gray-100 px-1 rounded text-xs">shadow-card</code> and <code class="bg-gray-100 px-1 rounded text-xs">rounded-card</code> automatically.</p>
                        </template>
                    </Card>

                    <Card>
                        <template #title>Card with actions</template>
                        <template #subTitle>Optional subtitle</template>
                        <template #body>
                            <p class="text-body text-sm">Card body content with a subtitle above.</p>
                        </template>
                        <template #actions>
                            <div class="flex justify-end gap-2 w-full">
                                <ButtonBase variant="outlined" color="secondary" rounded="md">Cancel</ButtonBase>
                                <PrimaryButton>Save</PrimaryButton>
                            </div>
                        </template>
                    </Card>

                    <Card>
                        <template #body>
                            <div class="flex items-center gap-4">
                                <div class="w-10 h-10 rounded-full bg-primary-8 flex items-center justify-center">
                                    <Icon icon="robot" size="20" color="#7367F0" />
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-heading m-0">Support Agent</p>
                                    <p class="text-xs text-muted m-0">GPT-4o · 1,240 conversations</p>
                                </div>
                                <div class="ml-auto">
                                    <Chip color="success">Active</Chip>
                                </div>
                            </div>
                        </template>
                    </Card>

                    <Card>
                        <template #body>
                            <div class="flex flex-col gap-3">
                                <div class="flex justify-between text-sm">
                                    <span class="text-muted">Storage used</span>
                                    <span class="text-heading font-medium">72%</span>
                                </div>
                                <ProgressBar :loading="true" color="primary" />
                                <p class="text-xs text-muted m-0">14.4 GB of 20 GB used</p>
                            </div>
                        </template>
                    </Card>
                </div>
            </section>

            <Divider />

            <!-- ══ CHIPS & TAGS ═════════════════════════════════════════ -->
            <section id="chips">
                <h2 class="text-heading font-semibold mb-1">Chips &amp; Tags</h2>
                <p class="text-sm text-muted mb-6">Chip · ChipWithIcon · Tag</p>

                <div class="bg-white rounded-card shadow-card p-6 flex flex-col gap-6">
                    <div>
                        <p class="text-xs font-medium text-muted uppercase tracking-wider mb-3">Chip — color variants</p>
                        <div class="flex flex-wrap gap-2">
                            <Chip color="primary">Primary</Chip>
                            <Chip color="secondary">Secondary</Chip>
                            <Chip color="success">Success</Chip>
                            <Chip color="danger">Danger</Chip>
                            <Chip color="warning">Warning</Chip>
                            <Chip color="info">Info</Chip>
                        </div>
                    </div>
                    <div>
                        <p class="text-xs font-medium text-muted uppercase tracking-wider mb-3">ChipWithIcon</p>
                        <div class="flex flex-wrap gap-2">
                            <ChipWithIcon icon="check-circle" color="success" />
                            <ChipWithIcon icon="alert-triangle" color="warning" />
                            <ChipWithIcon icon="x-circle" color="danger" />
                            <ChipWithIcon icon="info-circle" color="info" />
                            <ChipWithIcon icon="star" color="primary" />
                        </div>
                    </div>
                    <div>
                        <p class="text-xs font-medium text-muted uppercase tracking-wider mb-3">Tag</p>
                        <div class="flex flex-wrap gap-2">
                            <Tag label="Pro" />
                            <Tag label="Enterprise" bg-color="#28C76F" />
                            <Tag label="Beta" bg-color="#FF9F43" />
                            <Tag label="New" bg-color="#EA5455" />
                            <Tag label="Free" bg-color="#A8AAAE" />
                        </div>
                    </div>
                </div>
            </section>

            <Divider />

            <!-- ══ ALERTS ═══════════════════════════════════════════════ -->
            <section id="alerts">
                <h2 class="text-heading font-semibold mb-1">Alerts</h2>
                <p class="text-sm text-muted mb-6">status prop: success · warning · danger · info</p>

                <div class="flex flex-col gap-3">
                    <Alert status="success" message="Your agent has been saved successfully." :closable="true" />
                    <Alert status="warning" message="Your plan is approaching its monthly limit." :closable="true" />
                    <Alert status="danger" message="Failed to connect to the data source. Please try again." :closable="true" />
                    <Alert status="info" message="A new model version is available. Update to GPT-4o." :closable="true" />
                    <Alert status="primary">
                        <template #title>Getting started</template>
                        <template #text>Add your first knowledge source to start training your agent.</template>
                    </Alert>
                </div>
            </section>

            <Divider />

            <!-- ══ FEEDBACK ════════════════════════════════════════════ -->
            <section id="feedback">
                <h2 class="text-heading font-semibold mb-1">Feedback</h2>
                <p class="text-sm text-muted mb-6">CircularLoader · ProgressBar</p>

                <div class="bg-white rounded-card shadow-card p-6 flex flex-col gap-6">
                    <div>
                        <p class="text-xs font-medium text-muted uppercase tracking-wider mb-4">CircularLoader — sizes &amp; colors</p>
                        <div class="flex items-center gap-6">
                            <CircularLoader color="primary" :size="16" :width="2" />
                            <CircularLoader color="primary" :size="24" :width="3" />
                            <CircularLoader color="primary" :size="36" :width="4" />
                            <CircularLoader color="success" :size="24" :width="3" />
                            <CircularLoader color="danger"  :size="24" :width="3" />
                            <CircularLoader color="warning" :size="24" :width="3" />
                            <CircularLoader :disabled="true" :size="24" :width="3" />
                        </div>
                    </div>
                    <div>
                        <p class="text-xs font-medium text-muted uppercase tracking-wider mb-4">ProgressBar</p>
                        <div class="flex flex-col gap-3">
                            <ProgressBar :loading="true" color="primary" />
                            <ProgressBar :loading="true" color="success" />
                            <ProgressBar :loading="true" color="danger" />
                        </div>
                    </div>
                </div>
            </section>

            <Divider />

            <!-- ══ TABS ════════════════════════════════════════════════ -->
            <section id="tabs">
                <h2 class="text-heading font-semibold mb-1">Tabs</h2>
                <p class="text-sm text-muted mb-6">HorizontalTabs — available/unavailable states</p>

                <div class="bg-white rounded-card shadow-card p-6">
                    <HorizontalTabs v-model="activeTab" :tabs="tabs" margin-top="mt-0" />
                    <div class="mt-6 p-4 bg-gray-8 rounded-md text-sm text-body">
                        Active tab: <strong>{{ tabs[activeTab]?.name }}</strong>
                    </div>
                </div>
            </section>

            <Divider />

            <!-- ══ MODALS ═══════════════════════════════════════════════ -->
            <section id="modals">
                <h2 class="text-heading font-semibold mb-1">Modals</h2>
                <p class="text-sm text-muted mb-6">Modal + Card — two inputs, dropdown, switch</p>

                <div class="bg-white rounded-card shadow-card p-6">
                    <PrimaryButton @click="isModalOpen = true">
                        <template #prepend><Icon icon="settings" size="16" /></template>
                        Open modal
                    </PrimaryButton>
                </div>
            </section>

        </div>
    </VMain>

    <!-- ── Modal ──────────────────────────────────────────────────────── -->
    <Modal v-model="isModalOpen" width="520" :show-close-button="true">
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
                        <TextInput v-model="form.message" placeholder="Hi! How can I help you today?" />
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
                    <ButtonBase variant="outlined" color="secondary" rounded="md" @click="isModalOpen = false">Cancel</ButtonBase>
                    <PrimaryButton @click="isModalOpen = false">Save changes</PrimaryButton>
                </div>
            </template>
        </Card>
    </Modal>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 120ms ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }
</style>
