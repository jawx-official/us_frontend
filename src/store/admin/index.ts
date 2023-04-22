import { create } from "zustand";
import admin from "@/apis/admin";
import { IAdminStore } from "@/data/admin.store";

export const useAdminStore = create<IAdminStore>(
    (set, get) => ({
        currentPage: 1,
        totalPages: 1,
    }),
);
