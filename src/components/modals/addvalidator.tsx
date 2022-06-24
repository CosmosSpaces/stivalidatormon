import { useEffect, useRef, useState } from 'react';

import useAllChains from '../../stores/useallchains';
import useModals from '../../stores/usemodals';
import useSelectedChain from '../../stores/useselectedchain';
import { Modal } from '../modal';
import { ID as SELECT_VALIDATOR } from './selectvalidator';

export const ID = 'add-validator';

const AddValidator = (props: { id: string }) => {
  const { deactivate, activate } = useModals();
  const { chains } = useAllChains();
  const { chain: selectedChain, setSelectedChain } = useSelectedChain();
  const effectRef = useRef(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedChainOpen, setSelectedChainOpen] = useState<boolean>(false);
  const close = () => deactivate(props.id);
  const titleId = `${props.id}-title`;

  useEffect(() => {
    if (effectRef.current === true) {
      setSelectedChain(undefined);
      effectRef.current = false;
    }
  }, [setSelectedChain]);

  return (
    <Modal id={props.id} aria-labelledby={titleId}>
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
            <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    id="listbox-label"
                    className="block text-sm font-medium text-white"
                  >
                    {' '}
                    Cosmos Chain{' '}
                  </label>
                  <div className="mt-1 relative">
                    <button
                      type="button"
                      className={`relative w-full bg-white border ${
                        isError ? 'border-red-500 border-2' : 'border-gray-300'
                      } rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      aria-haspopup="listbox"
                      aria-expanded="true"
                      aria-labelledby="listbox-label"
                      onClick={() => {
                        setIsError(false);
                        setSelectedChainOpen(!selectedChainOpen);
                      }}
                    >
                      <span className="flex items-center">
                        {selectedChain && selectedChain?.logo && (
                          <img
                            src={selectedChain.logo}
                            alt={selectedChain.chain_name}
                            className="flex-shrink-0 h-6 w-6 rounded-full"
                          />
                        )}
                        <span className="ml-3 block truncate">
                          {selectedChain?.chain_name
                            .toUpperCase()
                            .replaceAll('-', ' ') ?? 'Select a chain'}
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
                    {isError ? (
                      <p className="text-red-500 text-xs font-semibold">
                        Please select a chain to continue
                      </p>
                    ) : null}
                    <ul
                      className={`${
                        selectedChainOpen ? 'absolute' : 'hidden'
                      } z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm`}
                      tabIndex={-1}
                      role="listbox"
                      aria-labelledby="listbox-label"
                      aria-activedescendant="listbox-option-3"
                    >
                      {chains?.map((chain) => {
                        const isSelected =
                          selectedChain &&
                          selectedChain.chain_name === chain.chain_name;
                        return (
                          <li
                            className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9"
                            key={chain.chain_name}
                            role="option"
                            aria-selected={true}
                            onClick={() => {
                              setSelectedChain(chain);
                              setSelectedChainOpen(false);
                            }}
                          >
                            <div className="flex items-center">
                              <img
                                src={chain.logo}
                                alt={`${chain.chain_name} logo`}
                                className="flex-shrink-0 h-6 w-6 rounded-full"
                              />
                              <span className="font-normal ml-3 block truncate">
                                {' '}
                                {chain.chain_name
                                  .toUpperCase()
                                  .replaceAll('-', ' ')}
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
                    type="button"
                    disabled={!selectedChain}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => {
                      if (selectedChain) {
                        activate(SELECT_VALIDATOR);
                        deactivate(props.id);
                      } else {
                        setIsError(true);
                      }
                    }}
                  >
                    Next
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

export default AddValidator;
