import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations';
import * as actions from './actions';

import header from './modules/xHeader';
import toast from './modules/toast';
import getters from './getters';

Vue.use(Vuex);

const state = {
    isLoading: false,
    direction: 'forward',
    // 微信企业号和应用的关系ID
    qyhRelId: null,
    // 接口地址;
    url: 'http://cnpcportal.sinoapps.cn',
    userInfo: {}, // 当前用户信息;
    userId: null, // 用户Id;,
    // userId: 'xiaotao', // 用户Id;,
    phoneUserId: undefined,
    // phoneUserId: 59,
};

export default new Vuex.Store({
    modules: {
        header,
        toast
    },
    state,
    mutations,
    actions,
    getters
    // mutaions: {
    //   // UPDATE_LOADING(state, isLoading) {
    //   //   state.isLoading = isLoading;
    //   // },
    //   // UPDATE_DIRECTION(state, direction) {
    //   //   state.direction = direction;
    //   // }
    //     // 小测试: 直接调用mutations;
    //     UPDATE_QYACCRELID(state, payload) {
    //       state.QYAccRelId = payload.qyhRelId;
    //     }
    // },
    // actions: {
    //   UPDATE_QYACCRELID({commit}, qyhRelId) {
    //       commit('UPDATE_QYACCRELID', qyhRelId)
    //   }
    // }
});