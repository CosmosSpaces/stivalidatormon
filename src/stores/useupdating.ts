import create from 'zustand';

interface UpdatingStatusStore {
  isUpdating: boolean;
  setIsUpdating: (nextUpdate: boolean) => void;
}

const useUpdating = create<UpdatingStatusStore>((set) => ({
  isUpdating: true,
  setIsUpdating: (next) => set((state) => ({ ...state, isUpdating: next })),
}));

export default useUpdating;
