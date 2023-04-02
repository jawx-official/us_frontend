import { ApplicationReview } from "@/data/admin.store";
import { BlackAxios, UploadAxios } from "../config"

/* eslint-disable */
export default {
    routes: {
        me: "users/me",
        reply: "users/reviews/reply"
    },

    updateMyAccount: async function (args: any) {
        return BlackAxios
            .put(this.routes.me, { update: args })
    },
    fetchMyAccount: async function (args: any) {
        return BlackAxios
            .get(this.routes.me)
    },

    updateMyAvailability: async function (args: any) {
        return BlackAxios
            .put(this.routes.me + '/availability', { update: args })
    },

    updateMyPortfolio: async function (args: any) {
        return UploadAxios
            .put(this.routes.me + '/portfolio', args)
    },
    fetchMyPortfolio: async function () {
        return BlackAxios
            .get(this.routes.me + '/portfolio',)
    },
    deletePortfolioMedia: async function (mediaId: string) {
        return BlackAxios
            .delete(this.routes.me + '/portfolio/media/' + mediaId,)
    },
    fetchMyAvailability: async function () {
        return BlackAxios
            .get(this.routes.me + '/availability',)
    },

    replyApplicationReview: async function (args: ApplicationReview) {
        return BlackAxios
            .put(this.routes.reply, { review: args })
    },
};
