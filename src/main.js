import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Unicon from 'vue-unicons'
import { uniLayerGroupMonochrome, uniCarWash, uniAngleLeft } from 'vue-unicons/dist/icons'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import moment from 'moment'
import qs from 'qs';
import './assets/taiwind.css'
import router from './router';


Unicon.add([uniLayerGroupMonochrome, uniCarWash, uniAngleLeft])

const app = createApp(App)
app.config.globalProperties.$moment = moment
app.config.globalProperties.$axios = axios;

app.use(Unicon, {
    fill: 'black',
    height: 24,
    width: 24
})
app.use(router)
app.use(VueAxios, axios)


app.mount('#app')
