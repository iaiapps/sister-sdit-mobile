import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default [
  {
    ignores: ['dist/', 'cordova/', 'node_modules/']
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    rules: {
      // Tambahkan custom rules di sini jika diperlukan
    }
  }
]
