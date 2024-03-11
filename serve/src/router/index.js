import routes from './routes';
import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from 'vuex';
const router = createRouter({
  history: createWebHistory(),
  routes,
});
// 导航守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = function checkAuthentication() {
    const store = useStore();
    if (store) {
      const currentRoute = to.path; // 使用 to.path 获取目标路由的路径
      store.state.islogin = localStorage.getItem("islogin");
      if (!store.state.islogin && currentRoute !== '/login'&&currentRoute !== '/signup') {
        return false;
      }
    }
    return true; // 返回 true 表示通过身份验证或不需要验证
  };  

  // 如果用户已经通过身份验证，允许导航
  if (isAuthenticated()) {
    next();
  } else {
    // 如果用户未通过身份验证，重定向到登录页面或其他页面
    next('/login');
  }
});

export default router
