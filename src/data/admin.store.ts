import { User } from "./auth"
import { PortfolioInterface } from "./portfolio";


export interface AvailableSlots {
    id: string;
    title: string;
    start: Date;
    end: Date;
}

export interface BookedSlots {
    id: string;
    title: string;
    start: Date;
    end: Date;
    partner: User;
}

export interface CalendarInterface {
    _id: string;
    account: User;
    available: AvailableSlots[];
    booked: BookedSlots[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ArtistApplication {
    artist: User | null;
    portfolio: PortfolioInterface | null;
    availability: CalendarInterface | null;
}

export interface adminStore {
    application?: ArtistApplication;
    approvals: User[];
    totalPages: number;
    currentPage: number;
}

export interface ReviewApplicationPayload {
    artistId: string;
    review: ApplicationReview;
}


export interface ApplicationReview {
    comment: string;
    reviewType: string;
    lastReviewed: string;
}

export interface IAdminStore extends adminStore {
    loadArtistApprovals: (page?: number, limit?: number) => Promise<void>
    loadArtistApplication: (artistId: string) => Promise<void>
    submitArtistReview: (payload: ReviewApplicationPayload) => Promise<void>

}