<script setup>
import { ref, computed } from 'vue'
import Icon from '~/components/CustomGPT/Icon.vue'
import PrimaryButton from '~/components/CustomGPT/Buttons/PrimaryButton.vue'
import ButtonBase from '~/components/CustomGPT/Buttons/ButtonBase.vue'
import IconButton from '~/components/CustomGPT/Buttons/IconButton.vue'
import TextInput from '~/components/CustomGPT/TextInput.vue'
import SwitchInput from '~/components/CustomGPT/Switch.vue'
import Alert from '~/components/CustomGPT/Alert.vue'
import Divider from '~/components/CustomGPT/Divider.vue'
import Modal from '~/components/CustomGPT/Modal.vue'
import Card from '~/components/CustomGPT/Card.vue'
import CircularLoader from '~/components/CustomGPT/CircularLoader.vue'
import RadioGroup from '~/components/CustomGPT/RadioGroup.vue'

definePageMeta({ layout: 'blank' })

/* ── Constants ─────────────────────────────────────────────────────── */
const AGENT_ID  = '95211'
const AGENT_KEY = '7390ddddafa2f53b0631eec69707e438'
const TAKEN     = new Set(['support','sales-bot','help-center','demo','test','assistant','chat','bot','ai','agent'])

const liveChatCode = `<script>
  window.CustomGPTConfig = { agentId: "${AGENT_ID}" };
<\/script>
<script src="https://app.customgpt.ai/assets/js/chatbot.js" defer><\/script>`

const embedCode = `<iframe
  src="https://app.customgpt.ai/projects/${AGENT_ID}/ask/iframe"
  width="100%" height="600"
  style="border:none; border-radius:8px">
</iframe>`

/* ── Sidebar nav ───────────────────────────────────────────────────── */
const sidebarNav = [
    { id: 'build',       label: 'Build',       icon: 'file-text' },
    { id: 'personalize', label: 'Personalize', icon: 'wand' },
    { id: 'actions',     label: 'Actions',     icon: 'plug-connected' },
    { id: 'ask',         label: 'Ask',         icon: 'message-circle' },
    { id: 'deploy',      label: 'Deploy',      icon: 'rocket', active: true },
    { id: 'analyze',     label: 'Analyze',     icon: 'chart-bar' },
]

/* ── Deploy tabs ───────────────────────────────────────────────────── */
const tabs = [
    { id: 'share',        label: 'Share',        icon: 'share' },
    { id: 'integrations', label: 'Integrations', icon: 'plug' },
    { id: 'advanced',     label: 'Advanced',     icon: 'settings' },
    { id: 'api',          label: 'API',          icon: 'terminal-2' },
    { id: 'mcp',          label: 'MCP Server',   icon: 'server' },
]
const activeTab = ref('share')

/* ── Share link ────────────────────────────────────────────────────── */
const prefix  = ref('miodgnfg8e')
const fullUrl = computed(() => `${prefix.value}.customgpt-agents.com`)
const copied  = ref(false)
const toast   = ref(null)

