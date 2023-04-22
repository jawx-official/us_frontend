import { User } from "./auth"

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


export interface generalStore {
    progress?: boolean;
    totalPages: number;
    currentPage: number;
}


export interface IGeneralStore extends generalStore {

}