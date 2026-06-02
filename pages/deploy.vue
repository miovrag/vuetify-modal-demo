<script setup>
import { ref, computed } from 'vue'
import Icon from '~/components/CustomGPT/Icon.vue'
import PrimaryButton from '~/components/CustomGPT/Buttons/PrimaryButton.vue'
import ButtonBase from '~/components/CustomGPT/Buttons/ButtonBase.vue'
import TextInput from '~/components/CustomGPT/TextInput.vue'
import SwitchInput from '~/components/CustomGPT/Switch.vue'
import Alert from '~/components/CustomGPT/Alert.vue'
import Divider from '~/components/CustomGPT/Divider.vue'

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
const prefix   = ref('miodgnfg8e')
const fullUrl  = computed(() => `${prefix.value}.customgpt-agents.com`)
const copied   = ref(false)
const toast    = ref(null)

function copyUrl() {
    navigator.clipboard?.writeText('https://' + fullUrl.value)
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
}

function showToast(msg) {
    toast.value = msg
    setTimeout(() => toast.value = null, 3200)
}

/* ── Edit modal ────────────────────────────────────────────────────── */
const editOpen    = ref(false)
const editVal     = ref(prefix.value)
const editStatus  = ref('idle') // idle | invalid | checking | taken | available | own
const editTimer   = ref(null)
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
    if (!v)                      { editStatus.value = 'idle';    return }
    if (!validateFormat(v))      { editStatus.value = 'invalid'; return }
    if (v === prefix.value)      { editStatus.value = 'idle';    return }
    editStatus.value = 'checking'
    editTimer.value = setTimeout(() => {
        if (ownedHistory.value.has(v))   editStatus.value = 'own'
        else if (TAKEN.has(v))           editStatus.value = 'taken'
        else                             editStatus.value = 'available'
    }, 550)
}

const editCanSave  = computed(() => (editStatus.value === 'available' || editStatus.value === 'own') && editVal.value !== prefix.value)
const editSuggestions = computed(() => editStatus.value === 'taken' ? getSuggestions(editVal.value) : [])

function saveEdit() {
    if (!editCanSave.value) return
    ownedHistory.value.add(prefix.value)
    prefix.value = editVal.value
    closeEdit()
    showToast(`Share link updated to ${editVal.value}.customgpt-agents.com`)
}

/* ── Live Chat Settings modal ──────────────────────────────────────── */
const lcOpen    = ref(false)
const lcTab     = ref('appearance')
const lcTabs    = [
    { id: 'appearance', label: 'Appearance' },
    { id: 'behavior',   label: 'Behavior' },
    { id: 'size',       label: 'Size' },
    { id: 'advanced',   label: 'Advanced' },
]

const settings = ref({
    iconPosition:     'right',
    iconSize:         'medium',
    windowPosition:   'focus',
    mobileFontSize:   'desktop',
    starterQuestion:  false,
    autoStart:        false,
    hideFromList:     false,
    dontPromptMobile: false,
    autoPopupDesktop: false,
    autoPopupMobile:  false,
    resetConversation: false,
    keepOpen:         false,
    widgetType:       'floating',
    width:            '400',
    heightMode:       'fixed',
    height:           '600',
})
const savedSettings = ref(JSON.parse(JSON.stringify(settings.value)))
const saveState     = ref('idle')
const lcToast       = ref(false)
const unsavedDialog = ref(false)

const hasUnsaved = computed(() => JSON.stringify(settings.value) !== JSON.stringify(savedSettings.value))

function openLC()  { lcTab.value = 'appearance'; lcOpen.value = true }
function closeLC() {
    if (hasUnsaved.value) { unsavedDialog.value = true }
    else { lcOpen.value = false }
}
function discardAndClose() { unsavedDialog.value = false; lcOpen.value = false; settings.value = JSON.parse(JSON.stringify(savedSettings.value)) }
function saveAndClose()    { unsavedDialog.value = false; savedSettings.value = JSON.parse(JSON.stringify(settings.value)); lcOpen.value = false }

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

const advancedFeatures = [
    { label: 'Custom Context', desc: 'Inject a custom system prompt into every conversation', plan: 'Premium' },
    { label: 'Pre-Prompt',     desc: 'Set a default opening message for new conversations',  plan: 'Premium' },
    { label: 'CRM Integration',desc: 'Sync visitor data with your CRM automatically',        plan: 'Enterprise' },
    { label: 'Labels',         desc: 'Tag and categorize conversations for reporting',        plan: 'Enterprise' },
]

