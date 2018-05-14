<style scoped lang="less">
    @import '../../assets/css/functionmap-rightall-container.less';
</style>
<template>
    <div class="functionmap-rightall-container">
        <div class="functionmap-header">
            <p class="title-text">更多业务和工具</p>
            <div class="search-box">
                <Input v-model="searchVal"
                       icon="ios-clock-outline"
                       placeholder="Enter something..."
                       style="width: 200px"
                       size="small"
                       @on-click="searchHandler"
                       @on-enter="searchHandler">
                </Input>
            </div>
            <div class="icon-and-list-display">
                <div class="item"
                     v-for="item in iconAndListDisplayData"
                     :class="{'active': item.active}"
                     :key="item.id"
                     @click="iconAndListDisplay(item.id)">
                    <p>{{item.text}}</p>
                </div>
            </div>
        </div>
        <div class="functionmap-body">
        <!-- 图标显示 start -->
        <template v-if="iconAndListDisplayData[0].active">
            <!--判断获取是否有数据-->
            <template v-for="(func, i) in functionMapDataList" v-if="func.children && func.children.length">
                <!--显示对应的应用名-->
                <p>{{func.appName}}</p>

                <!--显示对应应用下的各个子应用-->
                <div class="func-children-box">
                    <!--<draggable v-model="func.children"> todo 是否一定要v-model -->
                    <draggable v-model="func.children"
                            @end="onEnd"
                            @start="onStart"
                            @remove="onRemove"
                            @update="onUpdate"
                            :move="checkMove">
                        <basicList v-for="child in func.children" :key="child.id"
                                   class="functionmap-rightall-func-items"
                                    :class="{'active': child.activeStatus === 0}">
                            <img slot="img"
                                 :data-src="child.icon"
                                 :src="child.icon"
                                 class="func-imgs"
                                 alt="">
                            <template slot="text">
                                {{child.resName || child.packageName}}
                            </template>
                        </basicList>
                    </draggable>
                </div>
            </template>
        </template>
        <!-- 图标显示 start -->

        <!-- 列表显示 start -->
        <template v-if="iconAndListDisplayData[1].active">
            列表ddd
        </template>
        <!-- 列表显示 start -->

    </div>
    </div>
</template>

<script>
    import iconsJson from '../../mockData/iconsJson.json';
    import draggable from 'vuedraggable';
    import basicList from '../tpl/basicList.vue';
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                searchVal: 'hellllll',
                functionMapDataList: [], // 全部的功能地图里的应用数据
                iconAndListDisplayData: [
                    {
                        text: '图标显示',
                        active: true,
                        id: 'icon'
                    },
                    {
                        text: '列表显示',
                        active: false,
                        id: 'list'

                    }
                ]
            }
        },
        components: {
            draggable,
            basicList
        },

        computed: mapGetters({
            /* 用户数据数据 */
            userData: 'userData',
//            mapListData: 'mapListData',
            functionMapData: 'functionMapData',
        }),

        watch: {
            /**
             * 全部的功能地图的数据
             */
            functionMapData(val) {
                console.log('functionMapData watch in functionmaprightall.vue', val);
                let that = this;
                let rawData = val.data;
                if (rawData && rawData.meta && rawData.meta.code === 1) {
                    that.functionMapDataList = that.getGeneratedListData(rawData.data);
                    console.log('that.functionMapDataList', that.functionMapDataList);
                }
            }
        },

        methods: {
            searchHandler(val) {
                let that = this;
                console.log('searchHandler', val);
                console.log('searchHandler searchVal', that.searchVal);
            },

            /**
             * 点击'图标显示''列表显示'
             * @param val
             */
            iconAndListDisplay(val) {
                let that = this;
                console.log('iconAndListDisplay', val);
                console.log('iconAndListDisplay', val.target);
                if (!val) { return; }
                for (let i = 0, len = that.iconAndListDisplayData.length; i < len; i++) {
                    if (that.iconAndListDisplayData[i].id === val) {
                        that.iconAndListDisplayData[i].active = true;
                    } else {
                        that.iconAndListDisplayData[i].active = false;
                    }
                }
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
                            let srcText = iconsDataArr[sum > 15 ? sum = 0 : sum];
                            jtem.styleId = 1;

                            /* 17 为随机图标的长度 */
//                            jtem.icon = require(srcText);
                            jtem.icon = require('../../assets/images/skin-blue/' + srcText);
                            jtem.activeStatus = jtem.activeStatus === 0 ? jtem.activeStatus : 1;
                            jtem.resourceType = jtem.resourceType ? jtem.resourceType : 1;
                            sum++;
                        });
                    }
                });
                return data;
            },

            onEnd(val) {
                console.log('onEnd', val);
            },
            onStart(val) {
                console.log('onStart', val);
            },
            onUpdate(val) {
                console.log('onUpdate', val);
            },
            onRemove(val) {
                console.log('onRemove', val);
            },
            checkMove(evt) {
//                return (evt.draggedContext.element.name !=='apple');
                console.log('checkMove', evt);
                console.log('checkMove', evt.draggedContext);
                console.log('checkMove', evt.relatedContext);
                return false;
//                return true;
            }
        },

        created() {
            let that = this;
            console.log('functionmaprightall.vue created userData', that.userData);
            console.log('functionmaprightall.vue created functionMapData', that.functionMapData);

            let rawData = that.functionMapData.data;
            if (rawData && rawData.meta && rawData.meta.code === 1) {
                that.functionMapDataList = that.getGeneratedListData(rawData.data);
                console.log('that.functionMapDataList', that.functionMapDataList);
            }
        }
    }
</script>