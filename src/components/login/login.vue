/*********************************************************************
* 登录模块                                                           *
* Created by tr on 2017/6/27.                                        *
*********************************************************************/
<style scoped lang='less'>
    @import '../../assets/css/login.less';
</style>
<template>
    <div id='Login' class='Login'>
        <div class='logo-box'>
            <img src='' alt='logo' style='visibility: hidden'/>
        </div>

        <!--用户信息模块-->
        <div class='login-wrapper'>
            <div class='header'>
                <h3>统一业务平台</h3>
                <h4>UNIFIED SERVICE PLATFORM</h4>
                <img src='../../assets/images/login-avatar.png' alt='avatar'/>
            </div>
            <form>
                <div class='control-group'>
                    <label><img src='../../assets/images/account.png' alt='account'/><span>账号</span></label>
                    <input type='text' class='form-control'
                           placeholder='请输入用户名' required='true' v-model='userName'>
                </div>


                <div class='control-group'>
                    <label><img src='../../assets/images/pwd.png' alt='account'/><span>密码</span></label>
                    <input class='form-control'
                           type='password' style=''
                           placeholder='密 码' required='true'  v-model='password'>
                </div>


                <div class='checkbox' style='text-align: left;color: #ccc;width: 85%;margin-left:auto;margin-right:auto;'>
                    <input type='checkbox' class='checkbox'> 记住我
                </div>


                <div class='msg-group' v-bind:class='{"show": isShow}'>
                    <p id='msgTxt'>{{loginDataValue}}</p>
                </div>


                <template v-if='!isShow'>
                    <button type='button' class='btn btn-primary' @click='loginEle'>
                        <span class='text'>登录</span>
                    </button>
                </template>
                <template v-else>
                    <button type='button' class='btn btn-primary'>
                        <img src='../../assets/images/loading_white.gif' width='20'>
                    </button>
                </template>

                <!--<button type="button" @click="toMockPage">to mock page</button>-->
            </form>
        </div>
        <!--<div class='footer'>-->
        <!--<p>Copyright ©️ 2017 <a href='javascript:'>四川省水电集团</a> 版权所有</p>-->
        <!--</div>-->

        <div class='footer-software-dept'>
            <div class='img'></div>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default{
        /**
         * @returns {{
         * password: string 登录密码,
         * userName: string 用户名,
         * isShow: boolean 是否显示提示信息,
         * loginDataValue: string 提示的信息
         * }}
         */
        data() {
            return {
                password: '',
                userName: '',
                isShow: false,
                loginDataValue: ''
            }
        },
        computed: mapGetters({
            /* 登录后的数据 */
            loginData: 'loginData',
            userData: 'userData'
        }),
        watch: {
            /**
             * 监听登录后返回的数据
             * @param val 返回的数据信息
             */
            loginData(val) {
                let that = this;
                let data = val.data;
                if (data && data.meta) {
                    if (data.meta.code === 1) {
                        that.isShow = true;
                        that.loginDataValue = data.msg;

                        // 请求用户数据，
                        let reqData = {
                            account: that.userName
                        };
                        that.$store.dispatch('getUserData', {reqData});
                    } else {
                        that.loginDataValue = data.meta.message || '网络错误';
                    }
                } else {
                    let msgText = data.meta.message || '网络错误';

                    // ‘坏的凭证’‘Bad credentials'
                    if (data.meta.message === '坏的凭证' || data.meta.message === 'Bad credentials') {
                        msgText = '密码错误'
                    }
                    that.loginDataValue = msgText;
                }
                // const that = this;
                //
                // that.loginDataValue = val.msg;
                // that.isShow = true;
                 /* 2s后信息自动隐藏 */
                 if (data) {
                     setTimeout(function() {
                         that.loginDataValue = '';
                         that.isShow = false;
                     }, 2000);
                 }
            },

            userData(val) {
                debugger;
                let that = this;
                let data = val.data;
                if (data && data.meta) {
                    if (data.meta.code === 1) {
                        sessionStorage.setItem('account', that.userName);
                        that.$router.push({path: '/index'});
                    } else {
                        that.loginDataValue = data.meta.message || '网络错误';
                    }
                } else {

                }
            }
        },
        methods: {
            /**
             * 登录操作
             */
            loginEle: function () {
                const that = this;
                let password = that.password;
                let username = that.userName;
                if (password && username) {
                    let reqData = {
                        password: password,
                        username: username
                    };
                    that.$store.dispatch('login', {reqData});
                }
            },

            toMockPage() {
                this.$router.push({path: '/mock'});
//                this.$router.push({ path: '/login' });
            }
        }
    }
</script>
