import create from 'zustand';

import Cosmos from '../model/cosmo';

export interface ValidatorEditStore {
  selected: Cosmos[] | undefined;
  setSelected: (cosmos: Cosmos) => void;
  removeSelected: (id: Cosmos['validatorAddress']) => void;
  reset: () => void;
}

const useValidatorEdit = create<ValidatorEditStore>((set) => ({
  selected: undefined,
  setSelected: (cosmosValidator: Cosmos) => {
    return set((state) => ({
      ...state,
      selected: [
        ...(state.selected?.filter(
          (c) => c.validatorAddress !== cosmosValidator.validatorAddress
        ) ?? []),
        cosmosValidator,
      ],
    }));
  },
  removeSelected: (validatorAddress) => {
    return set((state) => ({
      ...state,
      selected:
        state.selected?.filter(
          (c) => c.validatorAddress !== validatorAddress
        ) ?? [],
    }));
  },
  reset: () => set((state) => ({ ...state, selected: undefined })),
}));

export default useValidatorEdit;
