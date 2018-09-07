import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;
import * as ModalDialogs from 'vue-modal-dialogs'

Vue.use(ModalDialogs);

new Vue({
    render: h => h(App)
}).$mount('#app')
