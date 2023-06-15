import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Pinia } from './store'
import WindowPropoerty from './layout/window/index.vue'

function setup() {
    createApp(WindowPropoerty).use(Pinia).mount('#windowProperty')
    const app = createApp(App)
    app.use(Pinia).use(router).mount('#app')
}

setup()