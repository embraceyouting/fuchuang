import routes from "./routes";
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/store/user";
const router = createRouter({
	history: createWebHistory(),
	routes,
});
// 导航守卫
router.beforeEach((to, from, next) => {
	const isAuthenticated = () => {
		// 只登陆一次保留token方便调试


		// const userStore = useUserStore();
		// if (!userStore.userInfo && to.path !== "/login") {
		// 	// 如果用户未登录并尝试访问登录页面，则重定向到登录页面
		// 	return false;
		// }
		return true; // 返回 true 表示通过身份验证或不需要验证
	};

	// 如果用户已经通过身份验证，允许导航
	if (isAuthenticated()) {
		next();
	} else {
		// 如果用户未通过身份验证，重定向到登录页面或其他页面
		next("/login");
	}
});

export default router;
