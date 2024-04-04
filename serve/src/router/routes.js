export default [
	{
		path: "/login",
		name: "login",
		component: () => import("../views/login/index.vue"),
	},
	{
		path: "/home",
		name: "home",
		component: () => import("../views/home/index.vue"),
		children: [
			{
				path: "",
				name: "home_main",
				component: () => import("../views/home/index.vue"),
			},
		],
		meta: {
            isNav: true
		},
	},
	{
		path: "/visualization",
		name: "visualization",
		component: () => import("../views/visualization/index.vue"),
		meta: {
			isNavItem: true,
            isNav: true,
			isKeepAlive: true,
			title: "navbar.visualization"
		},
	},
	{
		
		path:"/:adcode",
		name:"province",
		component: () => import("../views/visualization/province.vue"), //根据具体file来变化，need change
		meta: {
			isNavItem: false,
            isNav: false,
			isKeepAlive: false,
		},
	},
	{
		path: "/submit",
		name: "submit",
		component: () => import("../views/submit/index.vue"),
		meta: {
			isNavItem: true,
            isNav: true,
			isKeepAlive: true,
			title: "navbar.submit"
		},
	},
	{
		path: "/user",
		name: "user",
		component: () => import("../views/user/index.vue"),
		meta: {
			isNavItem: true,
            isNav: true,
			title: "navbar.mine"
		},
	},
	{
		path: "/chat",
		name: "chat",
		component: () => import("../views/chat/index.vue"),
		meta: {
			isNavItem: true,
            isNav: true,
			title: "navbar.chat"
		},
	},
	{
		path: '/ue',
		name: 'ue',
		component: () => import("../views/ue/index.vue"),
		meta: {
			isNav: true,
			isKeepAlive: true,
			isNavItem: true,
			title: "navbar.ue"
		}
	},
	{
		path: '/test',
		name: 'test',
		component: () => import("../views/test/index.vue"),
	},
	{
		path: '/project/:id+',
		name: 'project',
		component: () => import("../views/project/index.vue"),
	},
	{
		path: "/",
		redirect: "/home",
	},
	{
		path: "/:catchAll(.*)",
		component: () => import("../views/error/index.vue"),
	},
];
