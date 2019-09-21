import Vue from 'vue'
import checkFun from '../utils/checkFun'

const utils = {
  ...checkFun
}

function plugin(Vue) {
  const keys = Object.keys(utils)
  Object.defineProperty(Vue.prototype, '$utils', {
    writable: false,
    configurable: false,
    value: {}
  })

  const utilsObj = Vue.prototype.$utils
  keys.forEach((key) => {
    Object.defineProperty(utilsObj, key, {
      get() {
        return utils[key]
      }
    })
  })
}

Vue.use(plugin)