/* ── Code block copy ───────────────────────────────────────────────── */
const copiedBlock = ref(null)
function copyBlock(id, text) {
    navigator.clipboard?.writeText(text)
    copiedBlock.value = id
    setTimeout(() => copiedBlock.value = null, 2000)
}
</script>

<template>
<div class="flex h-screen overflow-hidden bg-body font-sans">

    <!-- ══ AGENT SIDEBAR ══════════════════════════════════════════════ -->
    <aside class="w-[270px] shrink-0 bg-white border-r border-divider flex flex-col h-screen">

        <!-- Logo -->
        <div class="flex items-center gap-3 px-5 h-16 border-b border-divider shrink-0">
            <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
                <path d="M9.4 26.6C8.4 26.6 7.5 26 7.1 25.1H0C0.4 28 2.5 30.5 5.3 31.2C4.4 34.9 6.3 38.2 9.2 39.8C9.3 43.8 12.5 47 16.5 47C19.2 47 21.6 45.5 22.9 43.1V31H17.7V34.1C18.6 34.6 19.2 35.5 19.2 36.5C19.2 37.9 18.1 39 16.7 39C15.3 39 14.2 37.9 14.2 36.5C14.2 35.5 14.8 34.6 15.7 34.1V28.9H23V19.9H17.2V15.7H14.8C14.4 16.6 13.5 17.2 12.5 17.2C11.1 17.2 10 16.1 10 14.7C10 13.2 11.1 12.1 12.5 12.1C13.5 12.1 14.4 12.7 14.8 13.6H19.2V17.8H23V4.9C21.7 2.5 19.4 1 16.6 1C12.7 1 9.4 4.2 9.3 8.2C6.3 9.7 4.5 13.2 5.4 16.8C2.6 17.6 0.5 20 0.1 22.9H7.2C7.6 22 8.5 21.4 9.5 21.4C10.9 21.4 12 22.5 12 23.9C12 25.4 10.8 26.6 9.4 26.6Z" fill="#7367F0"/>
                <path d="M42.6 16.8C43.5 13.3 41.7 9.8 38.7 8.2C38.6 4.2 35.3 1 31.4 1C28.7 1 26.3 2.5 25 4.9V10.5H30C30.4 9.6 31.3 9 32.3 9C33.7 9 34.8 10.1 34.8 11.5C34.8 12.9 33.7 14.1 32.3 14.1C31.3 14.1 30.4 13.4 30 12.5H25V37H28.8V32.2H33.4C33.8 31.3 34.7 30.7 35.7 30.7C37.1 30.7 38.2 31.8 38.2 33.2C38.2 34.7 37.1 35.8 35.7 35.8C34.7 35.8 33.8 35.2 33.4 34.3H30.8V39H25V43.1C26.3 45.5 28.6 47 31.4 47C35.4 47 38.6 43.7 38.7 39.8C41.7 38.3 43.5 34.9 42.6 31.2C42.9 31.1 43.1 31 43.4 30.9V26.8H35V21.7C34.1 21.3 33.5 20.4 33.5 19.4C33.5 17.9 34.6 16.8 36 16.8C37.4 16.8 38.5 17.9 38.5 19.4C38.5 20.4 37.9 21.3 37 21.7V24.8H45.3V29.7C47 28.4 48 26.3 48 24.1C48 20.7 45.7 17.7 42.6 16.8Z" fill="#7367F0"/>
            </svg>
            <span class="font-semibold text-heading text-base">CustomGPT</span>
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
            <button class="flex items-center gap-2 px-2 py-2 rounded-md w-full text-primary text-sm font-semibold cursor-pointer hover:bg-primary-8 transition-colors duration-150">
                <Icon icon="chevron-left" size="15" color="#7367F0" />
                My Agent
            </button>
        </div>

        <!-- Nav items -->
        <nav class="flex flex-col gap-0.5 p-2 flex-1">
            <button
                v-for="item in sidebarNav" :key="item.id"
                class="flex items-center gap-2.5 px-3 py-2 rounded-md w-full text-left text-sm cursor-pointer transition-colors duration-150"
                :class="item.active
                    ? 'bg-primary-8 text-primary font-semibold'
                    : 'text-body font-normal hover:bg-gray-100'"
            >
                <Icon :icon="item.icon" size="16" :color="item.active ? '#7367F0' : '#8F9194'" />
                {{ item.label }}
            </button>
        </nav>

        <!-- Copilot widget -->
        <div class="mx-2 mb-2 border border-divider rounded-md p-2">
            <p class="text-xs font-semibold text-muted mb-2">CustomGPT.ai Copilot</p>
            <div class="flex items-center gap-2 border border-divider rounded-md px-3 py-2 bg-white">
                <span class="flex-1 text-xs text-muted">I need help with…</span>
                <Icon icon="send" size="14" color="#B7B5BE" />
            </div>
        </div>

        <!-- Developers -->
        <div class="flex items-center justify-between px-5 py-3 border-t border-divider cursor-pointer hover:bg-gray-100 transition-colors duration-150">
            <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-md bg-primary-8 flex items-center justify-center">
                    <Icon icon="code" size="16" color="#7367F0" />
                </div>
                <span class="text-sm font-medium text-heading">Developers</span>
            </div>
            <Icon icon="chevron-right" size="14" color="#B7B5BE" />
        </div>

        <!-- My Profile -->
        <div class="flex items-center justify-between px-5 py-3 border-t border-divider cursor-pointer hover:bg-gray-100 transition-colors duration-150">
            <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-primary-16 flex items-center justify-center text-xs font-bold text-primary">
                    MR
                </div>
                <span class="text-sm font-medium text-heading">My Profile</span>
            </div>
            <Icon icon="chevron-right" size="14" color="#B7B5BE" />
        </div>
    </aside>

    <!-- ══ MAIN CONTENT ════════════════════════════════════════════════ -->
    <div class="flex-1 flex flex-col overflow-hidden min-w-0">

        <!-- Top bar -->
        <div class="h-14 bg-white border-b border-divider flex items-center px-6 gap-3 shrink-0">
            <Icon icon="layout-sidebar" size="18" color="#B7B5BE" class="cursor-pointer" />
            <div class="flex items-center gap-3 flex-1 min-w-0">
                <h1 class="text-lg font-bold text-heading m-0 whitespace-nowrap">
                    Deploy <span class="font-normal text-muted">•</span> My Agent
                </h1>
                <span class="inline-flex items-center gap-1 bg-warning-100 text-warning-700 px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap">
                    <Icon icon="bolt" size="11" color="#D98739" />
                    Plan and Act (BETA)
                </span>
            </div>
            <div class="text-right shrink-0">
                <div class="text-xs text-muted">Agent ID: {{ AGENT_ID }}</div>
                <div class="text-xs text-muted">Agent Key: {{ AGENT_KEY.slice(0, 16) }}…</div>
            </div>
        </div>

        <!-- Tab nav -->
        <div class="flex bg-white border-b border-divider px-7 shrink-0">
            <button
                v-for="tab in tabs" :key="tab.id"
                class="inline-flex items-center gap-2 px-4 py-3 text-sm cursor-pointer transition-colors duration-150 border-b-2 whitespace-nowrap"
                :class="activeTab === tab.id
                    ? 'border-primary text-primary font-semibold'
                    : 'border-transparent text-muted font-normal hover:text-body'"
                @click="activeTab = tab.id"
            >
                <Icon :icon="tab.icon" size="14" :color="activeTab === tab.id ? '#7367F0' : '#A5A2AD'" />
                {{ tab.label }}
            </button>
        </div>

        <!-- Content area -->
        <main class="flex-1 overflow-y-auto">

            <!-- Share tab -->
            <div v-if="activeTab === 'share'" class="max-w-2xl mx-auto px-8 py-8">

                <!-- Share link section -->
                <section class="mb-8">
                    <div class="flex items-center justify-between mb-3">
                        <h2 class="text-base font-semibold text-heading m-0">Share your agent</h2>
                    </div>
                    <p class="text-sm text-muted mb-3">Share this link so anyone can start a conversation with your agent.</p>

                    <!-- URL row -->
                    <div class="flex items-center border border-divider rounded-md bg-white px-4 h-10 gap-2">
                        <span class="flex-1 text-sm text-body overflow-hidden text-ellipsis whitespace-nowrap">{{ fullUrl }}</span>
                        <div class="flex gap-1 shrink-0">
                            <button class="action-icon" title="Edit share link" @click="openEdit">
                                <Icon icon="pencil" size="15" color="#A5A2AD" />
                            </button>
                            <button class="action-icon" title="Copy link" @click="copyUrl">
                                <Icon :icon="copied ? 'check' : 'copy'" size="15" :color="copied ? '#28C76F' : '#A5A2AD'" />
                            </button>
                        </div>
                    </div>
                    <div class="text-right mt-2">
                        <a href="#" class="text-sm text-primary hover:underline">Prefer the old link format?</a>
                    </div>
                </section>

                <Divider />

                <!-- Live chat section -->
                <section class="my-8">
                    <div class="flex items-center justify-between mb-3">
                        <h2 class="text-base font-semibold text-heading m-0">Add a live chat to your website</h2>
                        <div class="flex items-center gap-2">
                            <ButtonBase variant="outlined" color="secondary" rounded="md" size="small">Try it out</ButtonBase>
                            <button class="action-icon" title="Live chat settings" @click="openLC">
                                <Icon icon="settings" size="15" color="#A5A2AD" />
                            </button>
                        </div>
                    </div>
                    <p class="text-sm text-muted mb-3">
                        Copy the following code and paste it inside the <code class="bg-gray-100 px-1 rounded">&lt;body&gt;</code> section of your webpage.
                    </p>
                    <div class="code-block">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs text-muted">JavaScript</span>
                            <button class="action-icon" @click="copyBlock('livechat', liveChatCode)">
                                <Icon :icon="copiedBlock === 'livechat' ? 'check' : 'copy'" size="14" :color="copiedBlock === 'livechat' ? '#28C76F' : '#A5A2AD'" />
                            </button>
                        </div>
                        <pre class="text-sm text-body m-0 whitespace-pre-wrap">{{ liveChatCode }}</pre>
                    </div>
                </section>

                <Divider />

                <!-- Embed section -->
                <section class="mt-8">
                    <div class="flex items-center justify-between mb-3">
                        <h2 class="text-base font-semibold text-heading m-0">Embed an agent into your website</h2>
                        <div class="flex items-center gap-2">
                            <ButtonBase variant="outlined" color="secondary" rounded="md" size="small">Try it out</ButtonBase>
                            <button class="action-icon" title="Embed settings">
                                <Icon icon="settings" size="15" color="#A5A2AD" />
                            </button>
                        </div>
                    </div>
                    <p class="text-sm text-muted mb-3">
                        Copy the following code and paste it into the <code class="bg-gray-100 px-1 rounded">&lt;body&gt;</code> section of your webpage.
                    </p>
                    <div class="code-block">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-xs text-muted">HTML</span>
                            <button class="action-icon" @click="copyBlock('embed', embedCode)">
                                <Icon :icon="copiedBlock === 'embed' ? 'check' : 'copy'" size="14" :color="copiedBlock === 'embed' ? '#28C76F' : '#A5A2AD'" />
                            </button>
                        </div>
                        <pre class="text-sm text-body m-0 whitespace-pre-wrap">{{ embedCode }}</pre>
                    </div>
                </section>

            </div>

            <!-- Other tabs placeholder -->
            <div v-else class="flex items-center justify-center h-64 text-sm text-muted">
                Coming soon
            </div>
        </main>
    </div>

    <!-- ══ EDIT MODAL ═════════════════════════════════════════════════ -->
    <Teleport to="body">
        <div v-if="editOpen" class="modal-backdrop" @click.self="closeEdit">
            <button class="modal-close-x" @click="closeEdit">
                <Icon icon="x" size="14" color="#A5A2AD" />
            </button>
            <div class="modal-card" style="max-width: 520px;">
                <h2 class="text-xl font-semibold text-heading mb-5">Custom share link</h2>

                <!-- Input with suffix -->
                <div
                    class="flex items-center border rounded-md px-4 py-2 overflow-hidden cursor-text transition-all duration-150"
                    :class="{
                        'border-danger': editStatus === 'invalid' || editStatus === 'taken',
                        'border-primary': editStatus !== 'invalid' && editStatus !== 'taken',
                        'border-divider': editStatus === 'idle' || editStatus === 'checking',
                    }"
                >
                    <input
                        :value="editVal"
                        @input="handleEditInput($event.target.value)"
                        @keydown.enter="editCanSave && saveEdit()"
                        maxlength="63"
                        placeholder="my-agent"
                        spellcheck="false"
                        class="border-none outline-none bg-transparent text-sm text-heading p-0 min-w-[8ch] flex-shrink-0"
                        style="width: max-content; max-width: 220px;"
                    />
                    <span class="text-sm text-primary-400 whitespace-nowrap select-none">.customgpt-agents.com</span>
                </div>

                <!-- Validation hint -->
                <p class="text-xs mt-2"
                   :class="{
                       'text-danger': editStatus === 'invalid' || editStatus === 'taken',
                       'text-success': editStatus === 'available',
                       'text-muted': editStatus === 'idle' || editStatus === 'checking' || editStatus === 'own',
                   }">
                    <template v-if="editStatus === 'checking'">Checking availability…</template>
                    <template v-else-if="editStatus === 'invalid'">1–63 characters, lowercase letters, numbers, and hyphens only.</template>
                    <template v-else-if="editStatus === 'taken'">This name is taken.</template>
                    <template v-else-if="editStatus === 'available'">Available — looks good!</template>
                    <template v-else-if="editStatus === 'own'">This is a name you previously used.</template>
                    <template v-else>1–63 characters, lowercase letters, numbers, and hyphens only.</template>
                </p>

                <!-- Suggestions when taken -->
                <div v-if="editSuggestions.length" class="flex gap-2 mt-3">
                    <span class="text-sm text-muted">Try:</span>
                    <button
                        v-for="s in editSuggestions" :key="s"
                        class="text-sm text-primary hover:underline cursor-pointer"
                        @click="handleEditInput(s)"
                    >{{ s }}</button>
                </div>

                <!-- Warning when valid -->
                <Alert
                    v-if="editStatus === 'available' || editStatus === 'own'"
                    status="warning"
                    class="mt-4"
                    message="Changing your share link will break any existing links you have shared."
                />

                <!-- Actions -->
                <div class="flex justify-end gap-2 mt-6">
                    <ButtonBase variant="outlined" color="secondary" rounded="md" @click="closeEdit">Cancel</ButtonBase>
                    <PrimaryButton :disabled="!editCanSave" @click="saveEdit">Save</PrimaryButton>
                </div>
            </div>
        </div>
    </Teleport>

    <!-- ══ LIVE CHAT SETTINGS MODAL ═══════════════════════════════════ -->
    <Teleport to="body">
        <div v-if="lcOpen" class="modal-backdrop" @click.self="closeLC">
            <div class="modal-card lc-modal">

                <!-- Toast -->
                <Transition name="toast">
                    <div v-if="lcToast" class="lc-toast">
                        <Icon icon="check" size="14" color="#fff" />
                        Live Chat Settings saved.
                    </div>
                </Transition>

                <!-- Header -->
                <div class="flex items-center justify-between px-6 pt-5 pb-0 shrink-0">
                    <h2 class="text-lg font-semibold text-heading m-0">Live Chat Settings</h2>
                    <button class="action-icon" @click="closeLC">
                        <Icon icon="x" size="16" color="#A5A2AD" />
                    </button>
                </div>

                <!-- Tab nav -->
                <div class="flex border-b border-divider px-6 mt-3 shrink-0">
                    <button
                        v-for="t in lcTabs" :key="t.id"
                        class="px-4 py-2.5 text-sm cursor-pointer border-b-2 transition-colors duration-150"
                        :class="lcTab === t.id
                            ? 'border-primary text-primary font-semibold'
                            : 'border-transparent text-muted hover:text-body'"
                        @click="lcTab = t.id"
                    >{{ t.label }}</button>
                </div>

                <!-- Tab content -->
                <div class="flex-1 overflow-y-auto px-6 py-5">

                    <!-- Appearance tab -->
                    <div v-if="lcTab === 'appearance'" class="flex flex-col gap-6">
                        <div v-for="group in [
                            { label: 'Icon position', key: 'iconPosition', options: [{ v: 'left', l: 'Left' }, { v: 'right', l: 'Right' }] },
                            { label: 'Icon size', key: 'iconSize', options: [{ v: 'small', l: 'Small' }, { v: 'medium', l: 'Medium' }, { v: 'large', l: 'Large' }] },
                            { label: 'Chat window position', key: 'windowPosition', options: [{ v: 'focus', l: 'Focus' }, { v: 'compact', l: 'Compact' }, { v: 'bubble', l: 'Bubble' }] },
                            { label: 'Mobile font size', key: 'mobileFontSize', options: [{ v: 'reduced', l: 'Reduced' }, { v: 'desktop', l: 'Same as desktop' }] },
                        ]" :key="group.key">
                            <p class="text-sm font-medium text-heading m-0 mb-2">{{ group.label }}</p>
                            <VRadioGroup v-model="settings[group.key]" hide-details :inline="true" color="primary" density="compact">
                                <VRadio v-for="opt in group.options" :key="opt.v" :value="opt.v" :label="opt.l" density="compact" />
                            </VRadioGroup>
                        </div>
                    </div>

                    <!-- Behavior tab -->
                    <div v-if="lcTab === 'behavior'" class="flex flex-col gap-5">
                        <div>
                            <p class="text-sm font-semibold text-heading mb-3">Agent initiative</p>
                            <div class="flex flex-col gap-3">
                                <div v-for="toggle in [
                                    { key: 'starterQuestion', label: 'Show starter question prompts' },
                                    { key: 'autoStart', label: 'Auto-start conversation' },
                                    { key: 'hideFromList', label: 'Hide prompt from list' },
                                    { key: 'dontPromptMobile', label: 'Suppress on mobile' },
                                ]" :key="toggle.key" class="flex items-center justify-between">
                                    <span class="text-sm text-body">{{ toggle.label }}</span>
                                    <SwitchInput v-model="settings[toggle.key]" />
                                </div>
                            </div>
                        </div>
                        <Divider />
                        <div>
                            <p class="text-sm font-semibold text-heading mb-3">Auto-popup</p>
                            <div class="flex flex-col gap-3">
                                <div v-for="toggle in [
                                    { key: 'autoPopupDesktop', label: 'Auto-popup on desktop' },
                                    { key: 'autoPopupMobile', label: 'Auto-popup on mobile' },
                                    { key: 'resetConversation', label: 'Reset previous conversation' },
                                    { key: 'keepOpen', label: 'Keep conversation open' },
                                ]" :key="toggle.key" class="flex items-center justify-between">
                                    <span class="text-sm text-body">{{ toggle.label }}</span>
                                    <SwitchInput v-model="settings[toggle.key]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Size tab -->
                    <div v-if="lcTab === 'size'" class="flex flex-col gap-5">
                        <div>
                            <p class="text-sm font-medium text-heading mb-2">Widget type</p>
                            <VRadioGroup v-model="settings.widgetType" hide-details :inline="true" color="primary" density="compact">
                                <VRadio value="floating" label="Floating bubble" density="compact" />
                                <VRadio value="embedded" label="Embedded iframe" density="compact" />
                            </VRadioGroup>
                        </div>
                        <div class="max-w-xs">
                            <p class="text-sm font-medium text-heading mb-2">Width (px)</p>
                            <TextInput v-model="settings.width" type="number" placeholder="400" />
                            <p class="text-xs text-muted mt-1">Recommended: 360–500px</p>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-heading mb-2">Height mode</p>
                            <VRadioGroup v-model="settings.heightMode" hide-details :inline="true" color="primary" density="compact">
                                <VRadio value="fixed" label="Fixed" density="compact" />
                                <VRadio value="dynamic" label="Dynamic" density="compact" />
                            </VRadioGroup>
                        </div>
                        <div v-if="settings.heightMode === 'fixed'" class="max-w-xs">
                            <p class="text-sm font-medium text-heading mb-2">Height (px)</p>
                            <TextInput v-model="settings.height" type="number" placeholder="600" />
                        </div>
                    </div>

                    <!-- Advanced tab -->
                    <div v-if="lcTab === 'advanced'" class="flex flex-col gap-3">
                        <div
                            v-for="feat in advancedFeatures" :key="feat.label"
                            class="flex items-start justify-between gap-4 p-4 border border-divider rounded-xl"
                        >
                            <div class="flex-1">
                                <div class="flex items-center gap-2 mb-1">
                                    <span class="text-sm font-medium text-heading">{{ feat.label }}</span>
                                    <span class="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                                          :class="feat.plan === 'Enterprise' ? 'bg-primary-8 text-primary' : 'bg-warning-100 text-warning-700'">
                                        <Icon icon="lock" size="10" :color="feat.plan === 'Enterprise' ? '#7367F0' : '#D98739'" />
                                        {{ feat.plan }}
                                    </span>
                                </div>
                                <p class="text-xs text-muted m-0">{{ feat.desc }}</p>
                            </div>
                            <SwitchInput :model-value="false" :disabled="true" />
                        </div>
                    </div>

                </div>

                <!-- Footer -->
                <div class="flex items-center justify-end gap-2 px-6 py-4 border-t border-divider shrink-0">
                    <span v-if="hasUnsaved" class="text-xs text-muted mr-auto">Unsaved changes</span>
                    <ButtonBase variant="outlined" color="secondary" rounded="md" @click="closeLC">Cancel</ButtonBase>
                    <PrimaryButton :disabled="saveState === 'saving'" @click="saveSettings">
                        <template #prepend v-if="saveState === 'saving'">
                            <VProgressCircular indeterminate size="14" width="2" color="white" />
                        </template>
                        <template #prepend v-else-if="saveState === 'success'">
                            <Icon icon="check" size="14" color="#fff" />
                        </template>
                        {{ saveState === 'saving' ? 'Saving…' : saveState === 'success' ? 'Saved' : 'Save changes' }}
                    </PrimaryButton>
                </div>
            </div>
        </div>
    </Teleport>

    <!-- Unsaved changes dialog -->
    <Teleport to="body">
        <div v-if="unsavedDialog" class="modal-backdrop">
            <div class="modal-card" style="max-width: 400px;">
                <h3 class="text-base font-semibold text-heading mb-2">Unsaved changes</h3>
                <p class="text-sm text-muted mb-5">You have unsaved changes. Are you sure you want to close without saving?</p>
                <div class="flex justify-end gap-2">
                    <ButtonBase variant="outlined" color="secondary" rounded="md" @click="unsavedDialog = false">Stay</ButtonBase>
                    <ButtonBase color="danger" variant="flat" rounded="md" @click="discardAndClose">Discard changes</ButtonBase>
                    <PrimaryButton @click="saveAndClose">Save & close</PrimaryButton>
                </div>
            </div>
        </div>
    </Teleport>

    <!-- Toast notification -->
    <Teleport to="body">
        <Transition name="toast">
            <div v-if="toast" class="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-success text-white text-sm font-medium px-4 py-3 rounded-lg shadow-card">
                <Icon icon="check" size="15" color="#fff" />
                {{ toast }}
            </div>
        </Transition>
    </Teleport>

