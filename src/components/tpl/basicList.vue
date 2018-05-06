/*********************************************************************
* 基础列表样式                                                          *
* Created by ty on 2018/5/04.                                        *
*********************************************************************/
<style scoped lang="less">
    @import "../../assets/css/tpl/basic-list.less";
</style>
<template>
    <div class="common-list-group">

        <!-- 上方的图片 start -->
        <div class="common-list-group-img">
            <slot name="img"></slot>
        </div>
        <!-- 上方的图片 start -->

        <!-- 下方的文字 start -->
        <div class="common-list-group-text">
            <slot name="text"></slot>
        </div>
        <!-- 下方的文字 end -->

    </div>
</template>

<script>
    export default {
        props: {
            radius: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            computedPanelCls() {
                let that = this;
                let result = that.radius ? 'panel-radius' : '';
                return result;
            }
        },
        watch: {
        },
        created() {
            let that = this;
        }
    }
</script>