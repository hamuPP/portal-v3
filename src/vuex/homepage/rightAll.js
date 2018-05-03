/*********************************************************************
 * 右边的所有数据方法                                                *
 * Created by tr on 2017/7/9.                                        *
 * Modified by ty on 2018/05/03.                                        *
 *********************************************************************/
import * as common from '../CommonConst'
import axios from 'axios'

const state = {
    /* 点击编辑组件显示覆盖层 值定义 */
    showEditMask: false
};
const getters = {
    showEditMask: state => state.showEditMask
};
const actions = {
    /**
     * 显示编辑组件
     * @param commit
     */
    showEditMaskFun({commit}) {
        commit(common.SHOW_EDIT_MASK);
    },
};
const mutations = {
    [common.SHOW_EDIT_MASK] (state) {
        state.showEditMask = true;
    },
    [common.HIDE_EDIT_MASK] (state) {
        state.showEditMask = false;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};