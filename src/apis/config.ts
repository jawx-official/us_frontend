import axios from "axios";
import { useAuthStore as authStore } from "../store/auth";
var base_url = process.env.NEXT_PUBLIC_PROD_BASEURL || "";

if (process.env.NEXT_PUBLIC_ENV === "dev-local") {
    base_url = process.env.NEXT_PUBLIC_DEV_BASEURL || "";
} else if (process.env.NEXT_PUBLIC_ENV === "staging" || process.env.NODE_ENV === "development") {
    base_url = process.env.NEXT_PUBLIC_STAGING_BASEURL || "";
}

export const BlackAxios = axios.create({
    baseURL: base_url,
    headers: { "Content-Type": "application/json", },
});

export const UploadAxios = axios.create({
    baseURL: base_url,
    headers: { "Content-Type": "multipart/form-data", },
});


BlackAxios.interceptors.request.use(
    async (config) => {
        const state = authStore.getState();
        if (state && state.access && state.access?.granted) {
            // check token expiry date
            let expiry = state.access.expiresIn * 1000;
            let now = new Date().getTime();
            if (expiry < now) {
                // refresh token
                state.logoutAccount()
                let current = window.location.href
                window.location.href = "/auth/login?redirect_uri=" + current
                return config
            }
            const token = state.access.accessToken ? state.access.accessToken : null;
            if (token) config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


UploadAxios.interceptors.request.use(
    async (config) => {
        const state = authStore.getState();
        if (state && state.access && state.access?.granted) {
            // check token expiry date
            let expiry = state.access.expiresIn * 1000;
            let now = new Date().getTime();
            if (expiry < now) {
                // refresh token
                state.logoutAccount()
                let current = window.location.href
                window.location.href = "/auth/login?redirect_uri=" + current
                return config
            }
            const token = state.access.accessToken ? state.access.accessToken : null;
            if (token) config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

BlackAxios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    return error.response;
});