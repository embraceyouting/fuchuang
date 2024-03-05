export default[
    {
        path:'/home',
        name:'home',
        component:()=>import('../views/home/home_page.vue'),
        children:[
            {
                path:'',
                name:'home_main',
                component:() => import('../components/home_login/home.vue'),
            },
            {
                path:'login',
                name: 'login',
                component: () => import('../components/home_login/login.vue'),
            },
            {
                path:'signup',
                name: 'signup',
                component: () => import('../components/home_login/signup.vue'),
            },  
        ]
    },
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/:catchAll(.*)',
        component: () => import('../views/error/404_error.vue'),
    },
]