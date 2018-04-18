// import Index from '../components/index/index.vue'
import Login from '../login.vue'

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login,
        meta: {title: '登录'}
    },
    // {
    //     path: '/index',
    //     component: Index,
    //     meta: {title: '门户'},
    //     children: [
    //         {
    //             path: '',
    //             components: {
    //                 // a:RightModel,
    //                 // // b:FunctionMap,
    //                 // c:AgencyFull
    //             }
    //         }
    //     ]
    // }

];

export default routes
