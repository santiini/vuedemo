import Vue from 'Vue'
import qs from 'qs'
import * as types from './mutations-type'
import { getUserInfo, getUserId } from 'api/draft';

const updateQyhRelId = ({ commit }, qyhRelId) => {
    commit(types.UPDATE_QYACCRELID, {
            qyhRelId
        })
        // commit({
        //     type: types.UPDATE_QYACCRELID,
        //     qyhRelId
        // })
}

// 获取用户信息对象;
const Login = ({ commit }) => {
    return new Promise((resolve, reject) => {
        // 获取用户信息;
        getUserInfo()
            .then(result => {
                commit({
                    type: types.UPDATE_USERINFO,
                    userInfo: result.data
                })
                resolve();
            })
            .catch(err => {
                reject(err)
            })
    })
};

//  获取用户userId;
const UpdateUserId = ({ commit }) => {
    return new Promise((resolve, reject) => {
        getUserId()
            .then(result => {
                commit('SET_USERID', {
                    // type: 'SET_USERID',
                    userId: result.data.wxUser.UserId,
                    phoneUserId: result.data.sysUser.PhoneUserId
                })
                resolve(result)
            })
            .catch(err => {
                reject(err)
                    // commit('SET_USERID', {
                    //     userId: 'xiaotao',
                    //     phoneUserId: 59
                    // })
                    // resolve()
            })
    })
};

// x-header的title
const ChangeTitle = ({ commit }, title) => {
    commit('CHANGE_TITLE', title)
};

export {
    updateQyhRelId,
    Login,
    UpdateUserId
}