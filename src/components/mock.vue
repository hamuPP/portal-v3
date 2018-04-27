/*********************************************************************
* 首页显示                                                           *
* Created by tr on 2017/7/27.                                        *
*********************************************************************/
<style scoped lang="less">
    .www{
        width: 300px;
        height: 300px;
        border:1px solid red;
    }
    .www2{
        width: 700px;
    }
</style>
<template>
    <div>
        <h2>hello</h2>
        <button @click="loginSC">生产登录</button>
        <div class="www">
            <iframe  width="100%" height="100%" src="http://www.baidu.com" frameborder="0"></iframe>
        </div>
        <div class="www www2">
            <iframe data-id="sc" width="100%" height="100%" sandbox
                    src="http://10.176.155.47:7001/ui/?event=loadapp&value=startcntr&username=admin&password=E10ADC3949BA59ABBE56E057F20F883E&login=true"></iframe>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default{
        methods: {
            loginSC() {
                let that = this;

                let reqData = 'event=loadapp&value=startcntr&username=admin&password=E10ADC3949BA59ABBE56E057F20F883E&login=true';
                that.$store.dispatch('loginSC', {reqData});
            }
        }
    }
</script>