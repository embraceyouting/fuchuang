export default [
	{
		path: "/login",
		name: "login",
		component: () => import("../components/home_login/login.vue"),
	},
	{
		path: "/signup",
		name: "signup",
		component: () => import("../components/home_login/signup.vue"),
	},
	{
		path: "/home",
		name: "home",
		component: () => import("../views/home/home_page.vue"),
		children: [
			{
				path: "",
				name: "home_main",
				component: () => import("../components/home_login/home.vue"),
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
			title: "项目"
		},
	},
	{
		path: "/user",
		name: "user",
		component: () => import("../views/user/index.vue"),
		meta: {
			isNavItem: true,
            isNav: true,
			title: "我的"
		},
	},
	{
		path: "/",
		redirect: "/home",
	},
	{
		path: "/:catchAll(.*)",
		component: () => import("../views/error/404_error.vue"),
	},
];
