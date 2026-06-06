import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f87171', // Warna kue/strawberry
        secondary: '#fef3c7', // Warna cream
        accent: '#d97706', // Warna gold/baked
      },
    },
  },
  plugins: [],
}
export default config