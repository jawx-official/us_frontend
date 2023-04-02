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

export interface Artist {
    artist: User | null;
    averageRating: number;
    latestReviews: Review[];
    portfolio: PortfolioInterface | null;
    availability: CalendarInterface | null;
}

export interface Review {
    _id: string;
    reviewedBy: User;
    createdAt?: Date;
    updatedAt?: Date;
    response_rate: number;
    professionalism: number;
    approachability: number;
    account: User;
    comment: string;
    rating: number;
}

export interface ArtistInfo {
    artist: User;
    averageRating: number;
    latestReviews: Review[];
    portfolio: PortfolioInterface;
}

export interface generalStore {
    artistInfo?: Artist;
    progress?: boolean;
    artists: ArtistInfo[];
    totalPages: number;
    currentPage: number;
}


export interface IGeneralStore extends generalStore {
    loadArtists: (page?: number, limit?: number) => Promise<void>
    loadSingleArtist: (id: string) => Promise<void>

}