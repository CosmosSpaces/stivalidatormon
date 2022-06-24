import React, { ReactNode } from 'react';

import CosmosSpacesAd from '../components/cosmosspacesad';
import { Button } from '../components/elements';
import MobileMenu from '../components/mobilemenu';
import MobileMenuBtn from '../components/mobilemenubtn';
import { ID as ADD_VALIDATOR } from '../components/modals/addvalidator';
import Sidebar from '../components/sidebar';
import { useLocalValidators } from '../lib/storage';
import StorageItem from '../model/storageitem';
import useModals from '../stores/usemodals';
import useUpdating from '../stores/useupdating';
import useValidatorEdit from '../stores/usevalidatoredit';
import useValidators from '../stores/usevalidators';

const Main = (props: { children: ReactNode }) => {
  const { activate } = useModals();
  const { selected, reset } = useValidatorEdit();
  const { save, validators } = useLocalValidators();
  const validatorStore = useValidators();
  const { setIsUpdating } = useUpdating();
  return (
    <div className="min-h-full">
      {/* <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. --> */}
      <MobileMenu />

      {/* <!-- Static sidebar for desktop --> */}
      <Sidebar />

      <div className="lg:pl-64 flex flex-col flex-1">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-purple-300 border-b border-gray-200 lg:border-none">
          {/* <!-- Search bar --> */}
          <MobileMenuBtn />
          {Array.isArray(selected) && selected.length > 0 && (
            <div className="flex-1 flex">
              <div className="ml-4 flex items-center md:ml-6">
                <Button
                  type="button"
                  className="flex items-center"
                  onClick={() => {
                    const addresses: string[] = selected.map(
                      ({ operatorAddress }) => operatorAddress
                    );
                    const nextValidators =
                      validatorStore.validators?.filter(
                        ({ validator: { operator_address } }) =>
                          !addresses.includes(operator_address)
                      ) ?? [];
                    validatorStore.setValidators(nextValidators);
                    const nextCache: StorageItem[] =
                      validators?.filter(
                        ({ operatorAddress }) =>
                          !addresses.includes(operatorAddress)
                      ) ?? [];
                    save(nextCache);
                    reset();
                    setTimeout(() => {
                      setIsUpdating(true);
                    }, 500);
                  }}
                >
                  <span className="material-icons">delete</span>
                  Remove <span className="sr-only">selected cards</span>
                </Button>
              </div>
            </div>
          )}
          <div className="flex-1 px-4 flex justify-end sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="ml-4 flex items-center md:ml-6">
              {/* <!-- Profile dropdown --> */}
              <div className="ml-3 relative">
                <Button type="button" onClick={() => activate(ADD_VALIDATOR)}>
                  Add Validator
                </Button>
              </div>
            </div>
          </div>
        </div>
        <main className="flex-1 pb-8 bg-purple-100">
          {props.children}
          <div className="mt-8">
            <CosmosSpacesAd />
          </div>
        </main>
      </div>
    </div>
  );
};

export { Main };
