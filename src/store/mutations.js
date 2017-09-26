import * as types from './mutations-type';

export default {
    [types.UPDATE_QYACCRELID](state, payload) {
        // [types.UPDATE_QYACCRELID](state, { qyhRelId }) {
        console.log(payload)
        state.qyhRelId = payload.qyhRelId;
    },
    [types.UPDATE_USERINFO](state, payload) {
        state.userInfo = payload.userInfo;
    },
    SET_USERID(state, { userId, phoneUserId }) {
        state.userId = userId;
        state.phoneUserId = phoneUserId
    },
    CHANGE_TITLE(state, { title }) {
        state.title = title
    },
}
