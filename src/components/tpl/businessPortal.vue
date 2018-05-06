* 基础面板样式                                                           *
* Created by ty on 2018/4/20.                                        *
*********************************************************************/
<style scoped lang="less">
    @import "../../assets/css/tpl/businessPortal.less";
</style>
<template>
    <div class="business-portal-wrapper">
        <div class="business-portal-cotent">
            <div class="common-list">
                <draggable >
                    <!--<span v-for="item in mapListData" >-->
                    <div class='common-list-group' v-for="fun in activedDataList" >
                        <!--<div class="common-list-group-img">-->
                        <div class="common-list-group-img" v-html="fun.icon">
                            <!--<img src="../../assets/images/skin-blue/blockdevice.png" alt="">-->
                        </div>
                        <div class="common-list-group-text">
                            {{fun.resName}}
                            <img src="../../assets/images/skin-blue/blockdevice.png" alt="">
                        </div>
                    </div>
                </draggable>
            </div>
        </div>
        <div class="business-portal-btns"></div>
    </div>
</template>
<script>
    import iconsJson from '../../mockData/iconsJson.json';
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
                list: [],
                activedDataList: [] // 业务导航的数据,
            }
        },
        components: {
            draggable
        },
        computed: mapGetters({
            /* 用户数据数据 */
            userData: 'userData',
//            mapListData: 'mapListData',
            functionMapData: 'functionMapData',
        }),
        watch: {
            functionMapData(val) {
                let that = this;
                debugger;
                console.log('functionMapData', val);
                let rawData = val.data;
                let activedDataArr = [];
                if (rawData && rawData.meta && rawData.meta.code === 1) {
                    let listAllArr = that.getGeneratedListData(rawData.data);

                    // 提出其中激活的数据，放入业务导航中
                    // resourceType - 0:应用,1:功能,2:功能包
                    listAllArr.forEach(it => {
                        let children = it.children || [];
                        children.forEach(child => {
                            if (child.activeStatus === 0 && !child.parentId) {
                                let newList = {
                                    customizationId: child.customizationId,
                                    userId: child.userId,
                                    index: child.index,
                                    activeStatus: child.activeStatus,
                                    resourceType: child.resourceType,
                                    packageName: child.packageName,
                                    children: []
                                };

                                if (child.resourceType === 2) {
                                    newList.children.push(child);
                                    children.forEach(cld => {
                                        if (cld.parentId === child.customizationId) {
                                            newList.children.push(cld);
                                        }
                                    });
                                } else {
                                    newList = child;
                                }
                                activedDataArr.push(newList);
                            }
                        });
                    });
                }
                that.activedDataList = activedDataArr
            },
            mapListData(val) {
                for (let unfix = val.length - 1; unfix > 0; unfix--) {
                    /* 给进度做个记录，比到未确定位置 */
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

            getFunctionMapData() {
                let that = this;
                let reqData = {
                    userId: that.account
                };
                that.$store.dispatch('getFuncData', {reqData});
            },

            getGeneratedListData(data) {
                let that = this;
                // 随机的字体图标
                let iconsDataArr = iconsJson.data;
                let sum = 0;
                data.forEach(item => {
                    sum++;
                    let children = item.children ? item.children : [];
                    if (children.length) {
                        children.forEach(jtem => {
                            jtem.styleId = 1;
                            /* 17 为随机图标的长度 */
                            jtem.icon = iconsDataArr[sum > 16 ? sum = 0 : sum];
                            jtem.activeStatus = jtem.activeStatus === 0 ? jtem.activeStatus : 1;
                            jtem.resourceType = jtem.resourceType ? jtem.resourceType : 1;
                            sum++;
                        });
                    }
                });

                console.log('cc', data);

                return data;
            }
        },
        created() {
            let that = this;
//            that.mapListData = json.data;
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