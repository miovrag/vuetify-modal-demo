export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: false },

    modules: ['@nuxtjs/tailwindcss'],

    css: [
        'vuetify/styles',
        'assets/main.css',
    ],

    build: {
        transpile: ['vuetify'],
    },

    vite: {
        define: {
            'process.env.DEBUG': false,
        },
        ssr: {
            noExternal: ['vuetify'],
        },
    },

    app: {
        head: {
            link: [
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap',
                },
            ],
        },
    },
})
