import { BlackAxios } from "../config"
import { LoginInterface } from '../../data/auth';

/* eslint-disable */
export default {
    routes: {
        login: "auth/login",
        googleLogin: "auth/login-with-google",
        googleSignup: "auth/register-with-google",
        register: "auth/signup/",
        forgotten: "auth/forgot-password",
        reset: "auth/reset-password",
        resendToken: "auth/resend-verification",
        verify: "auth/verify-account",
    },

    //   login method
    login: async function (args: LoginInterface) {
        return BlackAxios
            .post(this.routes.login, args)
    },
    loginWithGoogle: async function (args: any) {
        return BlackAxios
            .post(this.routes.googleLogin, args)
    },
    registerWithGoogle: async function (args: any) {
        return BlackAxios
            .post(this.routes.googleSignup, args)
    },
    signup: async function (args: any) {
        return BlackAxios
            .post(this.routes.register, args)
    },
    forgotPassword: async function (args: any) {
        return BlackAxios
            .post(this.routes.forgotten, args)
    },
    resetPassword: async function (args: any) {
        return BlackAxios
            .post(this.routes.reset, args)
    },
    resendToken: async function (args: any) {
        return BlackAxios
            .post(this.routes.resendToken, args)
    },
    verifyAccount: async function (args: any) {
        return BlackAxios
            .post(this.routes.verify, args)
    },
};
