/**
 * Created by ty on 18/4/9.
 */

import * as common from '../CommonConst'
import axios from 'axios'
import Md5 from '../md5'

const state = {
    /* 登录后的信息 */
    loginData: {},
    userData: {},
    /* 退出后的信息 */
    // logoutData: {id: 1, data: ''},
};
const getters = {
    loginData: state => state.loginData,
    userData: state => state.userData,
    // logoutData: state => state.logoutData,
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
        let _md5 = new Md5();
        let md5PWD = _md5.hexMd5(reqData.password); // 加密
        let passwordMd5Upper = md5PWD.toUpperCase();// 12345的是E10ADC3949BA59ABBE56E057F20F883E
        axios({
            method: 'post',
            url: common.getUrl({url: common.LOGIN}),
            // ContentType: 'application/x-www-form-urlencoded',
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
            data: {
                username: reqData.username,
                password: passwordMd5Upper
            },
            transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
        }).then(res => {
            commit(common.LOGIN_DATA, {data: res});
        }).catch(e => {
            commit(common.LOGIN_DATA, {data: e});
        });
    },

    /**
     * 获取用户信息
     * @param commit
     * @param reqData
     */
    getUserData({commit}, {reqData}) {
        let url = common.getUrl(
            {
                url: common.GET_USER_DATA,
                queryParams: {
                    account: reqData.account
                }
            }
        );
        let url3 = 'api/portal/treeMe'; // todo 假地址
        console.log('getUserData in login.js', url);
        axios({
            method: 'get',
            url: url,
        }).then(res => {
            commit(common.USER_DATA, {data: res});
        }).catch(e => {
            commit(common.USER_DATA, {data: e});
        });
    }
};
const mutations = {
    [common.LOGIN_DATA](state, {data}) {
        state.loginData = data;
    },
    [common.USER_DATA](state, {data}) {
        state.userData = data;
    },
    [common.LOGOUT_DATA](state, { newData }) {
        // state.logoutData.id++;
        // state.logoutData.data = newData;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};