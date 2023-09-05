import { Server } from '@prisma/client';
import {create} from 'zustand'

export type ModalType = 'createServer' | "invite" | "editServer" | "members" | "createChannel";

interface ModalData{
    server?:Server
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen:boolean;
    onOpen: (type: ModalType,data?:ModalData) => void;
    onClose: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen:(type,data={}) => set({type, isOpen: true,data}),
    onClose: () => set({type: null, isOpen: false})
}))