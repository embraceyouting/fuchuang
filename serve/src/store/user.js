import { defineStore } from "pinia";
import { nanoid } from "nanoid";
import { encrypt, setToken } from "@/utils/token";

export const useUserStore = defineStore("user", {
	state: () => ({
		userInfo: null,
        token: null
	}),
	actions: {
        async userLogin(email, password){
            const res = await Promise.resolve({
                id: nanoid(),
                email,
                password
            })
            this.userInfo = res
            this.token = encrypt(res)
            setToken(this.token)
        }
    },
	getters: {},
});
