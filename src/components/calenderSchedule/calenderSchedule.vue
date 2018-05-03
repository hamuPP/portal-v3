<template>
    <div class="homepage-calendar-container">
        <!--编辑日程表事务-->
        <editMask refValue="agencyBox"></editMask>
        <div class="left-content">
            <!--<div class="content-title">-->
            <!--<p class="title">我的日程</p>-->
            <!--</div>-->
            <div class="content-body">
                <div class='calendar-date'>
                    <DatePicker @datePicker="datePicker" :selectTimeData="allTaskDate"></DatePicker>
                </div>
                <div class="calendar-content" v-if="taskState === 'list'">
                    <div @click="addTask('add')" class="addTask">
                        <i class="iconfont icon-xinjianricheng"></i>
                        <div class="task-title">
                            <p>新建任务事件</p>
                            <p style="display: none;">创建一条选定时间日程</p>
                        </div>
                    </div>
                    <ul class="task-list" v-if="!isShow">
                        <template v-if="taskDate.length">
                            <li v-for="td in taskDate" :class="{isShow:isShow}" @click="curTaskEvt(td)">
                                <p>{{td.newTime}}</p>
                                <p>{{td.scheduleName}}</p>
                                <i class="delete iconfont icon-shanchu_lajitong" @click.stop="deleteTask(td)"> </i>
                            </li>
                        </template>
                        <li v-else class="notStyle">无任务事件</li>
                    </ul>
                    <ul class="task-list task-detail" v-else>
                        <li>
                            <p>{{taskObj.newTime}}</p>
                            <p>{{taskObj.scheduleName}}</p>
                        </li>
                        <li class="notStyle">
                            <p>{{taskObj.eventDescription}}</p>
                            <button @click="addTask('edit')" class="addTask">编辑</button>
                            <button @click="closeTaskEvt">返回</button>
                        </li>
                    </ul>

                </div>
                <div class="calendar-content task_add" v-else-if="taskState === 'edit'">
                    <input type="text" placeholder="事件名称" v-model="taskObj.scheduleName" maxlength="20"/>
                    <selection label="开始:" showType='scroll' :objProps="startTime" @clickEvt="dropPick"></selection>
                    <selection label="结束:" showType='scroll' :objProps="endTime" @clickEvt="dropPickA"></selection>
                    <textarea placeholder="事件描述" maxlength="500" v-model="taskObj.eventDescription"></textarea>
                    <button @click="addTaskEvt" class="addTask">{{Object.keys(taskObj).length === 0 ? '创建' :'保存' }}
                    </button>
                    <button @click="closeTaskEvt">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Selection from '../tpl/Selection.vue'
    import DatePicker from '../tpl/DatePicker.vue'
    import editMask from '../tpl/EditMask.vue'
    import {mapGetters} from 'vuex'

    export default {
        name: 'homepageCalendar',
        components: {
            DatePicker,
            Selection,
            editMask
        },
        data() {
            return {
                taskState: 'list', // 任务的状态，‘list’，‘edit’，‘show’
                taskDate: [],
                taskObj: {},
                timeList: [],
                isShow: false,
                allTaskDate: [],
                startTime: {}, // 开始的时间
                endTime: {}, // 结束时间
                currentDate: '' // 当前的时间
            }
        },
        computed: mapGetters({
            taskList: 'taskList',
            addTaskDate: 'addTaskDate',
            updateTaskDate: 'updateTaskDate',
            deleteTaskDate: 'deleteTaskDate',
            allDate: 'allTaskDate'
        }),
        watch: {

            'startTime': function(val) {

            },
            /* 监听日程列表数据 */
            'taskList': function (val) {
                let that = this;
                that.$nextTick(() => {
                    that.taskDate = val.map(item => {
                        let it = item;
                        it.newTime = item.startTime.substring(11, 16) + '-' + item.endTime.substring(11, 16);
                        return it;
                    });
                });

                /* 关闭当前编辑状态 */
                that.closeTaskEvt();
            },
            /* 监听日程新增数据 */
            'addTaskDate': function (val) {
                let that = this;
                if (val && val.id) {
                    that.taskState = 'list';
                    // that.taskDate.push(that.taskObj);
                    // val处理成符合前端展示的数据格式
                    let startTimes = val.startTime.split(' ')[1].split(':');
                    let endTimes = val.endTime.split(' ')[1].split(':');
                    val.newTime = startTimes[0] + ':' + startTimes[1] + '-' + endTimes[0] + ':' + endTimes[1];

                    that.taskDate.push(val);
                    that.taskObj = {};
                    /* 获取所有日程的日期 */
                    // that.$store.dispatch('getAllTaskData');
                }
            },
            /* 监听日程新增数据 */
            'updateTaskDate': function (val) {
                let that = this;
                that.$nextTick(() => {
                    if (val) {
                        that.taskState = 'list';
                        let temp = that.taskDate.map(item => {
                            let newItem = item;
                            if (item.id === that.taskObj.id) {
                                newItem = that.taskObj;
                            }
                            return newItem;
                        });
                        that.taskDate = temp;
                        that.taskObj = {};
                    }
                });
            },
            /* 监听日程新增数据 */
            'deleteTaskDate': function (val) {
                let that = this;
                that.$nextTick(() => {
                    if (val) {
                        that.taskState = 'list';
                        let temp = [];
                        that.taskDate.map(item => {
                            item.id === that.taskObj.id || temp.push(item);
                        });
                        that.taskDate = temp;
                        that.taskObj = {};

                        /* 获取所有日程的日期 */
                        that.$store.dispatch('getAllTaskData');
                    }
                });
            },
            'allDate': function (val) {
                let that = this;
                that.$nextTick(() => {
                    that.allTaskDate = val;
                });
            }
        },
        methods: {
            /* 新增任务 */
            addTask(ele) {
                let that = this;
                ele === 'edit' || (that.taskObj = {});
                that.taskState = 'edit';
                this.isShow = false;

                /* 更改下拉框内的默认选中值 by:ty 2018年03月23日11:47:50 */
                if (ele === 'add') { // 新增
                    /* 增加日历下拉框的初始选中值 */
                    that.taskObj.newTime = '08:00-08:30';
                    let timeArr = that.taskObj.newTime.split('-');
                    that.startTime.filterValue = timeArr[0];
                    that.endTime.filterValue = timeArr[1];
                } else if (ele === 'edit') { // 编辑修改

                }
            },
            /* 新增日程表的数据 */
            addTaskEvt() {
                let that = this;
                let taskObj = that.taskObj;

                // 如果taskObj中没有开始和结束时间，则设置默认时间
                if (!that.taskObj.startTime) {
                    that.taskObj.startTime = that.currentDate + ' ' + that.startTime.filterValue + ':00';
                }
                if (!that.taskObj.endTime) {
                    that.taskObj.endTime = that.currentDate + ' ' + that.endTime.filterValue + ':00';
                }

                // 如果taskObj中没有newTime时间，则重新计算newTime
                if (!that.taskObj.newTime) {
                    that.taskObj.newTime = that.startTime.filterValue + '-' + that.endTime.filterValue;
                }

                if (taskObj.id) {
                    that.$store.dispatch('updateTaskDate', {
                        reqData: taskObj
                    });
                } else {
                    that.$store.dispatch('addTaskDate', {
                        reqData: taskObj
                    });
                }
            },
            /* 删除日程表数据 */
            deleteTask(ele) {
                this.taskObj = ele;
                this.$store.dispatch('deleteTaskData', {
                    reqData: ele.id
                });
            },
            /* 开始时间点击事件 */
            dropPick(data) {
                let that = this;
                that.taskObj.startTime = that.currentDate + ' ' + data.name + ':00';
                that.getTimer('end', data.name);
            },
            /* 获取当前下拉框的时间 */
            getTimer(type, value) {
                let that = this;
                let temp = [];
                that.timeList.map(item => {
                    if (type === 'end' && item.name >= value) {
                        temp.push(item);
                    } else if (type === 'start' && item.name <= value) {
                        temp.push(item);
                    }
                });
                type === 'end' ? that.endTime.list = temp : that.startTime.list = temp;
            },
            /* 结束时间点击事件 */
            dropPickA(data) {
                let that = this;
                that.taskObj.endTime = that.currentDate + ' ' + data.name + ':00';
                that.taskObj.newTime = that.taskObj.startTime.substring(11, 16) + '-' + data.name;
                that.getTimer('start', data.name);
            },
            /* 获取当初页面 */
            datePicker(data) {
                this.currentDate = data;
                this.$store.dispatch('getTaskList', {
                    reqData: data
                });
            },
            /**
             * 点击当前列表信息
             * @param ele
             */
            curTaskEvt(ele) {
                let that = this;
                that.taskObj = ele;
                that.isShow = true;
            },
            /* 关闭操作页 */
            closeTaskEvt() {
                this.isShow = false;
                this.taskState = 'list';
            },
            /* 计算下拉框里面的值 */
            calculateData() {
                let that = this;
                for (let i = 0; i < 24; i++) {
                    for (let j = 0; j < 2; j++) {
                        let newData = {
                            id: i.toString() + j,
                            _select_show: true,
                            name: (i > 9 ? i : ('0' + i)) + ':' + (j === 0 ? '00' : '30')
                        };
                        that.timeList.push(newData);
                    }
                }
                that.startTime.list = that.timeList;
                that.startTime.list = that.timeList;
                that.endTime.list = that.timeList;

                /* 增加日历下拉框的初始选中值 */
                that.startTime.filterValue = '08:00';
                that.endTime.filterValue = '08:30';
                that.taskObj.newTime = '08:30-08:30';
            },

        },
        mounted() {
            let that = this;
            that.$nextTick(() => {
                that.timeList = [];
                /* 默认展示的数据 */
                that.calculateData();
                /* 获取当前时间 */
                let dd = new Date();
                let m = dd.getMonth() + 1;
                m = m > 9 ? m : '0' + m;
                let cd = dd.getDate();
                cd = cd > 9 ? cd : '0' + cd;
                that.currentDate = dd.getFullYear() + '-' + m + '-' + cd;
                /* 获取当天的日程数据 */
                that.$store.dispatch('getTaskList', {
                    reqData: dd.getFullYear() + '-' + m + '-' + cd
                });
                /* 获取所有日程的日期 */
                that.$store.dispatch('getAllTaskData');
            });
        }
    }
</script>

<style scoped lang='less'>
    @import '../../assets/css/homepage-calendar.less';
</style>