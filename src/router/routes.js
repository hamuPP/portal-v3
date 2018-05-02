import Login from '../components/login/login.vue'
import Index from '../components/index/index.vue'
import rightAll from '../components/index/rightAll.vue'
import functionMapRightAll from '../components/functionMap/functionMapRightAll.vue'
import mock from '../components/mock.vue'

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
    {
        path: '/index',
        component: Index,
        meta: {title: '门户'},
        children: [
            {
                path: '',
                components: {
                    main: rightAll
                    // a:RightModel,
                    // // b:FunctionMap,
                    // c:AgencyFull
                }
            },
            {
                path: '/functionMap',
                components: {
                    main: functionMapRightAll
                    // a:RightModel,
                    // // b:FunctionMap,
                    // c:AgencyFull
                }
            }
        ]
    },
    {
        path: '/mock',
        component: mock,
        meta: {title: 'mock'},

    }

];

export default routes
