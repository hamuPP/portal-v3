/*********************************************************************
* 头部                                                           *
* Modified by ty on 2018/4/23.                                        *
*********************************************************************/
<style scoped lang="less">
    @import '../../assets/css/header.less';
</style>
<template>
    <div class="header">
        <div class="left-icon">

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
        }),
        components: {

        },
        methods: {
        },
        mounted() {
        },
        created() {
        }
    }
</script>