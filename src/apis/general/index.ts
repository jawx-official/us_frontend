import { ReviewApplicationPayload } from "@/data/admin.store";
import { BlackAxios } from "../config"

/* eslint-disable */
export default {
    routes: {
        artists: "general/artists/",
    },

    artists: async function (args?: string) {
        return BlackAxios
            .get(this.routes.artists + args)
    },
    singleArtist: async function (args: string) {
        return BlackAxios
            .get(this.routes.artists + args)
    },
};