function copyUrl() {
    navigator.clipboard?.writeText('https://' + fullUrl.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
}
function showToast(msg) {
    toast.value = msg
    setTimeout(() => { toast.value = null }, 3200)
}

/* ── Edit modal ────────────────────────────────────────────────────── */
const editOpen     = ref(false)
const editVal      = ref(prefix.value)
const editStatus   = ref('idle')
const editTimer    = ref(null)
const ownedHistory = ref(new Set([prefix.value]))

function openEdit() { editVal.value = prefix.value; editStatus.value = 'idle'; editOpen.value = true }
function closeEdit() { editOpen.value = false }

function validateFormat(v) {
    return v.length >= 1 && v.length <= 63 && /^[a-z0-9][a-z0-9-]*$/.test(v)
}
function getSuggestions(v) {
    return ['-2', '-help', '-chat'].map(s => v + s).filter(s => validateFormat(s) && !TAKEN.has(s)).slice(0, 3)
}
function handleEditInput(raw) {
    const v = raw.toLowerCase().replace(/[^a-z0-9-]/g, '')
    editVal.value = v
    clearTimeout(editTimer.value)
    if (!v)                 { editStatus.value = 'idle';    return }
    if (!validateFormat(v)) { editStatus.value = 'invalid'; return }
    if (v === prefix.value) { editStatus.value = 'idle';    return }
    editStatus.value = 'checking'
    editTimer.value = setTimeout(() => {
        if (ownedHistory.value.has(v)) editStatus.value = 'own'
        else if (TAKEN.has(v))         editStatus.value = 'taken'
        else                           editStatus.value = 'available'
    }, 550)
}
const editCanSave    = computed(() => (editStatus.value === 'available' || editStatus.value === 'own') && editVal.value !== prefix.value)
const editSuggestions = computed(() => editStatus.value === 'taken' ? getSuggestions(editVal.value) : [])

const editStatusClass = computed(() => ({
    'text-danger':  editStatus.value === 'invalid' || editStatus.value === 'taken',
    'text-success-DEFAULT': editStatus.value === 'available',
    'text-muted':   ['idle','checking','own'].includes(editStatus.value),
}))
const editStatusMsg = computed(() => ({
    checking:  'Checking availability…',
    invalid:   '1–63 chars, lowercase letters, numbers and hyphens only.',
    taken:     'This name is taken.',
    available: 'Available — looks good!',
    own:       'This is a name you previously used.',
    idle:      '1–63 chars, lowercase letters, numbers and hyphens only.',
}[editStatus.value]))

function saveEdit() {
    if (!editCanSave.value) return
    ownedHistory.value.add(prefix.value)
    prefix.value = editVal.value
    closeEdit()
    showToast(`Share link updated to ${editVal.value}.customgpt-agents.com`)
}

/* ── Live Chat Settings modal ──────────────────────────────────────── */
const lcOpen = ref(false)
const lcTab  = ref('appearance')
const lcTabs = [
    { id: 'appearance', label: 'Appearance' },
    { id: 'behavior',   label: 'Behavior'   },
    { id: 'size',       label: 'Size'       },
    { id: 'advanced',   label: 'Advanced'   },
]

const settings = ref({
    iconPosition:      'right',
    iconSize:          'medium',
    windowPosition:    'focus',
    mobileFontSize:    'desktop',
    starterQuestion:   false,
    autoStart:         false,
    hideFromList:      false,
    dontPromptMobile:  false,
    autoPopupDesktop:  false,
    autoPopupMobile:   false,
    resetConversation: false,
    keepOpen:          false,
    widgetType:        'floating',
    width:             '400',
    heightMode:        'fixed',
    height:            '600',
})
const savedSettings = ref(JSON.parse(JSON.stringify(settings.value)))
const saveState     = ref('idle')
const lcToast       = ref(false)
const unsavedDialog = ref(false)

const hasUnsaved = computed(() => JSON.stringify(settings.value) !== JSON.stringify(savedSettings.value))

function openLC()  { lcTab.value = 'appearance'; lcOpen.value = true }
function closeLC() { hasUnsaved.value ? unsavedDialog.value = true : lcOpen.value = false }
function discardAndClose() {
    unsavedDialog.value = false
    lcOpen.value = false
    settings.value = JSON.parse(JSON.stringify(savedSettings.value))
}
function saveAndClose() {
    unsavedDialog.value = false
    savedSettings.value = JSON.parse(JSON.stringify(settings.value))
    lcOpen.value = false
}
function saveSettings() {
    if (saveState.value !== 'idle') return
    saveState.value = 'saving'
    setTimeout(() => {
        savedSettings.value = JSON.parse(JSON.stringify(settings.value))
        saveState.value = 'success'
        lcToast.value = true
        setTimeout(() => { lcToast.value = false; saveState.value = 'idle' }, 2500)
    }, 1200)
}

const appearanceGroups = [
    { label: 'Icon position',       key: 'iconPosition',   options: [{ v: 'left', l: 'Left' }, { v: 'right', l: 'Right' }] },
    { label: 'Icon size',           key: 'iconSize',       options: [{ v: 'small', l: 'Small' }, { v: 'medium', l: 'Medium' }, { v: 'large', l: 'Large' }] },
    { label: 'Chat window',         key: 'windowPosition', options: [{ v: 'focus', l: 'Focus' }, { v: 'compact', l: 'Compact' }, { v: 'bubble', l: 'Bubble' }] },
    { label: 'Mobile font size',    key: 'mobileFontSize', options: [{ v: 'reduced', l: 'Reduced' }, { v: 'desktop', l: 'Same as desktop' }] },
]
const behaviorSections = [
    { heading: 'Agent initiative', toggles: [
        { key: 'starterQuestion',  label: 'Show starter question prompts' },
        { key: 'autoStart',        label: 'Auto-start conversation' },
        { key: 'hideFromList',     label: 'Hide prompt from list' },
        { key: 'dontPromptMobile', label: 'Suppress on mobile' },
    ]},
    { heading: 'Auto-popup', toggles: [
        { key: 'autoPopupDesktop',   label: 'Auto-popup on desktop' },
        { key: 'autoPopupMobile',    label: 'Auto-popup on mobile' },
        { key: 'resetConversation',  label: 'Reset previous conversation' },
        { key: 'keepOpen',           label: 'Keep conversation open' },
    ]},
]
const advancedFeatures = [
    { label: 'Custom context',   desc: 'Inject a custom system prompt into every conversation', plan: 'Premium',    color: 'warning' },
    { label: 'Pre-prompt',       desc: 'Set a default opening message for new conversations',   plan: 'Premium',    color: 'warning' },
    { label: 'CRM integration',  desc: 'Sync visitor data with your CRM automatically',        plan: 'Enterprise', color: 'primary' },
    { label: 'Labels',           desc: 'Tag and categorize conversations for reporting',        plan: 'Enterprise', color: 'primary' },
]

/* ── Code block copy ───────────────────────────────────────────────── */
const copiedBlock = ref(null)
function copyBlock(id, text) {
    navigator.clipboard?.writeText(text)
    copiedBlock.value = id
    setTimeout(() => { copiedBlock.value = null }, 2000)
}
</script>

<template>
<div class="flex h-screen overflow-hidden bg-body font-sans">

    <!-- ══ AGENT SIDEBAR ════════════════════════════════════════════ -->
    <aside class="w-64 shrink-0 bg-white border-r border-divider flex flex-col h-screen">

        <!-- Logo -->
        <div class="flex items-center gap-3 px-5 h-16 border-b border-divider shrink-0">
            <svg width="24" height="24" viewBox="0 0 48 48" fill="none" class="shrink-0">
                <path d="M9.4 26.6C8.4 26.6 7.5 26 7.1 25.1H0C0.4 28 2.5 30.5 5.3 31.2C4.4 34.9 6.3 38.2 9.2 39.8C9.3 43.8 12.5 47 16.5 47C19.2 47 21.6 45.5 22.9 43.1V31H17.7V34.1C18.6 34.6 19.2 35.5 19.2 36.5C19.2 37.9 18.1 39 16.7 39C15.3 39 14.2 37.9 14.2 36.5C14.2 35.5 14.8 34.6 15.7 34.1V28.9H23V19.9H17.2V15.7H14.8C14.4 16.6 13.5 17.2 12.5 17.2C11.1 17.2 10 16.1 10 14.7C10 13.2 11.1 12.1 12.5 12.1C13.5 12.1 14.4 12.7 14.8 13.6H19.2V17.8H23V4.9C21.7 2.5 19.4 1 16.6 1C12.7 1 9.4 4.2 9.3 8.2C6.3 9.7 4.5 13.2 5.4 16.8C2.6 17.6 0.5 20 0.1 22.9H7.2C7.6 22 8.5 21.4 9.5 21.4C10.9 21.4 12 22.5 12 23.9C12 25.4 10.8 26.6 9.4 26.6Z" fill="#7367F0"/>
                <path d="M42.6 16.8C43.5 13.3 41.7 9.8 38.7 8.2C38.6 4.2 35.3 1 31.4 1C28.7 1 26.3 2.5 25 4.9V10.5H30C30.4 9.6 31.3 9 32.3 9C33.7 9 34.8 10.1 34.8 11.5C34.8 12.9 33.7 14.1 32.3 14.1C31.3 14.1 30.4 13.4 30 12.5H25V37H28.8V32.2H33.4C33.8 31.3 34.7 30.7 35.7 30.7C37.1 30.7 38.2 31.8 38.2 33.2C38.2 34.7 37.1 35.8 35.7 35.8C34.7 35.8 33.8 35.2 33.4 34.3H30.8V39H25V43.1C26.3 45.5 28.6 47 31.4 47C35.4 47 38.6 43.7 38.7 39.8C41.7 38.3 43.5 34.9 42.6 31.2C42.9 31.1 43.1 31 43.4 30.9V26.8H35V21.7C34.1 21.3 33.5 20.4 33.5 19.4C33.5 17.9 34.6 16.8 36 16.8C37.4 16.8 38.5 17.9 38.5 19.4C38.5 20.4 37.9 21.3 37 21.7V24.8H45.3V29.7C47 28.4 48 26.3 48 24.1C48 20.7 45.7 17.7 42.6 16.8Z" fill="#7367F0"/>
            </svg>
            <span class="font-semibold text-heading text-base leading-none">CustomGPT</span>
        </div>

        <!-- New Agent button -->
        <div class="p-3 border-b border-divider shrink-0">
            <PrimaryButton block>
                <template #prepend><Icon icon="plus" size="15" /></template>
                New Agent
            </PrimaryButton>
        </div>

        <!-- My Agent back link -->
        <div class="px-2 py-1 border-b border-divider shrink-0">
            <button class="flex items-center gap-2 px-2 py-2 rounded-md w-full text-primary text-sm font-semibold cursor-pointer hover:bg-primary-8 transition-colors duration-[120ms]">
                <Icon icon="chevron-left" size="15" color="primary" />
                My Agent
            </button>
        </div>

        <!-- Nav items -->
        <nav class="flex flex-col gap-1 p-2 flex-1">
            <button
                v-for="item in sidebarNav" :key="item.id"
                class="flex items-center gap-3 px-3 py-2 rounded-md w-full text-left text-sm cursor-pointer transition-colors duration-[120ms]"
                :class="item.active
                    ? 'bg-primary-8 text-primary font-semibold'
                    : 'text-body font-normal hover:bg-gray-100'"
            >
                <Icon
                    :icon="item.icon"
                    size="16"
                    :color="item.active ? 'primary' : undefined"
                    :class="item.active ? '' : 'text-muted'"
                />
                {{ item.label }}
            </button>
        </nav>

        <!-- Copilot widget -->
        <div class="mx-3 mb-3 border border-divider rounded-md p-3">
            <p class="text-xs font-semibold text-muted mb-2">CustomGPT.ai Copilot</p>
            <div class="flex items-center gap-2 border border-divider rounded-md px-3 py-2 bg-white">
                <span class="flex-1 text-xs text-muted">I need help with…</span>
                <Icon icon="send" size="14" class="text-muted" />
            </div>
        </div>

        <!-- Developers -->
        <div class="flex items-center justify-between px-5 py-3 border-t border-divider cursor-pointer hover:bg-gray-100 transition-colors duration-[120ms]">
            <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-md bg-primary-8 flex items-center justify-center">
                    <Icon icon="code" size="16" color="primary" />
                </div>
                <span class="text-sm font-medium text-heading">Developers</span>
            </div>
            <Icon icon="chevron-right" size="14" class="text-muted" />
        </div>

        <!-- My Profile -->
        <div class="flex items-center justify-between px-5 py-3 border-t border-divider cursor-pointer hover:bg-gray-100 transition-colors duration-[120ms]">
            <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-primary-16 flex items-center justify-center text-xs font-bold text-primary">
                    MR
                </div>
                <span class="text-sm font-medium text-heading">My Profile</span>
            </div>
            <Icon icon="chevron-right" size="14" class="text-muted" />
        </div>
    </aside>

    <!-- ══ MAIN CONTENT ══════════════════════════════════════════════ -->
    <div class="flex-1 flex flex-col overflow-hidden min-w-0">

        <!-- Top bar — 56px / h-14 -->
        <div class="h-14 bg-white border-b border-divider flex items-center px-6 gap-3 shrink-0">
            <Icon icon="layout-sidebar" size="18" class="text-muted cursor-pointer" />
            <div class="flex items-center gap-3 flex-1 min-w-0">
                <h1 class="text-xl font-bold text-heading m-0 whitespace-nowrap">
                    Deploy <span class="font-normal text-muted">•</span> My Agent
                </h1>
                <!-- BETA badge — bg-warning-100 / text-warning-700 -->
                <span class="inline-flex items-center gap-1 bg-warning-100 text-warning-700 px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                    <Icon icon="bolt" size="11" class="text-warning-700" />
                    Plan and Act (BETA)
                </span>
            </div>
            <!-- Agent ID / Key — monospace, text-xs -->
            <div class="text-right shrink-0 font-mono">
                <div class="text-xs text-muted">Agent ID: {{ AGENT_ID }}</div>
                <div class="text-xs text-muted">Agent Key: {{ AGENT_KEY.slice(0, 16) }}…</div>
            </div>
        </div>

        <!-- Tab nav — underline active indicator -->
        <div class="flex bg-white border-b border-divider px-6 shrink-0">
            <button
                v-for="tab in tabs" :key="tab.id"
                class="inline-flex items-center gap-2 px-4 py-3 text-sm cursor-pointer transition-colors duration-[120ms] border-b-2 whitespace-nowrap"
                :class="activeTab === tab.id
                    ? 'border-primary text-primary font-semibold'
                    : 'border-transparent text-muted font-normal hover:text-body'"
                @click="activeTab = tab.id"
            >
                <Icon
                    :icon="tab.icon"
                    size="14"
                    :color="activeTab === tab.id ? 'primary' : undefined"
                    :class="activeTab === tab.id ? '' : 'text-muted'"
                />
                {{ tab.label }}
            </button>
        </div>

        <!-- Content area -->
        <main class="flex-1 overflow-y-auto">

            <!-- ── Share tab ─────────────────────────────────────── -->
            <div v-if="activeTab === 'share'" class="max-w-3xl px-8 py-8">

                <!-- Share link -->
                <section class="mb-8">
                    <h2 class="text-base font-semibold text-heading mb-2">Share your agent</h2>
                    <p class="text-sm text-muted mb-4">Share this link so anyone can start a conversation with your agent.</p>

                    <!-- URL row — bordered display + icon buttons -->
                    <div class="flex items-center border border-divider rounded-md bg-white px-4 h-10 gap-2">
                        <span class="flex-1 text-sm text-body overflow-hidden text-ellipsis whitespace-nowrap">{{ fullUrl }}</span>
                        <div class="flex gap-1 shrink-0">
                            <IconButton icon="pencil" variant="outlined" rounded="md" size="small" @click="openEdit" />
                            <IconButton
                                :icon="copied ? 'check' : 'copy'"
                                :color="copied ? 'success' : 'default'"
                                variant="outlined"
                                rounded="md"
                                size="small"
                                @click="copyUrl"
                            />
                        </div>
                    </div>
                    <div class="text-right mt-2">
                        <a href="#" class="text-sm text-primary hover:underline">Prefer the old link format?</a>
                    </div>
                </section>

                <Divider />

                <!-- Live chat widget -->
                <section class="my-8">
                    <div class="flex items-center justify-between mb-3">
                        <h2 class="text-base font-semibold text-heading m-0">Add a live chat to your website</h2>
                        <div class="flex items-center gap-2">
                            <ButtonBase variant="outlined" color="secondary" rounded="md" size="small">Try it out</ButtonBase>
                            <IconButton icon="settings" variant="outlined" rounded="md" size="small" @click="openLC" />
                        </div>
                    </div>
                    <p class="text-sm text-muted mb-4">
                        Copy the following code and paste it inside the <code class="bg-gray-100 px-1 rounded-sm text-xs">&#x3C;body&#x3E;</code> section of your webpage.
                    </p>
                    <!-- Code block — bg-gray-100, border-divider, rounded-lg, p-4, font-mono -->
                    <div class="bg-gray-100 border border-divider rounded-lg p-4">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs text-muted">JavaScript</span>
                            <IconButton
                                :icon="copiedBlock === 'livechat' ? 'check' : 'copy'"
                                :color="copiedBlock === 'livechat' ? 'success' : 'default'"
                                variant="text"
                                size="small"
                                @click="copyBlock('livechat', liveChatCode)"
                            />
                        </div>
                        <pre class="text-sm text-body m-0 whitespace-pre-wrap font-mono">{{ liveChatCode }}</pre>
                    </div>
                </section>

                <Divider />

                <!-- Embed widget -->
                <section class="mt-8">
                    <div class="flex items-center justify-between mb-3">
                        <h2 class="text-base font-semibold text-heading m-0">Embed an agent into your website</h2>
                        <div class="flex items-center gap-2">
                            <ButtonBase variant="outlined" color="secondary" rounded="md" size="small">Try it out</ButtonBase>
                            <IconButton icon="settings" variant="outlined" rounded="md" size="small" />
                        </div>
                    </div>
                    <p class="text-sm text-muted mb-4">
                        Copy the following code and paste it into the <code class="bg-gray-100 px-1 rounded-sm text-xs">&#x3C;body&#x3E;</code> section of your webpage.
                    </p>
                    <div class="bg-gray-100 border border-divider rounded-lg p-4">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs text-muted">HTML</span>
                            <IconButton
                                :icon="copiedBlock === 'embed' ? 'check' : 'copy'"
                                :color="copiedBlock === 'embed' ? 'success' : 'default'"
                                variant="text"
                                size="small"
                                @click="copyBlock('embed', embedCode)"
                            />
                        </div>
                        <pre class="text-sm text-body m-0 whitespace-pre-wrap font-mono">{{ embedCode }}</pre>
                    </div>
                </section>
            </div>

            <!-- Other tabs placeholder -->
            <div v-else class="flex items-center justify-center h-64 text-sm text-muted">
                Coming soon
            </div>
        </main>
    </div>

    <!-- ══ EDIT MODAL — Modal + Card ════════════════════════════════ -->
    <!-- Components: Modal, Card, TextInput, Alert, ButtonBase, PrimaryButton -->
    <!-- Tokens: spacing-xl padding, radius-xl modal, border-default, shadow-card -->
    <Modal v-model="editOpen" width="520" :show-close-button="true">
        <Card>
            <template #title>Custom share link</template>
            <template #body>
                <div class="flex flex-col gap-4">

                    <!-- Prefix input -->
                    <div class="flex flex-col gap-2">
                        <span class="text-sm font-medium text-heading">Link prefix</span>
                        <TextInput
                            :model-value="editVal"
                            @update:model-value="handleEditInput"
                            @keydown.enter="editCanSave && saveEdit()"
                            placeholder="my-agent"
                        />
                        <!-- Preview -->
                        <p class="text-sm text-muted m-0">
                            Preview: <span class="font-medium text-heading">{{ editVal || 'my-agent' }}.customgpt-agents.com</span>
                        </p>
                        <!-- Validation message -->
                        <p class="text-xs m-0" :class="editStatusClass">{{ editStatusMsg }}</p>
                    </div>

                    <!-- Suggestions when taken -->
                    <div v-if="editSuggestions.length" class="flex items-center gap-2">
                        <span class="text-sm text-muted">Try:</span>
                        <button
                            v-for="s in editSuggestions" :key="s"
                            class="text-sm text-primary hover:underline cursor-pointer"
                            @click="handleEditInput(s)"
                        >{{ s }}</button>
                    </div>

                    <!-- Warning when valid change -->
                    <Alert
                        v-if="editStatus === 'available' || editStatus === 'own'"
                        status="warning"
                        message="Changing your share link will break any existing links you have shared."
                    />

                </div>
            </template>
            <template #actions>
                <div class="flex justify-end gap-2 w-full">
                    <ButtonBase variant="outlined" color="secondary" rounded="md" @click="closeEdit">Cancel</ButtonBase>
                    <PrimaryButton :disabled="!editCanSave" @click="saveEdit">Save</PrimaryButton>
                </div>
            </template>
        </Card>
    </Modal>

    <!-- ══ LIVE CHAT SETTINGS MODAL — Modal + structured body ═══════ -->
    <!-- Components: Modal, Card, RadioGroup, SwitchInput, TextInput, CircularLoader, Alert, ButtonBase, PrimaryButton, Icon -->
    <!-- Tokens: spacing-xl padding, border-divider dividers, text-sm labels, shadow-card -->
    <Modal v-model="lcOpen" width="680">
        <Card :no-body-padding="true" :no-title-padding="true" :no-actions-padding="true">

            <!-- Header -->
            <template #title-wrapper>
                <div class="flex items-center justify-between px-6 pt-5 pb-4 border-b border-divider relative">
                    <!-- Toast — bg-success, text-white, shadow-card, rounded-lg -->
                    <Transition name="lc-toast">
                        <div v-if="lcToast" class="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-success text-white text-xs font-medium px-4 py-2 rounded-lg shadow-card whitespace-nowrap">
                            <Icon icon="check" size="14" />
                            Live chat settings saved.
                        </div>
                    </Transition>
                    <h2 class="text-lg font-semibold text-heading m-0">Live chat settings</h2>
                    <IconButton icon="x" @click="closeLC" />
                </div>
                <!-- Tab nav -->
                <div class="flex border-b border-divider px-6">
                    <button
                        v-for="t in lcTabs" :key="t.id"
                        class="px-4 py-3 text-sm cursor-pointer border-b-2 transition-colors duration-[120ms]"
                        :class="lcTab === t.id
                            ? 'border-primary text-primary font-semibold'
                            : 'border-transparent text-muted hover:text-body'"
                        @click="lcTab = t.id"
                    >{{ t.label }}</button>
                </div>
            </template>

            <!-- Tab content — overflow-y-auto, min-h for consistent modal height -->
            <template #body>
                <div class="overflow-y-auto px-6 py-6 flex flex-col gap-6" style="min-height: 320px">

                    <!-- Appearance tab — RadioGroup per setting group -->
                    <template v-if="lcTab === 'appearance'">
                        <div v-for="group in appearanceGroups" :key="group.key" class="flex flex-col gap-2">
                            <span class="text-sm font-medium text-heading">{{ group.label }}</span>
                            <RadioGroup v-model="settings[group.key]" :is-inline="true" color="primary">
                                <VRadio
                                    v-for="opt in group.options" :key="opt.v"
                                    :value="opt.v" :label="opt.l"
                                    density="compact" color="primary"
                                />
                            </RadioGroup>
                        </div>
                    </template>

                    <!-- Behavior tab — SwitchInput toggles in two sections -->
                    <template v-if="lcTab === 'behavior'">
                        <div v-for="(section, si) in behaviorSections" :key="section.heading">
                            <Divider v-if="si > 0" class="mb-6" />
                            <p class="text-sm font-semibold text-heading mb-4">{{ section.heading }}</p>
                            <div class="flex flex-col gap-4">
                                <div v-for="toggle in section.toggles" :key="toggle.key" class="flex items-center justify-between">
                                    <span class="text-sm text-body">{{ toggle.label }}</span>
                                    <SwitchInput v-model="settings[toggle.key]" />
                                </div>
                            </div>
                        </div>
                    </template>

                    <!-- Size tab — RadioGroup + TextInput -->
                    <template v-if="lcTab === 'size'">
                        <div class="flex flex-col gap-2">
                            <span class="text-sm font-medium text-heading">Widget type</span>
                            <RadioGroup v-model="settings.widgetType" :is-inline="true" color="primary">
                                <VRadio value="floating" label="Floating bubble" density="compact" color="primary" />
                                <VRadio value="embedded" label="Embedded iframe" density="compact" color="primary" />
                            </RadioGroup>
                        </div>
                        <div class="flex flex-col gap-2 max-w-xs">
                            <span class="text-sm font-medium text-heading">Width (px)</span>
                            <TextInput v-model="settings.width" type="number" placeholder="400" />
                            <span class="text-xs text-muted">Recommended: 360–500px</span>
                        </div>
                        <div class="flex flex-col gap-2">
                            <span class="text-sm font-medium text-heading">Height mode</span>
                            <RadioGroup v-model="settings.heightMode" :is-inline="true" color="primary">
                                <VRadio value="fixed"   label="Fixed"   density="compact" color="primary" />
                                <VRadio value="dynamic" label="Dynamic" density="compact" color="primary" />
                            </RadioGroup>
                        </div>
                        <div v-if="settings.heightMode === 'fixed'" class="flex flex-col gap-2 max-w-xs">
                            <span class="text-sm font-medium text-heading">Height (px)</span>
                            <TextInput v-model="settings.height" type="number" placeholder="600" />
                        </div>
                    </template>

                    <!-- Advanced tab — plan-gated feature cards -->
                    <!-- Card tokens: bg-white, border-thin border-default, rounded-xl, p-4 -->
                    <template v-if="lcTab === 'advanced'">
                        <div
                            v-for="feat in advancedFeatures" :key="feat.label"
                            class="flex items-start justify-between gap-4 bg-white border border-divider rounded-xl p-4"
                        >
                            <div class="flex-1">
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="text-sm font-medium text-heading">{{ feat.label }}</span>
                                    <span
                                        class="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full"
                                        :class="feat.color === 'primary'
                                            ? 'bg-primary-8 text-primary'
                                            : 'bg-warning-100 text-warning-700'"
                                    >
                                        <Icon icon="lock" size="10" :color="feat.color === 'primary' ? 'primary' : undefined" :class="feat.color === 'primary' ? '' : 'text-warning-700'" />
                                        {{ feat.plan }}
                                    </span>
                                </div>
                                <p class="text-xs text-muted m-0">{{ feat.desc }}</p>
                            </div>
                            <SwitchInput :model-value="false" :disabled="true" />
                        </div>
                    </template>

                </div>
            </template>

            <!-- Footer — spacing-lg gap, border-divider top -->
            <template #actions>
                <div class="flex items-center justify-end gap-3 w-full border-t border-divider pt-4">
                    <span v-if="hasUnsaved" class="text-xs text-muted mr-auto">Unsaved changes</span>
                    <ButtonBase variant="outlined" color="secondary" rounded="md" @click="closeLC">Cancel</ButtonBase>
                    <PrimaryButton :disabled="saveState === 'saving'" @click="saveSettings">
                        <template #prepend>
                            <CircularLoader v-if="saveState === 'saving'" :size="14" :width="2" />
                            <Icon v-else-if="saveState === 'success'" icon="check" size="14" />
                        </template>
                        {{ saveState === 'saving' ? 'Saving…' : saveState === 'success' ? 'Saved' : 'Save changes' }}
                    </PrimaryButton>
                </div>
            </template>
        </Card>
    </Modal>

    <!-- ══ UNSAVED CHANGES DIALOG — Modal + Card ════════════════════ -->
    <Modal v-model="unsavedDialog" width="400">
        <Card>
            <template #title>Unsaved changes</template>
            <template #body>
                <p class="text-sm text-muted m-0">You have unsaved changes. Close without saving?</p>
            </template>
            <template #actions>
                <div class="flex justify-end gap-2 w-full">
                    <ButtonBase variant="outlined" color="secondary" rounded="md" @click="unsavedDialog = false">Stay</ButtonBase>
                    <ButtonBase color="danger" variant="flat" rounded="md" @click="discardAndClose">Discard</ButtonBase>
                    <PrimaryButton @click="saveAndClose">Save &amp; close</PrimaryButton>
                </div>
            </template>
        </Card>
    </Modal>

    <!-- ══ TOAST NOTIFICATION — bg-success, shadow-card, rounded-lg ═ -->
    <Teleport to="body">
        <Transition name="toast">
            <div
                v-if="toast"
                class="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-success text-white text-sm font-medium px-4 py-3 rounded-lg shadow-card"
            >
                <Icon icon="check" size="15" />
                {{ toast }}
            </div>
        </Transition>
    </Teleport>
</div>
</template>

<style scoped>
/* Toast transitions — 200ms entry/exit per interaction rules */
.toast-enter-active, .toast-leave-active     { transition: opacity 200ms, transform 200ms cubic-bezier(.2,.7,.3,1); }
.toast-enter-from,   .toast-leave-to         { opacity: 0; transform: translateY(8px); }

.lc-toast-enter-active, .lc-toast-leave-active { transition: opacity 200ms cubic-bezier(.2,.7,.3,1); }
.lc-toast-enter-from,   .lc-toast-leave-to     { opacity: 0; }
</style>
