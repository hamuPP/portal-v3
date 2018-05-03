<style scoped lang="less">
    @import '../../assets/css/homepage-right-container.less';
</style>

<template>
    <div class="homepage-right-container">
        <!--<div class="homepage-right-container-inner">-->
        <div class="homepage-right-cols cols-2">
            <basicPanel radius>
                <img src="../../assets/images/skin-blue/notepad.png" alt="" slot="panelLeftIconImg">
                <p slot="panelTitleText">代办事务</p>
                <template slot='panelBody'>
                    <TodoList></TodoList>
                </template>
            </basicPanel>
        </div>
        <div class="homepage-right-cols cols-1">
            <basicPanel radius>
                <img src="../../assets/images/skin-blue/calendar.png" alt="" slot="panelLeftIconImg">
                <p slot="panelTitleText">日程表</p>
                <template slot='panelBody'>
                    <CalenderSchedule></CalenderSchedule>
                </template>
            </basicPanel>
        </div>
        <div class="homepage-right-cols cols-1">
            <basicPanel radius>
                <img src="../../assets/images/skin-blue/notepad.png" alt="" slot="panelLeftIconImg">
                <p slot="panelTitleText">通知公告</p>
                <template slot='panelBody'>
                    <Notice></Notice>
                </template>
            </basicPanel>
        </div>

        <div class="homepage-right-cols cols-1">
            <basicPanel radius>
                <img src="../../assets/images/skin-blue/notepad.png" alt="" slot="panelLeftIconImg">
                <p slot="panelTitleText">echart1</p>
                <template slot='panelBody'>
                    <Notice></Notice>
                </template>
            </basicPanel>
        </div>

        <div class="homepage-right-cols cols-1">
            <basicPanel radius>
                <img src="../../assets/images/skin-blue/notepad.png" alt="" slot="panelLeftIconImg">
                <p slot="panelTitleText">echart2</p>
                <template slot='panelBody'>
                    <Notice></Notice>
                </template>
            </basicPanel>
        </div>

        <div class="homepage-right-cols cols-1">
            <basicPanel radius>
                <img src="../../assets/images/skin-blue/notepad.png" alt="" slot="panelLeftIconImg">
                <p slot="panelTitleText">echart3</p>
                <template slot='panelBody'>
                    <Notice></Notice>
                </template>
            </basicPanel>
        </div>


        <!--</div>-->
    </div>
</template>

<script>
    import basicPanel from '../tpl/basicPanel.vue';
    import TodoList from '../todolist/todolist.vue';
    import CalenderSchedule from '../calenderSchedule/calenderSchedule.vue';
    import Notice from '../notice/notice.vue';

    export default {
        name: 'rightAll',
        components: {
            basicPanel,
            TodoList,
            CalenderSchedule,
            Notice
        }
    }
</script>