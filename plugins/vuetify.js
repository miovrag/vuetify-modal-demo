import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { h } from 'vue'
import { Icon } from '@iconify/vue'

// Icon set — Tabler via Iconify API (api.iconify.design)
const iconifySet = {
    component: (props) =>
        h(Icon, {
            icon: props.icon,
            width:  props.size === 'default' || props.size === undefined ? 24 : props.size,
            height: props.size === 'default' || props.size === undefined ? 24 : props.size,
            style: props.color ? { color: props.color } : {},
        }),
}

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        components,
        directives,
        icons: {
            defaultSet: 'iconify',
            sets: { iconify: iconifySet },
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
                        danger:     '#EA5455',  // production key — NOT 'error'
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
            // $button-elevation: ('default': 2, 'hover': 4, 'active': 2) — matches SCSS production
            // variant="flat" buttons (PrimaryButton etc.) suppress elevation; non-flat buttons get 2
            VBtn: { elevation: 2 },

            // Cards: elevation handled by shadow-card Tailwind class (!important wins over elevation)
            // $card-elevation: 6 in SCSS — shadow-card overrides this, no JS default needed

            // Inputs — outlined, compact, flat, md radius, hide-details by default
            VTextField: { variant: 'outlined', rounded: 'md', density: 'compact', flat: true, hideDetails: true },
            VSelect:    { variant: 'outlined', rounded: 'md', density: 'compact', hideDetails: true },

            // Switch — inset, primary color, compact density
            // Dimensions from SCSS: track 30×18px, thumb 12×12px
            VSwitch:   { color: 'primary', density: 'compact', inset: true, hideDetails: true },

            // Checkbox — primary color, compact
            VCheckbox: { color: 'primary', density: 'compact', hideDetails: true },
        },
    })

    app.vueApp.use(vuetify)
})
