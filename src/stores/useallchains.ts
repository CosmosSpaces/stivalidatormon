import create from 'zustand';

import Chain from '../model/chain';

interface UseAllChains {
  chains: Chain[] | undefined;
  setAllChains: (chains: Chain[]) => void;
}

const useAllChains = create<UseAllChains>((set) => ({
  chains: undefined,
  setAllChains: (chains) => set((state) => ({ ...state, chains })),
}));

export default useAllChains;
