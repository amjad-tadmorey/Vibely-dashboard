// tailwind.config.js
module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                background: "var(--color-background)",
                foreground: "var(--color-foreground)",
                card: "var(--color-card)",
                border: "var(--color-border)",
                primary: "var(--color-primary)",
                muted: "var(--color-muted)",
            },
            fontFamily: {
                sans: ["Inter", ...fontFamily.sans],
            },
        },
    },
    plugins: [],
};
