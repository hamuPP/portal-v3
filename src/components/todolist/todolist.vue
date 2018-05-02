<style scoped lang="less">
    @import '../../assets/css/todolist.less';
</style>

<template>
    <div class="todo-list-container">
        <Tabs  @on-click="clickTabHeader">
            <!--<TabPane label="标签一">-->
            <!--<Table-->
            <!--:height=tableBodyHeight-->
            <!--:columns="columns1" :data="data1"></Table>-->
            <!--</TabPane>-->
            <!--<TabPane label="标签二">标签二的内容</TabPane>-->
            <TabPane v-for="singleTab in tabData"
                     :key="singleTab.clientId"
                     :label="singleTab.clientName"
                     :name="singleTab.clientId">
                <Table
                        :height=tableBodyHeight
                        :columns="columns1"
                        :data="singleTab.tableData">
                </Table>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'todolist',
        data() {
            return {
                account: '', // 当前登录用户的账号
                currentClientId: '', // 当前操作的待办系统的clicentId,若无则代表所有
                tableBodyHeight: 278,
                tabData: [],
                label: (h) => {
                    return h('div', [
                        h('span', '标签一'),
                        h('Badge', {
                            props: {
                                count: 3
                            }
                        })
                    ])
                },

                columns1: [
                    {
                        title: '任务描述',
                        key: 'themeName'
                    },
                    {
                        title: '任务节点',
                        key: 'backlogName'
                    },
                    {
                        title: '发送时间',
                        key: 'createTime'
                    },
                    {
                        title: '事项来源',
                        key: 'form'
                    },
                    {
                        title: '流程启动时间',
                        key: 'duration'
                    }
                ],
                data1: [],
                requestCount: 0
            }
        },

        computed: mapGetters({
            /* 用户数据数据 */
            userData: 'userData',
            /* 待办数据 */
            backlogsData: 'backlogsData',
            backlogsTagData: 'backlogsTagData'
        }),

        watch: {
            userData(val) {
                console.warn('todolist.vue watch userData', val);
            },

            backlogsData(val) {
                let that = this;
                that.requestCount++;
                console.warn('todolist.vue watch backlogsData', val);
                let rawDataFromBackEnd = val.data;
                that.data1 = rawDataFromBackEnd.data;
            },

            backlogsTagData(val) {
                let that = this;
                that.requestCount++;

                console.warn('todolist.vue watch backlogstagData', val);
                // let rawDataFromBackEnd = val.data;
            },

            requestCount(val) {
                let that = this;
                if (val === 2) { // 初次请求数据成功
                    let backlogsTagData = that.backlogsTagData;
                    let backlogsData = that.backlogsData;

                    let headers = backlogsTagData.data.data;
                    let sumCount = 0;

                    let firstChild = {
                        clientId: '',
                        // clientName: '全部',
                        clientName: (h) => {
                            return h('div', [
                                h('span', '全部'),
                                h('span', '(' + sumCount + ')'),
                                ]
                            )
                        },
                        count: sumCount,
                        tableData: []
                    };
                    that.tabData.push(firstChild);

                    headers.forEach(it => {
                        sumCount += it.count;
                        let o = {
                            clientId: it.clientId,
                            clientName: (h) => {
                                return h('div', [
                                        h('span', it.clientName),
                                        h('span', '(' + it.count + ')'),
                                    ]
                                )
                            },
                            count: it.count,
                            tableData: []
                        };

                        that.tabData.push(o);
                    });
                    that.tabData[0].tableData = backlogsData.data.data;
                } else if (val > 2) { // 点击了tab头请求数据的情况
                    let newBacklogsData = that.backlogsData;

                    for (let i = 0, len = that.tabData.length; i < len; i++) {
                        let singleTabData = that.tabData[i];
                        if (singleTabData.clientId === that.currentClientId) {
                            that.$set(that.tabData[i], 'tableData', newBacklogsData.data.data);
                        }
                    }
                }
            }
        },

        methods: {
            getBacklogsData() {
                let that = this;
//                let account = that.userData.account;
//                let reqData = {
//                    url: {executorId: account},
//                    parameter: {
//                        page: 1,
//                        rows: 8,
//                        status: 1
//                    }
//                };
                let reqData = {
                    account: that.account,
                    parameter: {
                        page: 1,
                        rows: 8,
                        status: 1
                    }
                };
                // 若有currentClientId，则查询参数加上clientId，查找指定的系统的待办，若无，则查询全部
                if (that.currentClientId) {
                    reqData.parameter.clientId = that.currentClientId;
                }

                that.$store.dispatch('getBacklogsData', {reqData});
            },

            getBacklogsTagData() {
                let that = this;
                let reqData = {
                    account: that.account
                };
                that.$store.dispatch('getBacklogsTagData', {reqData});
            },

            clickTabHeader(val) {
                let that = this;
                debugger;
                console.log(val)
                that.currentClientId = val;

                // 条件搜索待办事项数据
                that.getBacklogsData();
            }
        },

        created() {
//            console.warn(this)
            // 获得标签头的数据
//            let reqData = {
//                password: password,
//                username: username
//            };
//            this.$store.dispatch('login', {reqData});
            console.warn('todolist created,');
            console.warn(this.userData);
            let dataFromBackEnd = this.userData.data;
            if (dataFromBackEnd && dataFromBackEnd.data && dataFromBackEnd.data.account) {
                this.account = dataFromBackEnd.data.account;
            } else { // 页面刷新了。重新获取一次userData todo
                this.account = sessionStorage.getItem('account');
            }

            // 获取代办数据
            this.getBacklogsData();
            // 获取标签头的数据
            this.getBacklogsTagData();
        }
    }
</script>