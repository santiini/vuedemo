/**
 * z-tree插件;
 */
import ZtreeVue from 'components/ZtreeVue';

export default {
	install(Vue, options) {
		// 第三方插件的修改;
		Vue.component('ZtreeVue', ZtreeVue);
	}
}
