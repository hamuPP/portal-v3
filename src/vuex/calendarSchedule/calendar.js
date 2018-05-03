/*********************************************************************
 * 日历时间控件                                                      *
 * Created by tr on 2017/6/22.                                       *
 * Modified by ty on 2018/5/3.                                       *
 *********************************************************************/
import * as common from '../CommonConst'
import axios from 'axios'

const state = {
    /* 距离顶部的位置 */
    calendarPosTop: 0,
};
const getters = {
    calendarPosTop: state => state.calendarPosTop,

};
const actions = {
    /**
     * 日历相互切换的事件
     * @param commit
     * @param dispatch
     * @param calendarStartTime
     * @param calendarParentId
     * @param calendarPosTop
     * @param calendarPosLeft
     * @param calendarCallback
     */
    calendarToggleEvt({commit, dispatch}, {calendarStartTime, calendarParentId, calendarPosTop, calendarPosLeft, calendarCallback}) {
        calendarPosTop = parseInt(calendarPosTop) + 40;
        if (!calendarStartTime || calendarStartTime === '') {
            let dd = new Date();
            let m = dd.getMonth() + 1;
            m = m > 9 ? m : '0' + m;
            let cd = dd.getDate();
            cd = cd > 9 ? cd : '0' + cd;
            calendarStartTime = dd.getFullYear() + '-' + m + '-' + cd;
        }
        if (state.calendarShow) {
            commit(common.CALENDAR_SHOW);
            if (state.calendarParentId !== calendarParentId) {
                commit(common.CALENDAR_PROP, {calendarParentId, calendarPosTop, calendarPosLeft, calendarCallback});
                dispatch('initCalendar', {calendarStartTime});
            }
        } else {
            commit(common.CALENDAR_PROP, {calendarParentId, calendarPosTop, calendarPosLeft, calendarCallback});
            dispatch('initCalendar', {calendarStartTime});
        }
    },
};
const mutations = {
    // [common.FIND_BY_DATE](state, {data}) {
    //     state.taskList = data;
    // },

    [common.CALENDAR_PROP] (state, {calendarParentId, calendarPosTop, calendarPosLeft, calendarCallback}) {
        state.calendarParentId = calendarParentId;
        state.calendarPosTop = calendarPosTop;
        state.calendarPosLeft = calendarPosLeft;
        state.calendarCallback = calendarCallback;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};
