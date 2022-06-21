import create from 'zustand';

import ValidatorState from '../model/validatorstate';

interface ValidatorStore {
  validators: ValidatorState[] | undefined;
  setValidators: (validators: ValidatorState[]) => void;
}
const useValidators = create<ValidatorStore>((set) => ({
  validators: undefined,
  setValidators: (validators: ValidatorState[]) => {
    set((state) => ({
      ...state.validators,
      validators,
    }));
  },
}));

export default useValidators;
