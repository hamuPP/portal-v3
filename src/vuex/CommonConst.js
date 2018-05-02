/**
 * Created by ty on 18/4/9.
 */

// 变量 start
export const ALL_BALL_LIST_DATA = 'ALL_BALL_LIST_DATA';
export const LOGIN_DATA = 'LOGIN_DATA';
export const LOGOUT_DATA = 'LOGOUT_DATA';
export const USER_DATA = 'USER_DATA';
export const BACKLOGS_DATA = 'BACKLOGS_DATA';
export const BACKLOGS_TAG_DATA = 'BACKLOGS_TAG_DATA';
// 变量 end

// 请求地址 --start--

export const API_PRE = 'api/'; // 前端工程中给所有接口前面加上api的字段，因为路由里会将非api开头的路径都当做静态资源去找。
export const GATEWAY_PORTAL = 'portal/';

export const GET_BALL_LIST_DATA = 'mockData/ballList.json';
export const LOGIN = 'login';

export const GET_USER_DATA = GATEWAY_PORTAL + '${account}/enterprise'; //
// export const GET_USER_DATA = 'enterprise';

export const GET_BACK_LOGS_DATA = GATEWAY_PORTAL + 'backlogs/${account}';
export const GET_BACK_LOGS_TAG_DATA = GATEWAY_PORTAL + 'backlogs/${account}/tags';
// 请求地址 --end--

export const getUrl = function(urlObj) {
    let url = urlObj.url;
    let queryParams = urlObj.queryParams;

    // 依次替换掉${XXX}中的占位符
    for (let key in queryParams) {
        let val = queryParams[key];
        if (!val) { return; }
        let reg = new RegExp('\\${' + key + '}');
        url = url.replace(reg, val);
    }

    // 判断如果以json结尾的，则请求本地json,否则则请求服务器--不要这种，json的直接import的方式引入
    // console.log('getUrl', url);// portal/login
    let actualUrl = `${API_PRE}${url}`;
    // console.log('actualUrl', actualUrl);

    return actualUrl;
};