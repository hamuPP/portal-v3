/**
 * Created by ty on 18/4/9.
 */

// 变量 stat
export const ALL_BALL_LIST_DATA = 'ALL_BALL_LIST_DATA';
export const LOGIN_DATA = 'LOGIN_DATA';
export const LOGOUT_DATA = 'LOGOUT_DATA';
// 变量 end

// 请求地址 --start--

export const API_PRE = 'api/';
export const GATEWAY_PORTAL = 'portal/';

export const GET_BALL_LIST_DATA = 'mockData/ballList.json';
export const LOGIN = 'login';
// 请求地址 --end--

export const getUrl = function(urlObj) {
    let url = urlObj.url;

    // 判断如果以json结尾的，则请求本地json,否则则请求服务器--不要这种，json的直接import的方式引入

    console.log('getUrl', url);// portal/login
    let actualUrl = `${API_PRE}${url}`;
    console.log('actualUrl', actualUrl);

    return actualUrl;
};