import Login from '../login.vue'
// import Index from '../components/index/index.vue'
import mock from '../components/mock.vue'

const routes = [
    {
        path: '/',
        redirect: '/mock'
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
    // },
    {
        path: '/mock',
        component: mock,
        meta: {title: 'mock'},

    }

];

export default routes
