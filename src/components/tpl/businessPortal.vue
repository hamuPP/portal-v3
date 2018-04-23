* 基础面板样式                                                           *
* Created by ty on 2018/4/20.                                        *
*********************************************************************/
<style scoped lang="less">
    @import "../../assets/css/tpl/businessPortal.less";
</style>
<template>
    <div class="business-portal-wrapper">
        <div class="business-portal-cotent">
            <div class="map-list">
                <draggable >
                    <span v-for="item in mapListData" >
                       {{item.title}}
                    </span>
                </draggable>
            </div>
        </div>
        <div class="business-portal-btns"></div>
    </div>
</template>
<script>
    import json from '../../mockData/businessPortalMaplistData.json';
    import draggable from 'vuedraggable';
    export default {
        props: {
            radius: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                mapListData: []
            }
        },
        components: {
            draggable
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
            that.mapListData = json.data;
        }
    }
</script>