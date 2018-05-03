import * as common from '../CommonConst'
import axios from 'axios'

const state = {
    /* 删除组件的数据 */
    getIdComponentData: 0,
    /* 更新组件的数据 */
    getIdEditData: 0,
    /* 查询单个组件的数据 */
    getIdListData: ''
};
const getters = {
    getIdComponentData: state => state.getIdComponentData,
    getIdEditData: state => state.getIdEditData,
    getIdListData: state => state.getIdListData
};
const actions = {
    /**
     * 获取组件里面的数据
     * @param commit
     * @param reqData
     */
    getIdComponentFun({commit}, {reqData}) {
        // 区分put delete 和其他(get?)

        let url = common.getUrl(
            {
                url: common.IDCOMPONENT,
                queryParams: {
                    userId: reqData.userId,
                    id: reqData.id,
                }
            }
        );
        axios({
            method: reqData.type,
            url: url,
            data: reqData.data,
        }).then(res => {
            // todo 区分
            if (reqData.type === 'put') {
                commit(common.GET_ID_EDIT_DATA, {data: res});
            } else if (reqData.type === 'delete') {
                commit(common.GET_ID_COMPONENT, {data: res});
            } else { /* 获取组件里面的数据 */
                commit(common.SCHEDULE_DELETE_DATE, {data: res});
            }
        }).catch(e => {
            commit(common.GET_ID_LIST_DATA, {data: e});
        });
    }
};
const mutations = {
    [common.GET_ID_COMPONENT](state, {data}) {
        state.getIdComponentData = data;
    },
    [common.GET_ID_EDIT_DATA](state, {data}) {
        state.getIdEditData = data;
    },
    [common.GET_ID_LIST_DATA](state, {data}) {
        state.getIdListData = data;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};