

import Vue from 'vue'
import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from '../router'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const axiosConfig = {
  baseURL: process.env.VUE_APP_BASE_URL || process.env.apiUrl || ''
  // baseURL: process.env.VUE_APP_BASE_URL_CORS || process.env.apiUrl || ''
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

let loading
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: 'loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading() {
  loading.close()
}

const $axios = axios.create(axiosConfig)

$axios.interceptors.request.use(
  (config) => {
    startLoading()
    if (localStorage.broToken) {
      config.headers.Authorization = localStorage.broToken
    }
    return config
  },
  error => Promise.reject(error)
)

// Add a response interceptor
$axios.interceptors.response.use(
  (response) => {
    setTimeout(() => {
      endLoading()
    }, 200)
    return response
  },
  (error) => {
    endLoading()
    const { status } = error.response
    if (status === 401) {
      Message.error('token已失效, 请重新登录')
      localStorage.removeItem('broToken')
      router.push('/login')
    } else {
      Message.error(error.response.data)
    }
    // Promise.reject(error)
  }
)

Plugin.install = function plugin(Vue) {
  Vue.axios = $axios
  window.axios = $axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return $axios
      }
    },
    $axios: {
      get() {
        return $axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
