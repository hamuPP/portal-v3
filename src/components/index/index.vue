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
                    <p slot="panelTitleText">业务导航</p>
                    <template slot='panelBody'>
                        <BusinessPortal></BusinessPortal>
                        <div class="bottom-buttons-group">
                            <button type="button" class="btn">功能地图</button>
                            <button type="button" class="btn">组件定制</button>
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
        methods: {},
        mounted() {
        },
        created() {
        }
    }
</script>