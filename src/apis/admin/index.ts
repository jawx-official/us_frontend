import { ReviewApplicationPayload } from "@/data/admin.store";
import { BlackAxios } from "../config"

/* eslint-disable */
export default {
    routes: {
        approvals: "admin/approvals/",
    },

    approvals: async function (args?: string) {
        return BlackAxios
            .get(this.routes.approvals + args)
    },
    applicationDetails: async function (args: string) {
        return BlackAxios
            .get(this.routes.approvals + args)
    },

    reviewApplication: async function (args: ReviewApplicationPayload) {
        return BlackAxios
            .put(this.routes.approvals + args.artistId, { review: args.review })
    },
};
