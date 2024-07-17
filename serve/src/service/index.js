import axios from "axios";
import { getToken, setToken } from "@/utils/token";
import pubsub from "@/utils/pubsub";
import { useUserStore } from "@/store/user";

const service = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 30000,
});

service.interceptors.request.use(
	(config) => {
        getToken() && (config.headers['Authorization'] = `Bearer ${getToken()}`);
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

service.interceptors.response.use(
    (response) => {
        if (response.data.code && response.data.code !== 200) {
            pubsub.emit("error", response.data.msg, response.status, response.statusText);
            useUserStore().logout()
            return Promise.reject(response.data);
        }
        response.headers.authorization && setToken(response.headers.authorization);
        return response.data;
    },
    (error) => {
        if (!error.response?.data && error.message) {
            pubsub.emit("error", error.message);
            return Promise.reject(error);
        }
        if (error.response.status === 401) {
            useUserStore().logout()
        }
        pubsub.emit("error", error.response.data.msg, error.response.status, error.response.statusText);
        return Promise.reject(error.response);
    }
);

export default service;