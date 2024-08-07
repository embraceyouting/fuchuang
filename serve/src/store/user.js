import { defineStore } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
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
    logout() {
      removeToken();
      this.userInfo = null;
      this.subjectList = [];
    },
    register(email, username, password) {
      return service
        .post("/user", {
          email,
          username,
          password,
        })
        .then((response) => {
          this.userInfo = response.data;
          return response;
        });
    },
    getUserInfo() {
      if (!getToken()) return Promise.reject(new Error("No token found"));
      return service.get("/user").then((res) => {
        this.userInfo = res.data;
      });
    },
    getSubjectList() {
      return service.get("/subject").then((res) => {
        this.subjectList = res.data;
      });
    },
    removeSubject(id) {
      return service.delete(`/subject/${id}`).then((res) => {
        this.getSubjectList();
        return res
      });
    }
  },
  getters: {
    subjectUrlList: (state) => {
      return Array.from(new Set(state.subjectList.map((item) => item.url)));
    }
  },
  plugins: [createPersistedState()],
  persist: true
});
