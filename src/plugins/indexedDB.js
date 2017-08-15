/**
 * indexedDB的封装;
 */
import indexedDB from '../utils/indexedDB2'

export default {
  install(Vue) {
    Vue.prototype.$idb = indexedDB
  }
}
