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
            <span class="right-toolbar-item">
                <img src="../../assets/images/skin-blue/gongjuxiang.png" alt="gongjuxiang">工具集</span>
            <span class="right-toolbar-item">
                <img style="height: 20px;" src="../../assets/images/skin-blue/maillist.png" alt="tongxunlu">通讯录</span>
            <span class="right-toolbar-item">
                <img src="../../assets/images/skin-blue/tuichu.png" alt="tuichu">退出</span>
            <span class="right-toolbar-item">
                <img src="../../assets/images/skin-blue/chengyuan.png" alt="wo">我</span>
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