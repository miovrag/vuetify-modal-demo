<script setup>
import { ref } from 'vue'
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

const isModalOpen = ref(false)
const textVal = ref('')
const switchVal = ref(false)
const dropdownVal = ref(null)
const checkboxVal = ref(false)
const radioVal = ref('a')
const activeTab = ref(0)

const palettes = [
    { name: 'Primary',   swatches: [['8','#F4F3FE'],['16','#E9E7FD'],['100','#E3E1FC'],['200','#C7C2F9'],['300','#ABA4F6'],['400','#8F85F3'],['DEFAULT','#7367F0'],['600','#685DD8'],['700','#6258CC'],['800','#5C52C0'],['900','#564DB4']] },
    { name: 'Secondary', swatches: [['16','#E9E9EA'],['100','#EEEEEF'],['200','#DCDDDF'],['300','#CBCCCE'],['400','#B9BBBE'],['DEFAULT','#A8AAAE'],['600','#98999D'],['700','#8F9194'],['800','#86888B'],['900','#7E7F82']] },
    { name: 'Success',   swatches: [['100','#D4F4E2'],['200','#A9E9C5'],['300','#7EDDA9'],['400','#53D28C'],['DEFAULT','#28C76F'],['600','#24B364'],['700','#22A95E'],['800','#209F59'],['900','#1E9553']] },
    { name: 'Danger',    swatches: [['50','#FBF2F2'],['100','#FBDDDD'],['200','#F7BBBB'],['300','#F29899'],['400','#EE7677'],['DEFAULT','#EA5455'],['600','#D34C4D'],['700','#C74748'],['800','#BB4344'],['900','#AF3F40']] },
    { name: 'Warning',   swatches: [['100','#FFECD9'],['200','#FFD9B4'],['300','#FFC58E'],['400','#FFB269'],['DEFAULT','#FF9F43'],['600','#E68F3C'],['700','#D98739'],['800','#CC7F36'],['900','#BF7732']] },
    { name: 'Info',      swatches: [['100','rgb(204,228,250)'],['DEFAULT','rgb(0,118,229)']] },
    { name: 'Gray',      swatches: [['8','#F5F6FB'],['100','#F6F6F7'],['200','#DBDADE'],['300','#C9C7CE'],['400','#B7B5BE'],['DEFAULT','#A5A2AD'],['600','#93909D'],['700','#817D8D'],['800','#6F6B7D'],['900','#5D586C']] },
    { name: 'Teal',      swatches: [['100','#DAEFEF'],['DEFAULT','#46AEAE']] },
    { name: 'Orange',    swatches: [['100','#FFF4E8'],['DEFAULT','#F7922F']] },
    { name: 'Dark Yellow', swatches: [['DEFAULT','#D7B300']] },
]
const uiColors = [
    { name: 'heading', hex: '#212121' }, { name: 'body', hex: '#565656' },
    { name: 'muted', hex: '#B7B5BE' },   { name: 'placeholder', hex: '#999999' },
    { name: 'white', hex: '#FFFFFF' },   { name: 'black', hex: '#000000' },
]
const dropdownOptions = [{ title: 'Option one', value: 'a' }, { title: 'Option two', value: 'b' }, { title: 'Option three', value: 'c' }]
const tabs = [{ name: 'General', icon: 'settings', available: true }, { name: 'Sources', icon: 'database', available: true }, { name: 'Sharing', icon: 'share', available: true }, { name: 'Advanced', icon: 'adjustments', available: false }]
const iconList = ['robot','database','chart-bar','messages','settings','user','bell','search','plus','edit','trash','check','x','chevron-down','chevron-right','upload','download','external-link','copy','lock','eye','star','heart','alert-circle','info-circle','help-circle']
const form = ref({ name: '', message: '', model: null, liveChat: false })
const modelOptions = [{ title: 'GPT-4o', value: 'gpt-4o' }, { title: 'GPT-4o Mini', value: 'gpt-4o-mini' }, { title: 'Claude 3.5 Sonnet', value: 'claude-sonnet' }]
</script>

