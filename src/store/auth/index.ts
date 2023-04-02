import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Access, IAuthStore, User } from '../../data/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import auth from "../../apis/auth";

import initFirebase from '../../firebase.config';
initFirebase();
const fireAuth = firebase.auth();

export const useAuthStore = create(
    persist<IAuthStore>(
        (set, get) => ({
            setUser: (obj) => set({ user: obj }),
            setAccess: (obj) => set({ access: obj }),
            Login: async (obj) => {
                const { data: { data, code, message } } = await auth.login(obj)
                if (code === 200) {
                    set({ message })
                    get().setUser(data.user);
                    get().setAccess({
                        accessToken: data.accessToken.token,
                        granted: true,
                        expiresIn: data.accessToken.expires
                    });
                    window.location.href = "/"
                } else {
                    set({ error: message })
                    throw new Error(message)
                }
            },

            forgotPassword: async (obj) => {
                const res = await auth.forgotPassword(obj)
                if (res.data.code === 103) {
                    set({ error: res.data.message })
                    throw new Error(res.data.message)
                } else {
                    set({ message: res.data.message })
                }

            },

            resetPassword: async (obj) => {
                const res = await auth.resetPassword(obj)
                if (res.data.code === 103) {
                    set({ error: res.data.message })
                    throw new Error(res.data.message)
                } else {
                    set({ message: res.data.message })
                }

            },

            Verify: async (obj) => {
                try {
                    const { data: { data, message, code } } = await auth.verifyAccount(obj)
                    if (code === 200) {
                        get().setUser(data.user);
                        set({ message })
                        get().setAccess({
                            accessToken: data.accessToken.token,
                            granted: true,
                            expiresIn: data.accessToken.expires
                        });
                        window.location.href = "/"
                    } else {
                        set({ error: message })
                    }

                } catch (error) {

                }
            },
            logoutAccount: async function () {
                set({
                    user: undefined,
                    access: undefined,
                    message: "Logged out successfully"
                })
            },
            loginGoogle: async (role, cb) => {
                const provider = new firebase.auth.GoogleAuthProvider()
                fireAuth.signInWithPopup(provider).then(async (e) => {
                    try {
                        const credential = e.credential as firebase.auth.OAuthCredential

                        if (role === 'login') {
                            const { data: { data, code, message } } = await auth.loginWithGoogle({ access_token: credential?.accessToken })
                            if (code === 200) {
                                get().setUser(data.user);
                                set({ message })
                                get().setAccess({
                                    accessToken: data.accessToken.token,
                                    granted: true,
                                    expiresIn: data.accessToken.expires
                                });
                                window.location.href = "/"
                            } else {
                                set({ error: message })
                            }
                        } else {
                            if (credential.accessToken && cb) {
                                cb(credential?.accessToken)
                            }

                        }
                    } catch (error) {

                    }
                }).catch(() => { });
            },
            finishRegister: async (token, role, country) => {
                const { data: { data, code, message } } = await auth.registerWithGoogle({ access_token: token, accountType: role, country })
                if (code === 200) {
                    get().setUser(data.user);
                    get().setAccess({
                        accessToken: data.accessToken.token,
                        granted: true,
                        expiresIn: data.accessToken.expires
                    });
                    set({ message })
                    window.location.href = "/"
                } else {
                    set({ error: message })
                    throw new Error(message)
                }
            },
            Signup: async (params) => {
                set({ authProgress: true })
                const { data: { code, message } } = await auth.signup(params)
                if (code === 200) {
                    set({ message })
                } else {
                    set({ error: message });
                    throw new Error(message)
                }
                set({ authProgress: false })
            }
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
