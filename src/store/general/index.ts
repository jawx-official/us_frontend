import { create } from "zustand";
import { IGeneralStore } from "@/data/general.interface";
import general from "@/apis/general";

export const useGeneralStore = create<IGeneralStore>(
    (set, get) => ({
        artists: [],
        currentPage: 1,
        totalPages: 1,
        loadArtists: async (page, limit) => {
            set({ progress: true })
            const { data: { code, data } } = await general.artists(`?page=${page || 1}&limit=${limit || 10}`)
            if (code === 200) set({ artists: data.artists, currentPage: data.currentPage, totalPages: data.totalPages, progress: false });
        },
        loadSingleArtist: async (id) => {
            set({ progress: true })
            const { data: { code, data } } = await general.singleArtist(id)
            if (code === 200) set({ artistInfo: data.artist, progress: false });
        },

    }),
);
