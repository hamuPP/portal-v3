/**
 * Created by ty on 18/5/2.
 */
import * as common from '../CommonConst'
import axios from 'axios'

const state = {
    backlogsData: {},
};
const getters = {
    backlogsData: state => state.backlogsData,
};
const actions = {
    getBacklogsData({commit}, {reqData}) {
        let url = common.getUrl(
            {
                url: common.GET_BACK_LOGS_DATA,
                queryParams: {
                    account: reqData.account
                }
            }
        );
        let url3 = 'api/portal/backlogsData'; // todo 假地址
        console.log('getBacklogsData in todolist.js', url);
        console.log(reqData.parameter);
        axios({
            method: 'get',
            url: url,
            // data: reqData.parameter,
            params: reqData.parameter
        }).then(res => {
            commit(common.BACKLOGS_DATA, {data: res});
        }).catch(e => {
            commit(common.BACKLOGS_DATA, {data: e});
        });
    },

    getBacklogsTagData({commit}, {reqData}) {
        let url = common.getUrl(
            {
                url: common.GET_BACK_LOGS_TAG_DATA,
                queryParams: {
                    account: reqData.account
                }
            }
        );
        let url3 = 'api/portal/backlogsData'; // todo 假地址
        console.log('getBacklogsData in todolist.js', url);
        console.log(reqData.parameter);
        axios({
            method: 'get',
            url: url,
            data: reqData.parameter,
            params: reqData.parameter
        }).then(res => {
            commit(common.BACKLOGS_DATA, {data: res});
        }).catch(e => {
            commit(common.BACKLOGS_DATA, {data: e});
        });
    }
};
const mutations = {
    [common.BACKLOGS_DATA](state, {data}) {
        state.backlogsData = data;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};