/**
 * Created by ty on 18/5/3.
 */
import * as common from '../CommonConst'
import axios from 'axios'

const state = {
    taskList: {},
    addTaskDate: {},
    /* 修改日程表数据 */
    updateTaskDate: {},
    /* 删除日程表数据 */
    deleteTaskDate: '',
    /* 全部日程的数据 */
    allTaskDate: []
};
const getters = {
    taskList: state => state.taskList,
    addTaskDate: state => state.addTaskDate,
    updateTaskDate: state => state.updateTaskDate,
    deleteTaskDate: state => state.deleteTaskDate,
    allTaskDate: state => state.allTaskDate,
};
const actions = {
    getTaskList({commit}, {reqData}) {
        let url = common.getUrl(
            {
                url: common.FIND_BY,
                queryParams: {
                    date: reqData.date
                }
            }
        );
        console.log(reqData.parameter);
        axios({
            method: 'get',
            url: url,
            params: reqData.parameter
        }).then(res => {
            commit(common.FIND_BY_DATE, {data: res});
        }).catch(e => {
            commit(common.FIND_BY_DATE, {data: e});
        });
    },

    /**
     * 新增日程列表数据
     * @param commit
     * @param reqData
     */
    addTaskDate({commit}, { reqData }) {
        let url = common.getUrl({url: common.SCHEDULE_ADD});
        axios({
            method: 'post',
            url: url,
            data: reqData
        }).then(res => {
            commit(common.SCHEDULE_ADD_DATE, {data: res});
        }).catch(e => {
            commit(common.SCHEDULE_ADD_DATE, {data: e});
        });

        // expAxios.sendRequest({
        //     url: common.getUrl({ url: common.SCHEDULE_ADD }),
        //     method: 'post',
        //     data: reqData,
        //     contentType: 'application/x-www-form-urlencoded;charset=utf-8',
        //     success: data => {
        //         let newData = [];
        //         if (data && data.meta && parseInt(data.meta.code) === 1) {
        //             // newData = state.addTaskDate + parseInt(data.meta.code);
        //             newData = data.data;
        //             new commonMethods().showToastMsg({ text: data.meta.message, priority: 'success' });
        //         } else {
        //             new commonMethods().showToastMsg({ text: data.meta.message, priority: 'error' });
        //         }
        //         commit(common.SCHEDULE_ADD_DATE, { resData: newData });
        //     }
        // });
    },

    /**
     * 修改日程列表数据
     * @param commit
     * @param reqData
     */
    updateTaskDate({ commit }, { reqData }) {
        let url = common.getUrl({url: common.SCHEDULE_ADD});
        axios({
            method: 'put',
            url: url,
            data: reqData
        }).then(res => {
            commit(common.SCHEDULE_UPDATE_DATE, {data: res});
        }).catch(e => {
            commit(common.SCHEDULE_UPDATE_DATE, {data: e});
        });

        // expAxios.sendRequest({
        //     url: common.getUrl({ url: common.SCHEDULE_ADD }),
        //     method: 'put',
        //     contentType: 'application/x-www-form-urlencoded;charset=utf-8',
        //     data: reqData,
        //     success: data => {
        //         let newData = [];
        //         if (data && data.meta && parseInt(data.meta.code) === 1) {
        //             newData = data.data;
        //             new commonMethods().showToastMsg({ text: data.meta.message, priority: 'success' });
        //         } else {
        //             new commonMethods().showToastMsg({ text: data.meta.message, priority: 'error' });
        //         }
        //         commit(common.SCHEDULE_UPDATE_DATE, { resData: newData });
        //     }
        // });
    },

    /**
     * 删除日程列表数据
     * @param commit
     * @param reqData
     */
    deleteTaskData({ commit }, { reqData }) {
        let url = common.getUrl(
            {
                url: common.SCHEDULE_DELETE,
                queryParams: {
                    id: reqData.ids
                }
            }
        );
        axios({
            method: 'delete',
            url: url
        }).then(res => {
            commit(common.SCHEDULE_DELETE_DATE, {data: res});
        }).catch(e => {
            commit(common.SCHEDULE_DELETE_DATE, {data: e});
        });

        // expAxios.sendRequest({
        //     url: common.getUrl({ url: common.SCHEDULE_DELETE, params: String(reqData) }),
        //     method: 'delete',
        //     success: data => {
        //         let newData = "";
        //         if (data && data.meta && parseInt(data.meta.code) === 1) {
        //             newData = state.deleteTaskDate + parseInt(data.meta.code);
        //             new commonMethods().showToastMsg({ text: data.meta.message, priority: 'success' });
        //         } else {
        //             new commonMethods().showToastMsg({ text: data.meta.message, priority: 'error' });
        //         }
        //         commit(common.SCHEDULE_DELETE_DATE, { resData: newData });
        //     }
        // });
    },

    /**
     * 获取所有日程下得所有日期
     * @param commit9
     * @param reqData
     */
    getAllTaskData({ commit }) {
        let url = common.getUrl({url: common.SCHEDULE_ADD});
        axios({
            method: 'get',
            url: url,
        }).then(res => {
            commit(common.SCHEDULE_ALL_DATE, {data: res});
        }).catch(e => {
            commit(common.SCHEDULE_ALL_DATE, {data: e});
        });
        // expAxios.sendRequest({
        //     url: common.getUrl({ url: common.SCHEDULE_ADD }),
        //     success: data => {
        //         let newData = [];
        //         if (data && data.meta && parseInt(data.meta.code) === 1) {
        //             newData = data.data;
        //         }
        //         commit(common.SCHEDULE_ALL_DATE, { resData: newData });
        //     }
        // });
    },
};
const mutations = {
    [common.FIND_BY_DATE](state, {data}) {
        state.taskList = data;
    },
    [common.SCHEDULE_ADD_DATE](state, {data}) {
        state.addTaskDate = data;
    },
    [common.SCHEDULE_UPDATE_DATE](state, {data}) {
        state.updateTaskDate = data;
    },
    [common.SCHEDULE_DELETE_DATE](state, {data}) {
        state.deleteTaskDate = data;
    },
    [common.SCHEDULE_ALL_DATE](state, { resData }) {
        state.allTaskDate = resData;
    },
};
export default {
    state,
    getters,
    actions,
    mutations
};