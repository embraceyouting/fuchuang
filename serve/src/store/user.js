import { defineStore } from "pinia";
import service from "@/service";
import { removeToken } from "@/utils/token";

export const useUserStore = defineStore("user", {
	state: () => ({
		userInfo: null
	}),
	actions: {
		login(email, password) {
			const store = this; // 保存 this 到一个变量中
			return service
				.post("/user/login", { email, password })
				.then((response) => {
					store.userInfo = response.data;
					return response;
				});
		},
		logout(){
			removeToken()
			this.userInfo = null
		},
		register(email, username, password) {
			const store = this;
			return service.post("/user", {
				email,
				username,
				password,
			}).then((response) => {
				store.userInfo = response.data;
				return response;
			});
		},
		getUserInfo() {
			service.get("/user").then((res) => {
				this.userInfo = res.data;
			});
		},
	},
	getters: {},
});
