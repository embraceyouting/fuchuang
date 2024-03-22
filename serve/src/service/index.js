import axios from "axios";
import { getToken, removeToken, setToken } from "@/utils/token";
import { ElMessage } from "element-plus";

const service = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
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
        if (response.data.code !== 200) {
            ElMessage.error(response.data.msg);
            removeToken()
            return Promise.reject(response.data);
        }
        setToken(response.headers.authorization);
        return response.data;
    },
    (error) => {
        if (error.response.status === 401) {
            removeToken()
        } else {
            ElMessage.error(error.response.data.msg);
        }
        return Promise.reject(error.response);
    }
);

export default service;