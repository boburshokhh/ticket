import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import { BootstrapVueNext } from 'bootstrap-vue-next';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import moment from 'moment'
import qs from 'qs';
import './assets/taiwind.css'
const app = createApp(App)
app.config.globalProperties.$moment = moment
app.config.globalProperties.$axios = axios;

app.use(VueAxios, axios)
// app.use(BootstrapVueNext);
app.mount('#app')
