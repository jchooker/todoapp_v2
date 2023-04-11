import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faWindowClose, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import {createPinia} from 'pinia'

const app = createApp(App);

library.add(faWindowClose);
library.add(faTimesCircle);

app
.component('font-awesome-icon', FontAwesomeIcon)
.use(createPinia())
.mount('#app')
