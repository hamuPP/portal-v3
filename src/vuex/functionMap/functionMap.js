/**
 * Created by ty on 18/5/4.
 */
import * as common from '../CommonConst'
import axios from 'axios'

const state = {
    functionMapData: {}
};
const getters = {
    functionMapData: state => state.functionMapData,
};

const actions = {
    getFuncData({commit}, {reqData}) {
        let url = common.getUrl(
            {
                url: common.FUNC,
                queryParams: {
                    userId: reqData.userId
                }
            }
        );
        axios({
            method: 'get',
            url: url,
            // // data: reqData.parameter,
            // params: reqData.parameter
        }).then(res => {
            commit(common.FUNCTION_MAP_DATA, {data: res});
        }).catch(e => {
            commit(common.FUNCTION_MAP_DATA, {data: e});
        });
    }
};

const mutations = {
    [common.FUNCTION_MAP_DATA](state, { data }) {
        state.functionMapData = data;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};