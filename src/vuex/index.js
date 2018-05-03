/**
 * Created by ty on 18/4/9.
 */
import Vue from 'vue'
/* vuex 数据状态管理器 */
import Vuex from 'vuex'
/* 首页 Vuex对象 */
import homePage from './homepage/homepage'
import homePageRightAllJs from './homepage/rightAll'
import loginJs from './login/login'
import todolistJs from './todolist/todolist'
import calenderJs from './calendarSchedule/calendar' // 以前的calendar/calendar.js
import calenderScheduleJs from './calendarSchedule/calenderSchedule'
import editMaskJs from './tpl/editMask'
import mockLoginJs from './login/mockLogin'

/* Vue加载状态管理器实例 */
Vue.use(Vuex);
/* 实例化Vuex状态管理器对象 */
export default new Vuex.Store({
    modules: {
        homePage,
        homePageRightAllJs,
        loginJs,
        todolistJs,
        calenderJs,
        calenderScheduleJs,
        editMaskJs,
        mockLoginJs
    },
    strict: false
});