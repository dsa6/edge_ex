import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import {init} from './popup'
//执行pupupjs
init()
import axios from "axios";
import vueAxios from 'vue-axios'
import 'ant-design-vue/dist/antd.css';
const app = createApp(App);
app.use(Antd).use(vueAxios,axios).mount('#app');