/**
 * Created by ty on 18/4/9.
 */
import Vue from 'vue'
/* vuex 数据状态管理器 */
import Vuex from 'vuex'
/* 首页 Vuex对象 */
import homePage from './homepage/homepage'
import loginJs from './login/login'

/* Vue加载状态管理器实例 */
Vue.use(Vuex);
/* 实例化Vuex状态管理器对象 */
export default new Vuex.Store({
    modules: {
        homePage,
        loginJs
    },
    strict: false
});