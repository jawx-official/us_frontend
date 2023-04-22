import { ApplicationReview } from "@/data/admin.store";
import { BlackAxios, UploadAxios } from "../config"

/* eslint-disable */
export default {
    routes: {
        me: "users/me",
    },

    updateMyAccount: async function (args: any) {
        return BlackAxios
            .put(this.routes.me, { update: args })
    },
    fetchMyAccount: async function (args: any) {
        return BlackAxios
            .get(this.routes.me)
    },
};
