import { ApplicationReview } from "../admin.store";

export interface User {
    _id: string;
    name: string;
    confirmed?: boolean;
    email: string;
    password: string;
    referalCode?: string;
    accountStatus: string;
    review?: ApplicationReview;
    accountType: string;
    deleted: boolean;
    genres: string[];
    bio: string;
    setupComplete: boolean;
    online: boolean;
    country?: string;
    avatar?: string;
    avatarColor?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Access {
    accessToken: string
    expiresIn: number;
    granted: boolean;
}


export interface LoginInterface {
    email: string;
    password: string;
}

export interface ISignupInterface extends LoginInterface {
    name: string;
    country: string;
    accountType: string;
}


export interface authStore {
    access?: Access;
    user?: User;
    authProgress?: boolean;
    message?: string;
    error?: string;
}

export interface PartialUpdate {
    user: Partial<User>
}


export interface IAuthStore extends authStore {
    setUser: (payload: User) => void
    setAccess: (payload: Access) => void
    Login: (payload: LoginInterface) => Promise<void>
    loginGoogle: (role: string, cb?: (token: string) => void) => Promise<void>
    Signup: (payload: ISignupInterface) => Promise<void>
    logoutAccount: () => Promise<void>
    Verify: (payload: { token: string }) => Promise<void>
    finishRegister: (token: string, role: string, country: string) => Promise<void>
    forgotPassword: (payload: { email: string }) => Promise<void>
    resetPassword: (payload: { token: string, password: string }) => Promise<void>
}