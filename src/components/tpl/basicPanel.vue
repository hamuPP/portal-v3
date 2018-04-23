/*********************************************************************
* 基础面板样式                                                           *
* Created by ty on 2018/4/20.                                        *
*********************************************************************/
<style scoped lang="less">
    @import "../../assets/css/tpl/basic-panel.less";
</style>
<template>
    <div class="panel-wrapper" :class="computedPanelCls">
        <!-- 面板头部 start -->
        <div class="panel-header">
            <div class="panel-left-icon">
                <slot name='panelLeftIconImg'></slot>
            </div>
            <div class="panel-title">
                <slot name="panelTitleText"></slot>
            </div>
        </div>
        <!-- 面板头部 end -->

        <!-- 面板正文 start -->
        <div class="panel-body">
            <slot name="panelBody"></slot>
        </div>
        <!-- 面板正文 end -->

        <!-- 面板底部 start -->
        <div class="panel-footer">
            <slot name="footer"></slot>
        </div>
        <!-- 面板底部 end -->
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