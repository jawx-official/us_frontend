
export interface PortfolioInterface {
    _id: string;
    account: string;
    gallery: MediaInterface[];
    embeddedMedia: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface MediaInterface {
    _id: string;
    url: string;
    aws_id: string;
    file_type: string;
    createdAt?: Date;
    updatedAt?: Date;
}
