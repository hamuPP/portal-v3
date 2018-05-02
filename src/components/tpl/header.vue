/*********************************************************************
* 头部                                                           *
* Modified by ty on 2018/4/23.                                        *
*********************************************************************/
<style scoped lang="less">
    @import '../../assets/css/header.less';
</style>
<template>
    <div class="header">
        <div class="left-icon" @click="toHomePage">
            <img class="header-logo" src="../../assets/images/daduheLogo.png" alt="logo">
        </div>
        <div class="right-toolbar">
            <span class="right-toolbar-item">功能面板</span>
            <span class="right-toolbar-item">小公举</span>
            <span class="right-toolbar-item">退出</span>
            <span class="right-toolbar-item">我</span>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default{
        // name: 'HomePage.vue',
        computed: mapGetters({
            // /* 是否弹出编辑组件弹框 */
            // showEditComponent: 'showEditComponent'
            /* 用户数据数据 */
            userData: 'userData',
        }),
        components: {

        },
        methods: {
            // 返回首页
            toHomePage() {
                let that = this;
                that.$router.push({path: '/index'});
            }
        },
        mounted() {
        },
        created() {
            console.log('header.vue mm created-', this.userData);
            let userDataRaw = this.userData;
//            // 主要是为了刷新首页后，没有userData,所以重新请求
//            if (!userDataRaw || !userDataRaw.data || !userDataRaw.data.account) {
//                let userAccount = sessionStorage.getItem('account');
//                // 请求用户数据，
//                let reqData = {
//                    account: userAccount
//                };
//                this.$store.dispatch('getUserData', {reqData});
//            }
        }
    }
</script>