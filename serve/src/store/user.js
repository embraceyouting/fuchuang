import { defineStore } from "pinia";
import { nanoid } from "nanoid";
import { encrypt, setToken } from "@/utils/token";
import axios from "axios";

export const useUserStore = defineStore("user", {
    state: () => ({
        userInfo: null,
        token: null,
        isfirst: null,
        avatar: null
    }),
    actions: {
        login(email, password) {
            const store = this; // 保存 this 到一个变量中
            return new Promise((resolve, reject) => {
                axios.post('http://127.0.0.1:8000/login', { email, password })
                    .then(response => {
                        const res = response.data[0]
                        if (res) {
                            store.userInfo = {
                                id: nanoid(),
                                username: res.username,
                                email: res.email,
                                // 如果您不希望在客户端保存密码，可以不将密码存储在 userInfo 中
                                password: res.password,
                            };
                            const token = encrypt(store.userInfo); // 使用 store.userInfo
                            setToken(token);
                            resolve(store.userInfo);
                        }
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }
    },
    getters: {},
});
