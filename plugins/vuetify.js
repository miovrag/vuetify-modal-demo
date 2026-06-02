import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { h } from 'vue'

const tablerIconSet = {
    component: (props) =>
        h('i', {
            class: `ti ti-${props.icon}`,
            style: {
                fontSize: typeof props.size === 'number'
                    ? `${props.size}px`
                    : props.size === 'default' ? '24px' : props.size,
                color: props.color ?? undefined,
            },
        }),
}

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        components,
        directives,
        icons: {
            defaultSet: 'tabler',
            sets: { tabler: tablerIconSet },
        },
        theme: {
            defaultTheme: 'customgpt',
            themes: {
                customgpt: {
                    dark: false,
                    colors: {
                        primary:    '#7367F0',
                        secondary:  '#A8AAAE',
                        success:    '#28C76F',
                        warning:    '#FF9F43',
                        danger:     '#EA5455',
                        info:       '#0076E5',
                        background: '#F5F5F5',
                        surface:    '#FFFFFF',
                        teal:       '#46AEAE',
                        orange:     '#F7922F',
                        darkyellow: '#D7B300',
                        gray:       '#A5A2AD',
                        white:      '#FFFFFF',
                    },
                },
            },
        },
        defaults: {
            VBtn:      { elevation: 0 },
            VCard:     { elevation: 0 },
            VTextField: { variant: 'outlined', rounded: 'md', density: 'compact', flat: true, hideDetails: true },
            VSelect:   { variant: 'outlined', rounded: 'md', density: 'compact', hideDetails: true },
            VSwitch:   { color: 'primary', density: 'compact', inset: true, hideDetails: true },
            VCheckbox: { color: 'primary', density: 'compact', hideDetails: true },
        },
    })

    app.vueApp.use(vuetify)
})
