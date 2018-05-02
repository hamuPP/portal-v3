<style scoped lang="less">
    @import '../../assets/css/todolist.less';
</style>

<template>
    <div class="todo-list-container">
        <Tabs>
            <TabPane label="标签一">
                <Table
                        :height=tableBodyHeight
                        :columns="columns1" :data="data1"></Table>
            </TabPane>
            <TabPane label="标签二">标签二的内容</TabPane>
            <TabPane label="标签三">标签三的内容</TabPane>
        </Tabs>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'todolist',
        data () {
            return {
                account: '', // 当前登录用户的账号
                currentClientId: '',
                tableBodyHeight: 278,
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
                        title: '事件来源',
                        key: 'form'
                    },
                    {
                        title: '流程启动时间',
                        key: 'duration'
                    }
                ],

                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            }
        },

        computed: mapGetters({
            /* 用户数据数据 */
            userData: 'userData',
            /* 待办数据 */
            backlogsData: 'backlogsData'
        }),

        watch: {
            userData(val) {
                console.warn('todolist.vue watch userData', val);
            },

            backlogsData(val) {
                let that = this;
                console.warn('todolist.vue watch backlogsData', val);
                let rawDataFromBackEnd = val.data;
                that.data1 = rawDataFromBackEnd.data;
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

                that.$store.dispatch('getBacklogsData', {reqData});
            },

            getBacklogsTagData() {
                let that = this;
                let reqData = {
                    userId: that.account
                };
                that.$store.dispatch('getBacklogsTagData', {reqData});
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
//            this.getBacklogsTagData();
        }
    }
</script>