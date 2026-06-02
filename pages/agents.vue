<script setup>
import { ref } from 'vue'
import Icon from '~/components/CustomGPT/Icon.vue'
import PrimaryButton from '~/components/CustomGPT/Buttons/PrimaryButton.vue'
import ButtonBase from '~/components/CustomGPT/Buttons/ButtonBase.vue'
import TextInput from '~/components/CustomGPT/TextInput.vue'
import Card from '~/components/CustomGPT/Card.vue'

const search  = ref('')
const dateFilter = ref('All time')
const sortBy = ref('Newest first')
const view = ref('list')

const stats = [
    { icon: 'file-search',  value: '1',     label: 'Documents added',               clickable: true  },
    { icon: 'file-check',   value: '1',     label: 'Documents read',                clickable: true  },
    { icon: 'database',     value: '4,582', label: 'Words stored',                  clickable: false },
    { icon: 'message-dots', value: '4',     label: 'Query Credits (This Billing Cycle)', clickable: false },
]
</script>

<template>
    <div class="px-8 py-8">

        <!-- Page heading -->
        <h1 class="text-heading m-0">Agents</h1>

        <!-- Toolbar -->
        <div class="flex items-center justify-between mt-5 gap-4">

            <!-- Search -->
            <div style="max-width: 360px; width: 100%;">
                <TextInput
                    v-model="search"
                    placeholder="Search by agent name or id..."
                    density="comfortable"
                    :flat="false"
                >
                    <template #append-inner>
                        <Icon icon="search" size="18" color="#A5A2AD" />
                    </template>
                </TextInput>
            </div>

            <!-- Right controls -->
            <div class="flex items-center gap-3">

                <!-- All time -->
                <button class="filter-btn">
                    <Icon icon="calendar" size="16" color="#565656" />
                    <span class="text-sm text-body">All time</span>
                    <Icon icon="chevron-down" size="16" color="#565656" />
                </button>

                <!-- Newest first -->
                <button class="filter-btn">
                    <span class="text-sm text-body">Newest first</span>
                    <Icon icon="chevron-down" size="16" color="#565656" />
                </button>

                <!-- View toggle -->
                <div class="view-toggle">
                    <button
                        class="view-btn"
                        :class="view === 'list' ? 'view-btn--active' : ''"
                        @click="view = 'list'"
                    >
                        <Icon icon="layout-list" size="18" :color="view === 'list' ? '#7367F0' : '#A5A2AD'" />
                    </button>
                    <button
                        class="view-btn"
                        :class="view === 'grid' ? 'view-btn--active' : ''"
                        @click="view = 'grid'"
                    >
                        <Icon icon="layout-grid" size="18" :color="view === 'grid' ? '#7367F0' : '#A5A2AD'" />
                    </button>
                </div>

            </div>
        </div>

        <!-- Agent card -->
        <Card class="mt-6">
            <template #body>
                <div class="flex items-center justify-between gap-4">

                    <!-- Agent identity -->
                    <div class="flex items-center gap-4">
                        <img
                            src="https://i.pravatar.cc/96?img=68"
                            alt="Agent avatar"
                            class="w-12 h-12 rounded-full object-cover shrink-0"
                        />
                        <div>
                            <p class="text-heading font-semibold text-md leading-snug m-0">CustomGPT Platform Guide</p>
                            <p class="text-sm text-muted m-0 mt-0.5">Updated 1 hour ago</p>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="flex items-center gap-2 shrink-0">
                        <PrimaryButton>
                            <template #prepend>
                                <Icon icon="message-2" size="16" color="#fff" />
                            </template>
                            Ask me anything
                        </PrimaryButton>

                        <button class="action-icon-btn">
                            <Icon icon="chart-dots-3" size="18" color="#7367F0" />
                        </button>
                        <button class="action-icon-btn">
                            <Icon icon="mood-happy" size="18" color="#7367F0" />
                        </button>
                        <button class="action-icon-btn">
                            <Icon icon="dots-vertical" size="18" color="#7367F0" />
                        </button>
                    </div>

                </div>

                <!-- Stats row -->
                <div class="grid grid-cols-4 gap-4 mt-5">
                    <div
                        v-for="stat in stats"
                        :key="stat.label"
                        class="stat-card"
                        :class="stat.clickable ? 'cursor-pointer hover:border-primary hover:border-opacity-40 transition-colors duration-150' : ''"
                    >
                        <!-- Icon -->
                        <div class="stat-icon">
                            <Icon :icon="stat.icon" size="22" color="#7367F0" />
                        </div>

                        <!-- Value + label -->
                        <div class="flex-1 min-w-0">
                            <p class="font-bold text-heading m-0 leading-tight" style="font-size: 22px;">{{ stat.value }}</p>
                            <p class="text-sm text-muted m-0 mt-0.5 leading-snug">{{ stat.label }}</p>
                        </div>

                        <!-- Chevron (clickable cards only) -->
                        <Icon v-if="stat.clickable" icon="chevron-right" size="18" color="#A5A2AD" class="shrink-0" />
                    </div>
                </div>

            </template>
        </Card>

    </div>
</template>

<style scoped>
/* Filter dropdown buttons */
.filter-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0 16px;
    height: 40px;
    border: 1px solid #DBDADE;
    border-radius: 8px;
    background: #fff;
    cursor: pointer;
    transition: border-color 120ms;
    white-space: nowrap;
}
.filter-btn:hover { border-color: #B7B5BE; }

/* View toggle group */
.view-toggle {
    display: inline-flex;
    border: 1px solid #DBDADE;
    border-radius: 8px;
    overflow: hidden;
}
.view-btn {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    cursor: pointer;
    transition: background 120ms;
    border: none;
}
.view-btn:first-child { border-right: 1px solid #DBDADE; }
.view-btn--active { background: #F4F3FE; }

/* Action icon buttons (in agent card) */
.action-icon-btn {
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #DBDADE;
    border-radius: 8px;
    background: #fff;
    cursor: pointer;
    transition: border-color 120ms, background 120ms;
}
.action-icon-btn:hover {
    border-color: #7367F0;
    background: #F4F3FE;
}

/* Stat cards */
.stat-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    background: #fff;
    border: 1px solid #DBDADE;
    border-radius: 10px;
}
.stat-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: #F4F3FE;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}
</style>
