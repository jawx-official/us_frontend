import { create } from "zustand";
import { IGeneralStore } from "@/data/general.interface";
import general from "@/apis/general";

export const useGeneralStore = create<IGeneralStore>(
    (set, get) => ({
        artists: [],
        currentPage: 1,
        totalPages: 1,

    }),
);
