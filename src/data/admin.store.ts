import { User } from "./auth"
export interface adminStore {
    totalPages: number;
    currentPage: number;
}

export interface ApplicationReview {
    comment: string;
    reviewType: string;
    lastReviewed: string;
}

export interface IAdminStore extends adminStore {

}