</div>
</template>

<style scoped>
/* Action icon button (pencil, copy, settings, x) */
.action-icon {
    width: 32px; height: 32px;
    display: flex; align-items: center; justify-content: center;
    border: 1px solid #DBDADE; border-radius: 6px;
    background: transparent; cursor: pointer;
    transition: background 120ms, border-color 120ms;
}
.action-icon:hover { background: #F6F6F7; border-color: #B7B5BE; }

/* Code block */
.code-block {
    background: #F6F6F7;
    border: 1px solid #DBDADE;
    border-radius: 8px;
    padding: 16px;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
}

/* Modal backdrop + card */
.modal-backdrop {
    position: fixed; inset: 0;
    background: rgba(23, 23, 23, 0.55);
    z-index: 50;
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
}
.modal-card {
    position: relative;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(23, 23, 23, 0.18);
    width: 100%;
    padding: 28px;
    animation: modal-in 200ms cubic-bezier(0.2, 0.7, 0.3, 1);
}
.modal-close-x {
    position: absolute;
    top: -40px; right: 0;
    width: 32px; height: 32px;
    border: 1px solid #DBDADE; border-radius: 6px;
    background: #fff; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 4px rgba(23,23,23,.08);
}

/* Live chat modal */
.lc-modal {
    max-width: 680px;
    height: 540px;
    padding: 0;
    display: flex;
    flex-direction: column;
}
.lc-toast {
    position: absolute; top: 12px; left: 50%; transform: translateX(-50%);
    z-index: 10; background: #28C76F; color: #fff;
    font-size: 13px; font-weight: 500;
    padding: 8px 16px; border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,.12);
    white-space: nowrap;
    display: flex; align-items: center; gap: 6px;
}

@keyframes modal-in {
    from { opacity: 0; transform: scale(0.96); }
    to   { opacity: 1; transform: scale(1); }
}

.toast-enter-active, .toast-leave-active { transition: opacity 200ms, transform 200ms; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(8px); }
</style>
