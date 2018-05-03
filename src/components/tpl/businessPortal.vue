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
                    <!--<span v-for="item in mapListData" >-->
                    <span v-for="item in list" >
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
    import {mapGetters} from 'vuex'

    export default {
        props: {
            radius: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                list: []
            }
        },
        components: {
            draggable
        },
        computed: mapGetters({
            /* 用户数据数据 */
            userData: 'userData',
            mapListData: 'mapListData',
        }),
        watch: {
            mapListData(val){
                for (let unfix = val.length - 1; unfix > 0; unfix--) {
                    /*给进度做个记录，比到未确定位置*/
                    for (let i = 0; i < unfix; i++) {
                        if (val[i].index > val[i + 1].index) {
                            let temp = val[i];
                            val.splice(i, 1, val[i + 1]);
                            val.splice(i + 1, 1, temp);
                        }
                    }
                }
                this.list = val;
            },
        },
        methods: {
//             getFunctionMapData () {
//                 let that = this;
// //                let reqData = {
// //                    url: 'FUNC',
// //                    data: {
// //                        userId: me.userData.account
// //                    }
// //                };
// //                that.$store.dispatch('getFuncData', {reqData});
//
// //                let newData = {
// //                    func: this.functionMapData,
// //                    data: data
// //                };
// //                that.$store.dispatch('manageDataFunc', {newData});
//             }

            /**
             * 获取到业务入口文件
             * @param data
             */
            getList(data) {
                let newData = {
                    func: this.functionMapData,
                    data: data
                };
                this.$store.dispatch('manageDataFunc', {newData});
            },
        },
        created() {
            let that = this;
            that.mapListData = json.data;
            let userDataFromBackEnd = this.userData.data;
            if (userDataFromBackEnd && userDataFromBackEnd.data && userDataFromBackEnd.data.account) {
                this.account = userDataFromBackEnd.data.account;
            } else { // 页面刷新了。重新获取一次userData todo
                this.account = sessionStorage.getItem('account');
            }

            // 获取业务导航中的数据
            this.getFunctionMapData();
        }
    }
</script>