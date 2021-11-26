import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import http from './utils/axios'
import elementResizeDetectorMaker from 'element-resize-detector'
import cnzzAnalytics from 'vue-cnzz-analytics'

const app = createApp(App)


// import {
//   create,
//   NButton,
//   DataTableColumns, NDataTable, NText, NTime, NAlert, NSpace, NScrollbar, NSpin ,
//   NPageHeader
// } from 'naive-ui'

// const naive = create({
//   components: [NButton,
//     DataTableColumns, NDataTable, NText, NTime, NAlert, NSpace, NScrollbar, NSpin ,NPageHeader]
// })
// app.use(naive)
app.directive('resize', {
  mounted(el, binding, vnode) {
    el.$$erd = elementResizeDetectorMaker({
      strategy: 'scroll'
    })
    el.$$erd.listenTo({}, el, (element:HTMLElement) => {
      let width = element.offsetWidth
      let height = element.offsetHeight
      el.$$time && clearTimeout(el.$$time)
      el.$$time = setTimeout(() => {
        vnode.props?.onResize(width, height)
      }, 300)
    })
  },
  unmounted(el) {
    el.$$erd && el.$$erd.uninstall(el)
    el.$$time && clearTimeout(el.$$time)
  }
})
app.config.globalProperties.$http = http
app.use(router)
import contextmenu from "v-contextmenu";
import "v-contextmenu/dist/themes/default.css";
app.use(contextmenu);
app.use(cnzzAnalytics, {
  router: router,
  siteIdList: [
    1280510106,
  ],
});
app.mount('#app')
