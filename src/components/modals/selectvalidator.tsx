import { useEffect, useState } from 'react';

import { validatorsByChain } from '../../lib/query';
import { useLocalValidators } from '../../lib/storage';
import { consensusPubkeyToHexAddress } from '../../lib/util';
import StorageItem from '../../model/storageitem';
import Validator from '../../model/validator';
import useModals from '../../stores/usemodals';
import useSelectedChain from '../../stores/useselectedchain';
import useValidators from '../../stores/usevalidators';
import { Modal } from '../modal';

export const ID = 'select-validator';

const SelectValidator = (props: { id: string }) => {
  const { deactivate } = useModals();
  const { chain } = useSelectedChain();
  const validatorStore = useValidators();
  const { save, validators: localValidators } = useLocalValidators();
  const [validators, setValidators] = useState<Validator[]>();
  const [selectedValidator, setSelectedValidator] = useState<Validator>();
  const [selectedValidatorOpen, setSelectedChainOpen] =
    useState<boolean>(false);

  const close = () => deactivate(props.id);
  const titleId = `${props.id}-title`;

  const getValidators = async () => {
    if (!chain) return;
    const v = await validatorsByChain(chain);
    setValidators(v.result);
  };

  useEffect(() => {
    getValidators();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      id={props.id}
      aria-labelledby={titleId}
      onClick={() => {
        if (selectedValidatorOpen) {
          setSelectedChainOpen(false);
        }
      }}
    >
      <Modal.Window className="h-3/6 w-5/6 md:w-4/12">
        <div className="relative h-max">
          <div className="absolute top-3 bottom-0 right-4 z-50">
            <Modal.CloseIcon
              className="sticky top-1 right-1"
              onClose={() => deactivate(props.id)}
            />
          </div>
          <Modal.Header title="Add Validator" titleId={titleId} />
          <div className="mt-8  mb-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="py-8 px-4 sm:px-10">
              <form
                className="space-y-6"
                action="#"
                method="GET"
                onSubmit={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  if (validatorStore && validatorStore.validators) {
                    if (
                      validatorStore.validators.filter(
                        ({ validator: { operator_address } }) =>
                          operator_address ===
                            selectedValidator?.operator_address ?? ''
                      ).length > 0
                    ) {
                      deactivate(props.id);
                    } else if (selectedValidator && chain) {
                      const key = consensusPubkeyToHexAddress(
                        selectedValidator.consensus_pubkey
                      );
                      const nextValidators = [
                        ...validatorStore.validators,
                        {
                          chain,
                          validator: selectedValidator,
                          key,
                        },
                      ];

                      validatorStore.setValidators(nextValidators);
                      const nextCache: StorageItem[] = [
                        ...(localValidators ?? []),
                        {
                          operatorAddress: selectedValidator.operator_address,
                          chainName: chain.chain_name,
                        },
                      ];
                      save(nextCache);
                      deactivate(props.id);
                    }
                  }
                }}
              >
                <div>
                  <label
                    id="listbox-label"
                    className="block text-sm font-medium text-white"
                  >
                    {' '}
                    Validator{' '}
                  </label>
                  <div className="mt-1 relative">
                    <button
                      type="button"
                      className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      aria-haspopup="listbox"
                      aria-expanded="true"
                      aria-labelledby="listbox-label"
                      onClick={() => {
                        setSelectedChainOpen(!selectedValidatorOpen);
                      }}
                    >
                      <span className="flex items-center">
                        <span className="block truncate">
                          {selectedValidator?.description.moniker ??
                            'Select a validator'}
                        </span>
                      </span>
                      <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </button>
                    <ul
                      className={`${
                        selectedValidatorOpen ? 'absolute' : 'hidden'
                      } z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm`}
                      tabIndex={-1}
                      role="listbox"
                      aria-labelledby="listbox-label"
                      aria-activedescendant="listbox-option-3"
                    >
                      {validators?.map((validator) => {
                        const isSelected =
                          selectedValidator &&
                          selectedValidator.operator_address ===
                            validator.operator_address;
                        return (
                          <li
                            className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
                            key={validator.operator_address}
                            role="option"
                            aria-selected={true}
                            onClick={() => {
                              setSelectedValidator(validator);
                            }}
                          >
                            <div className="flex items-center">
                              <span className="font-normal block truncate">
                                {validator.description.moniker}{' '}
                              </span>
                            </div>
                            <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                              {isSelected && (
                                <svg
                                  className="h-5 w-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={
                      typeof validators === 'undefined' ||
                      (Array.isArray(validators) && validators.length === 0)
                    }
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal.Window>
      <Modal.Mask onClose={close} />
    </Modal>
  );
};

export default SelectValidator;