<template>
    <div class="max-w-4xl mx-auto px-8 py-10 flex flex-col gap-16">

        <!-- COLORS -->
        <section id="colors">
            <h2 class="text-heading font-semibold mb-1">Colors</h2>
            <p class="text-sm text-muted mb-6">Full production palette from tailwind.config.js</p>
            <div class="flex flex-col gap-8">
                <div v-for="palette in palettes" :key="palette.name">
                    <p class="text-sm font-medium text-muted mb-3">{{ palette.name }}</p>
                    <div class="flex flex-wrap gap-2">
                        <div v-for="[label, hex] in palette.swatches" :key="label" class="flex flex-col items-center gap-1">
                            <div class="w-12 h-12 rounded-md border border-divider shadow-sm" :style="{ backgroundColor: hex }" />
                            <span class="text-xs text-muted">{{ label }}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <p class="text-sm font-medium text-muted mb-3">UI / Text</p>
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

        <!-- TYPOGRAPHY -->
        <section id="typography">
            <h2 class="text-heading font-semibold mb-1">Typography</h2>
            <p class="text-sm text-muted mb-6">Inter variable font · 4-pt size scale</p>
            <div class="flex flex-col gap-4 bg-white rounded-card p-6 shadow-card">
                <div v-for="[tag, label] in [['h1','h1 · 38px/500'],['h2','h2 · 32px/500'],['h3','h3 · 26px/500'],['h4','h4 · 22px/500'],['h5','h5 · 18px/500'],['h6','h6 · 15px/500']]" :key="tag" class="flex items-baseline gap-4 border-b border-divider pb-4">
                    <span class="text-xs text-muted w-28 shrink-0">{{ label }}</span>
                    <component :is="tag" class="text-heading m-0">Heading {{ tag }}</component>
                </div>
                <div class="flex items-baseline gap-4 border-b border-divider pb-4">
                    <span class="text-xs text-muted w-28 shrink-0">body · 15px/400</span>
                    <p class="text-body m-0">Body — the quick brown fox jumps over the lazy dog.</p>
                </div>
                <div class="flex items-baseline gap-4">
                    <span class="text-xs text-muted w-28 shrink-0">caption · 11px</span>
                    <span class="paragraph-extra-small text-muted">Caption — supplementary information</span>
                </div>
            </div>
            <div class="flex gap-8 mt-4 bg-white rounded-card p-6 shadow-card">
                <div v-for="[w, l] in [['400','Regular'],['500','Medium'],['600','Semibold'],['700','Bold']]" :key="w">
                    <p class="text-xs text-muted mb-1">{{ l }} · {{ w }}</p>
                    <p class="text-heading text-lg m-0" :style="{ fontWeight: w }">Inter</p>
                </div>
            </div>
        </section>

        <Divider />

        <!-- ICONS -->
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
            </div>
        </section>

        <Divider />

        <!-- BUTTONS -->
        <section id="buttons">
            <h2 class="text-heading font-semibold mb-1">Buttons</h2>
            <p class="text-sm text-muted mb-6">All variants and sizes</p>
            <div class="bg-white rounded-card shadow-card p-6 flex flex-col gap-6">
                <div>
                    <p class="text-sm font-medium text-muted mb-3">Variants</p>
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
                <div>
                    <p class="text-sm font-medium text-muted mb-3">Sizes</p>
                    <div class="flex flex-wrap gap-3 items-center">
                        <PrimaryButton size="x-small">X-Small</PrimaryButton>
                        <PrimaryButton size="small">Small</PrimaryButton>
                        <PrimaryButton>Default</PrimaryButton>
                        <PrimaryButton size="large">Large</PrimaryButton>
                    </div>
                </div>
                <div>
                    <p class="text-sm font-medium text-muted mb-3">With icons</p>
                    <div class="flex flex-wrap gap-3 items-center">
                        <PrimaryButton><template #prepend><Icon icon="plus" size="16" /></template>Create agent</PrimaryButton>
                        <ButtonBase variant="outlined" color="primary"><template #append><Icon icon="external-link" size="16" /></template>View docs</ButtonBase>
                        <IconButton icon="settings" color="default" />
                        <IconButton icon="trash" color="danger" variant="text" />
                        <IconButton icon="edit" color="primary" variant="tonal" />
                    </div>
                </div>
                <div>
                    <p class="text-sm font-medium text-muted mb-3">Status colors</p>
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

        <!-- FORM CONTROLS -->
        <section id="inputs">
            <h2 class="text-heading font-semibold mb-1">Form Controls</h2>
            <p class="text-sm text-muted mb-6">TextInput · DropdownList · Checkbox · RadioGroup · Switch</p>
            <div class="bg-white rounded-card shadow-card p-6 flex flex-col gap-6">
                <div class="flex flex-col gap-2 max-w-sm">
                    <p class="text-sm font-medium text-muted">TextInput</p>
                    <div class="flex flex-col gap-2">
                        <span class="text-sm font-medium text-heading">Agent name</span>
                        <TextInput v-model="textVal" placeholder="Enter agent name" />
                    </div>
                </div>
                <Divider />
                <div class="flex flex-col gap-2 max-w-sm">
                    <p class="text-sm font-medium text-muted">DropdownList</p>
                    <DropdownList v-model="dropdownVal" :options="dropdownOptions" label="Select option" label-position="top" />
                </div>
                <Divider />
                <div>
                    <p class="text-sm font-medium text-muted mb-2">Checkbox</p>
                    <div class="flex gap-6">
                        <Checkbox v-model="checkboxVal" label="Enable feature" />
                        <Checkbox :model-value="true" label="Checked" />
                        <Checkbox :model-value="false" label="Disabled" disabled />
                        <Checkbox :model-value="true" label="Success" color="success" />
                        <Checkbox :model-value="true" label="Danger" color="danger" />
                    </div>
                </div>
                <Divider />
                <div>
                    <p class="text-sm font-medium text-muted mb-2">RadioGroup</p>
                    <RadioGroup v-model="radioVal" :is-inline="true">
                        <VRadio density="compact" value="a" label="Option A" color="primary" />
                        <VRadio density="compact" value="b" label="Option B" color="primary" />
                        <VRadio density="compact" value="c" label="Option C" color="primary" />
                    </RadioGroup>
                </div>
                <Divider />
                <div>
                    <p class="text-sm font-medium text-muted mb-2">Switch</p>
                    <div class="flex gap-8 items-center">
                        <SwitchInput v-model="switchVal"><template #label><span class="text-sm text-body ml-2">Enable live chat</span></template></SwitchInput>
                        <SwitchInput :model-value="true"><template #label><span class="text-sm text-body ml-2">On</span></template></SwitchInput>
                        <SwitchInput :model-value="false" size="large"><template #label><span class="text-sm text-body ml-2">Large</span></template></SwitchInput>
                    </div>
                </div>
            </div>
        </section>

        <Divider />

        <!-- CARDS -->
        <section id="cards">
            <h2 class="text-heading font-semibold mb-1">Cards</h2>
            <p class="text-sm text-muted mb-6">rounded-card · shadow-card · bg-surface</p>
            <div class="grid grid-cols-2 gap-4">
                <Card>
                    <template #title>Card with title</template>
                    <template #body><p class="text-body text-sm">Body content. Cards use <code class="bg-gray-100 px-1 rounded text-xs">shadow-card</code> and <code class="bg-gray-100 px-1 rounded text-xs">rounded-card</code> automatically.</p></template>
                </Card>
                <Card>
                    <template #title>Card with actions</template>
                    <template #subTitle>Optional subtitle</template>
                    <template #body><p class="text-body text-sm">Card body content with subtitle.</p></template>
                    <template #actions>
                        <div class="flex justify-end gap-2 w-full">
                            <ButtonBase variant="outlined" color="secondary" rounded="md">Cancel</ButtonBase>
                            <PrimaryButton>Save</PrimaryButton>
                        </div>
                    </template>
                </Card>
            </div>
        </section>

        <Divider />

        <!-- CHIPS & TAGS -->
        <section id="chips">
            <h2 class="text-heading font-semibold mb-1">Chips &amp; Tags</h2>
            <div class="bg-white rounded-card shadow-card p-6 flex flex-col gap-6">
                <div>
                    <p class="text-sm font-medium text-muted mb-3">Chip</p>
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
                    <p class="text-sm font-medium text-muted mb-3">ChipWithIcon</p>
                    <div class="flex flex-wrap gap-2">
                        <ChipWithIcon icon="check-circle" color="success" />
                        <ChipWithIcon icon="alert-triangle" color="warning" />
                        <ChipWithIcon icon="x-circle" color="danger" />
                        <ChipWithIcon icon="info-circle" color="info" />
                        <ChipWithIcon icon="star" color="primary" />
                    </div>
                </div>
                <div>
                    <p class="text-sm font-medium text-muted mb-3">Tag</p>
                    <div class="flex flex-wrap gap-2">
                        <Tag label="Pro" /><Tag label="Enterprise" bg-color="#28C76F" /><Tag label="Beta" bg-color="#FF9F43" /><Tag label="New" bg-color="#EA5455" /><Tag label="Free" bg-color="#A8AAAE" />
                    </div>
                </div>
            </div>
        </section>

        <Divider />

        <!-- ALERTS -->
        <section id="alerts">
            <h2 class="text-heading font-semibold mb-1">Alerts</h2>
            <div class="flex flex-col gap-3">
                <Alert status="success" message="Your agent has been saved successfully." :closable="true" />
                <Alert status="warning" message="Your plan is approaching its monthly limit." :closable="true" />
                <Alert status="danger" message="Failed to connect to the data source." :closable="true" />
                <Alert status="info" message="A new model version is available." :closable="true" />
            </div>
        </section>

        <Divider />

        <!-- FEEDBACK -->
        <section id="feedback">
            <h2 class="text-heading font-semibold mb-1">Feedback</h2>
            <div class="bg-white rounded-card shadow-card p-6 flex flex-col gap-6">
                <div>
                    <p class="text-sm font-medium text-muted mb-4">CircularLoader</p>
                    <div class="flex items-center gap-6">
                        <CircularLoader color="primary" :size="16" :width="2" />
                        <CircularLoader color="primary" :size="24" :width="3" />
                        <CircularLoader color="primary" :size="36" :width="4" />
                        <CircularLoader color="success" :size="24" :width="3" />
                        <CircularLoader color="danger"  :size="24" :width="3" />
                        <CircularLoader :disabled="true" :size="24" :width="3" />
                    </div>
                </div>
                <div>
                    <p class="text-sm font-medium text-muted mb-4">ProgressBar</p>
                    <div class="flex flex-col gap-3">
                        <ProgressBar :loading="true" color="primary" />
                        <ProgressBar :loading="true" color="success" />
                        <ProgressBar :loading="true" color="danger" />
                    </div>
                </div>
            </div>
        </section>

        <Divider />

        <!-- TABS -->
        <section id="tabs">
            <h2 class="text-heading font-semibold mb-1">Tabs</h2>
            <div class="bg-white rounded-card shadow-card p-6">
                <HorizontalTabs v-model="activeTab" :tabs="tabs" margin-top="mt-0" />
                <div class="mt-4 p-3 bg-gray-8 rounded-md text-sm text-body">Active: <strong>{{ tabs[activeTab]?.name }}</strong></div>
            </div>
        </section>

        <Divider />

        <!-- MODALS -->
        <section id="modals">
            <h2 class="text-heading font-semibold mb-1">Modals</h2>
            <div class="bg-white rounded-card shadow-card p-6">
                <PrimaryButton @click="isModalOpen = true"><template #prepend><Icon icon="settings" size="16" /></template>Open modal</PrimaryButton>
            </div>
        </section>

    </div>

    <Modal v-model="isModalOpen" width="520" :show-close-button="true">
        <Card>
            <template #title>Agent configuration</template>
            <template #body>
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-2"><span class="text-sm font-medium text-heading">Agent name</span><TextInput v-model="form.name" placeholder="My support agent" /></div>
                    <div class="flex flex-col gap-2"><span class="text-sm font-medium text-heading">Welcome message</span><TextInput v-model="form.message" placeholder="Hi! How can I help you today?" /></div>
                    <DropdownList v-model="form.model" :options="modelOptions" label="AI model" label-position="top" />
                    <div class="border-t border-divider" />
                    <div class="flex items-center justify-between gap-4">
                        <div class="flex flex-col gap-1"><span class="text-sm font-medium text-heading">Enable live chat</span><span class="text-xs text-muted">Allow visitors to request a human agent</span></div>
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
