const VendorManualChunks = {
  ui: [
    'naive-ui',
    '@vicons/antd',
    '@vicons/carbon',
    '@vicons/fluent',
    '@vicons/ionicons4',
    '@vicons/ionicons5',
    '@vicons/tabler'
  ],
  vue: ['vue', 'vue-router', 'pinia', 'pinia-plugin-persistedstate', '@vueuse/core'],
  shiki: ['shiki', '@shikijs/monaco']
}


export default (id: string): string | undefined => {

  if (id.includes('node_modules')) {
    for (const key in VendorManualChunks) {
      let is = VendorManualChunks[key].some(v => id.includes(v))
      if (is) {
        if (key === 'shiki') {
          console.log("🚀 ~ key:", key)
          console.log("🚀 ~ id:", id)
          console.log('\n');

        }
        return key
      }
    }
  }

  if (id.includes('/view/Test')) {
    return 'Test'
  }

  return
}
