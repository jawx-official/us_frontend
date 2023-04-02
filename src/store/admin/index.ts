import { create } from "zustand";
import admin from "@/apis/admin";
import { IAdminStore } from "@/data/admin.store";

export const useAdminStore = create<IAdminStore>(
    (set, get) => ({
        approvals: [],
        currentPage: 1,
        totalPages: 1,
        loadArtistApprovals: async (page, limit) => {
            const { data: { code, data } } = await admin.approvals(`?page=${page || 1}&limit=${limit || 10}`)
            if (code === 200) set({ approvals: data.approvals, currentPage: data.currentPage, totalPages: data.totalPages });
        },
        loadArtistApplication: async (id) => {
            const { data: { code, data } } = await admin.applicationDetails(id)
            if (code === 200) set({ application: data });
        },
        submitArtistReview: async (payload) => {
            const { data: { code, data } } = await admin.reviewApplication(payload)
            if (code === 200) {
                set({ application: data })
                if (payload.review.reviewType === "approve") {
                    window.location.href = '/admin/dashboard'
                }
            }
        }
    }),
);
