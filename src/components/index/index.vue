/*********************************************************************
* 首页显示                                                           *
* Created by tr on 2018/4/20.                                        *
* Modified by ty on 2018/4/20.                                        *
*********************************************************************/
<style scoped lang="less">
    @import '../../assets/css/index.less';
</style>
<template>
    <div class="homepage">
        <!-- 头部 start -->
        <div class="header-wrapper">
            <Header></Header>
        </div>
        <!-- 头部 end -->

        <!-- 左侧一列 start -->
        <div class="left-side">
            <div class="inner-left-wrapper">
                <basicPanel radius>
                    <img src="../../assets/images/skin-blue/floder.png" alt="" slot="panelLeftIconImg">
                    <p slot="panelTitleText">业务导航{{showFunctionMapButtons}}</p>
                    <template slot='panelBody'>
                        <div class="business-and-apps-wrapper">
                            <div class="business" :style="computedBusinessStyle">
                                <BusinessPortal></BusinessPortal>
                            </div>
                            <div class="mocklogin" ref="mockLogin" v-show="!showFunctionMapButtons"></div>
                        </div>
                        <div class="bottom-buttons-wrapper">
                            <template v-if="showFunctionMapAndComponentsButtons">
                                <button type="button" class="btn" @click="showFunctionMap">功能地图</button>
                                <button type="button" class="btn">组件定制</button>
                            </template>
                            <template v-if="showFunctionMapButtons">
                                <button type="button" class="btn function-map-btn-success" @click="functionMapCustormed">定制完成</button>
                                <button type="button" class="btn function-map-btn-cancle" @click="functionMapCancle">取消定制</button>
                            </template>
                        </div>
                    </template>
                </basicPanel>
            </div>
        </div>
        <!-- 左侧一列 end -->

        <!-- 右侧一列 start -->
        <div class="right-side">
            <router-view name="main"></router-view>
        </div>
        <!-- 右侧一列 end -->

    </div>
</template>
<script>
    //    import RightModel from '../basic/RightModel.vue'
    // import FunctionMap from '../basic/FunctionalMap.vue'
    // import Agency from '../agency/Agency.vue'
    // //    import AgencyFull from '../agency/AgencyFull.vue'
    //
    // import PromptTpl from '../common/PromptTpl.vue'
    // import editComponent from '../assembly/EditComponent.vue'
    // import pwdTpl from '../basic/PasswordTpl.vue'
    // import commonMethods from '../../vuex/modules/commonMethods'
    import Header from '../tpl/header.vue'
    import BusinessPortal from '../tpl/businessPortal.vue'
    import basicPanel from '../tpl/basicPanel.vue'

    import {mapGetters} from 'vuex'

    export default {
        computed: mapGetters({
            /* 是否弹出编辑组件弹框 */
            showEditComponent: 'showEditComponent'
        }),
        components: {
            Header,
            basicPanel,
            BusinessPortal
//             Loading,
//             Business,
//             FunctionMap,
// //            RightModel,
// //            AgencyFull,
//             PromptTpl,
//             editComponent,
//             pwdTpl
        },
        data() {
            return {
                computedBusinessStyle: '',
                showFunctionMapAndComponentsButtons: true,
                showFunctionMapButtons: false, // 是否显示功能地图的2个操作按钮：定制完成 取消定制
            }
        },
        watch: {
            '$route': function(val) {
                console.log('watch path', val);
            },
            showFunctionMapButtons(val) {
                console.log('watch showFunctionMapButtons', val);
                let that = this;
                if (val) {
                    that.computedBusinessStyle = 'height: 100%';
                }
            }
        },
        methods: {
            showFunctionMap() {
                let that = this;
                that.showFunctionMapButtons = true;
                that.showFunctionMapAndComponentsButtons = false;
                that.$router.push({path: 'index/functionMap'});
            },

            /**
             * 功能地图：定制完成
             */
            functionMapCustormed() {
                let that = this;

                that.showFunctionMapButtons = false;
                that.showFunctionMapAndComponentsButtons = true;
            },

            /**
             * 功能地图：取消定制
             */
            functionMapCancle() {
                let that = this;
                that.showFunctionMapButtons = false;
                that.showFunctionMapAndComponentsButtons = true;
            },
        },
        mounted() {
        },
        created() {
            let that = this;
            console.log('watch path', this.$route);
            // 是否是功能地图全屏页面, 要根据这个是否显示左侧一列的下方的几个按钮
            let isFunctionMapFullpage = this.$route.path === '/index/functionMap';
            if (isFunctionMapFullpage) {
                that.showFunctionMapButtons = true;
                that.showFunctionMapAndComponentsButtons = false;
            } else {
                that.showFunctionMapButtons = false;
                that.showFunctionMapAndComponentsButtons = true;
            }
        }
    }
</script>