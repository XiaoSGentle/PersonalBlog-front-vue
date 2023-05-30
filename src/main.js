import './assets/style/reset.css'
import 'uno.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// element-ui
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// markDown
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// 行号和快捷复制
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
// Prism
import Prism from 'prismjs';
VMdEditor.use(vuepressTheme, {
    Prism,
    codeHighlightExtensionMap: {
        vue: 'xml',
    },
});
VMdEditor.use(createLineNumbertPlugin())
VMdEditor.use(createCopyCodePlugin())




const app = createApp(App)


// 循环注册icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(VMdEditor)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
