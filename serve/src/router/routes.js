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
		path: "/subject",
		name: "subject",
		component: () => import("../views/subject/index.vue"),
		meta: {
			isNavItem: true,
            isNav: true,
			title: "navbar.subject"
		},
		children:[
			{
				path:":name",
				name:"subject-file",
				component: () => import("../views/subject/index.vue"), //根据具体file来变化，need change
			}
		]
	},
	{
		path: "/submit",
		name: "submit",
		component: () => import("../views/submit/index.vue"),
		meta: {
			isNavItem: true,
            isNav: true,
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
		path: "/",
		redirect: "/home",
	},
	{
		path: "/:catchAll(.*)",
		component: () => import("../views/error/index.vue"),
	},
];
