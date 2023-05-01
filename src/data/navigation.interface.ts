import { ReactElement } from "react";

interface ChildItem {
    label: string;
    path: string;
}
export interface NavigationItems extends ChildItem {
    dropdown?: boolean;
    children?: ChildItem[]
}

export interface DrawerInterface {
    width?: string;
    isOpen: boolean;
    children: ReactElement;
    onClose: () => void
}