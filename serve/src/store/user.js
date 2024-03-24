import { defineStore } from "pinia";
import service from "@/service";
import { getToken, removeToken } from "@/utils/token";

export const useUserStore = defineStore("user", {
	state: () => ({
		userInfo: null,
		subjectList: [],
	}),
	actions: {
		login(email, password) {
			return service
				.post("/user/login", { email, password })
				.then((response) => {
					this.userInfo = response.data;
					return response;
				});
		},
		logout(){
			removeToken()
			this.userInfo = null
			this.subjectList = []
		},
		register(email, username, password) {
			return service.post("/user", {
				email,
				username,
				password,
			}).then((response) => {
				this.userInfo = response.data;
				return response;
			});
		},
		getUserInfo() {
			getToken() && service.get("/user").then((res) => {
				this.userInfo = res.data;
			});
		},
		getSubjectList() {
			service.get("/subject").then((res) => {
				this.subjectList = res.data;
			});
		},
		removeSubject(id) {
			return service.delete(`/subject/${id}`).then(res=>{
				this.subjectList = this.subjectList.filter(item => item.id !== id)
				return res
			})
		}
	},
	getters: {},
});
