import { defineConfig, presetUno, presetTypography, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Inter',
        mono: ['Fira Code', 'monospace']
      }
    })
  ],
  shortcuts: {
    'demo-container': 'p-5 rounded-lg shadow-sm bg-white dark:bg-gray-800',
    'demo-title': 'text-xl font-bold mb-4 text-gray-800 dark:text-gray-200',
    'code-box': 'mt-5 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden'
  }
})