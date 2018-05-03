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
                mapListData: []
            }
        },
        components: {
            draggable
        },
        computed: mapGetters({
            /* 用户数据数据 */
            userData: 'userData'
        }),
        watch: {
        },
        methods: {
            getFunctionMapData () {
                let that = this;
//                let reqData = {
//                    url: 'FUNC',
//                    data: {
//                        userId: me.userData.account
//                    }
//                };
//                that.$store.dispatch('getFuncData', {reqData});

//                let newData = {
//                    func: this.functionMapData,
//                    data: data
//                };
//                that.$store.dispatch('manageDataFunc', {newData});
            }
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