import create from 'zustand';

export interface ModalStore {
  modals: string[];
  activate: (id: string) => void;
  deactivate: (id: string) => void;
}

const useModals = create<ModalStore>((set) => ({
  modals: [],
  activate: (id: string) => {
    set((state) => ({
      ...state,
      modals: [...state.modals.filter((m) => m !== id), id],
    }));
  },
  deactivate: (id: string) => {
    set((state) => ({
      ...state,
      modals: state.modals.filter((m) => m !== id),
    }));
  },
}));

export default useModals;
