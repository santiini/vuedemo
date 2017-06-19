/**
 * app中共享一个toast;
 */
const toast = {
    // state;
    state: {
        title: '',
        isShown: false,
        type: 'text',
        time: 2000
    },

    // mutations;
    mutations: {
        SET_TOAST(state, { title, isShown, type, time }) {
            state.title = title || '';
            state.isShown = isShown || true;
            state.type = type || 'success';
            state.time = time || 2000;
        }
    },

    // actions:
    actions: {
        setToast({ commit }, toast) {
            commit('SET_TOAST', toast);
            // commit({
            //     type: 'SET_TOAST',
            //     toast
            // })
        },
        showSuccess({ commit }, title) {
            commit('SET_TOAST', { title });
        },
        showError({ commit }, errorMsg) {
            commit('SET_TOAST', {
                title: errorMsg,
                type: 'warn'
            })
        },
        showMsg({ commit }, msg) {
            commit('SET_TOAST', {
                title: msg,
                type: 'text'
            })
        }
    }
};

export default toast;