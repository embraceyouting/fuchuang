import axios from "axios";
import { getToken, setToken } from "@/utils/token";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/user";

const service = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 5000,
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
            ElMessage.error({
                message: response.data.msg,
                grouping: true,
            });
            useUserStore().logout()
            return Promise.reject(response.data);
        }
        response.headers.authorization && setToken(response.headers.authorization);
        return response.data;
    },
    (error) => {
        if (error.message) {
            ElMessage.error({
                message: error.message,
                grouping: true,
            });
            return Promise.reject(error);
        }
        if (error.response.status === 401) {
            useUserStore().logout()
        }
        ElMessage.error(error.response.data.msg);
        return Promise.reject(error.response);
    }
);

export default service;