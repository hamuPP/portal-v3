/**
 * Created by ty on 18/4/9.
 */

import * as common from '../CommonConst'
import axios from 'axios'

const state = {
    /* 登录后的信息 */
    loginData: {},
    /* 退出后的信息 */
    logoutData: {id: 1, data: ''},
    loginAccount: ''
};
const getters = {
    loginData: state => state.loginData,
    logoutData: state => state.logoutData,
    loginAccount: state => state.loginAccount,
};
const actions = {
    /**
     * 获取搜索消息数据 -- demo example
     * @param commit
     */
    getBallLists({commit}, {reqData}) {
        // // console.log(common);
        // let url = common.getUrl({url: common.GET_BALL_LIST_DATA});
        // // console.log(url);
        // reqData.url = url;
        // // let reqData = {};
        // axios(reqData)
        //     .then(res => {
        //         console.log(res)
        //         debugger;
        //     })
        //     .catch(e => {
        //         console.log(e)
        //         debugger;
        //     })
        // console.log(json);
        // commit(common.ALL_BALL_LIST_DATA, { data: json.data });
    },

    login({commit}, {reqData}) {
        console.log(reqData);
        // console.log(url);
        // reqData.url = common.getUrl({url: common.LOGIN});
        // let reqData = {};
        let md5PWD = 'abcdefg';// TODO md5转码
        let passwordMd5Upper = md5PWD.toUpperCase();
        axios({
            method: 'post',
            url: common.getUrl({url: common.LOGIN}),
            data: {
                username: reqData.username,
                password: passwordMd5Upper
            }
        }).then(res => {
            console.log(res)
            debugger;
            commit(common.LOGIN_DATA, {data: res});
        }).catch(e => {
            console.log(e)
            debugger;
        });
    }
};
const mutations = {
    [common.LOGIN_DATA](state, {data}) {
        debugger;
        state.loginData = data;
    },
    [common.LOGOUT_DATA](state, { newData }) {
        state.logoutData.id++;
        state.logoutData.data = newData;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};