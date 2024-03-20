import { defineStore } from "pinia";
import { nanoid } from "nanoid";
import { encrypt, setToken } from "@/utils/token";
import axios from "axios";
export const useUserStore = defineStore("user", {
    state: () => ({
        userInfo: null,
        token: null,
        isfirst: null,
    }),
    actions: {
        login(email, password) {
            return new Promise((resolve, reject) => {
                axios.post('http://127.0.0.1:8000/login', { email, password })
                    .then(response => {
                        const res = response.data[0]
                        if (res) {
                            const userInfo = {
                                id: nanoid(),
                                username: res.username,
                                email: res.email,
                                // 如果您不希望在客户端保存密码，可以不将密码存储在 userInfo 中
                                password: res.password,
                            };
                            const token = encrypt(userInfo);
                            setToken(token);
                            resolve(userInfo);
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
