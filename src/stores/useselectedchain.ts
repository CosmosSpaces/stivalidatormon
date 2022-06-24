import create from 'zustand';

import Chain from '../model/chain';

interface UseSelectedChain {
  chain: Chain | undefined;
  setSelectedChain: (chain: Chain | undefined) => void;
}

const useSelectedChain = create<UseSelectedChain>((set) => ({
  chain: undefined,
  setSelectedChain: (chain) => set((state) => ({ ...state, chain })),
}));

export default useSelectedChain;
