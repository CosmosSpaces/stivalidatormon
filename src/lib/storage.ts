import { useEffect, useRef } from 'react';

import create from 'zustand';

import StorageItem from '../model/storageitem';

const VALIDATORS_KEY = 'cs:validators';
const POLLING_KEY = 'cs:polling-interval';

const initialStorageItems: StorageItem[] = [
  {
    operatorAddress: 'junovaloper1836fhsg6yqpu98vezfc7caakchqe8pvske7t8q',
    chainName: 'juno',
  },
  {
    operatorAddress: 'comdexvaloper1ee63nuagkj5age25jhdytj6vawt89jqqxyw7ls',
    chainName: 'comdex',
  },
  {
    operatorAddress: 'osmovaloper1t48236ajss9wswamwll4nj7up2gqdns52gvyaa',
    chainName: 'osmosis',
  },
  {
    operatorAddress: 'digvaloper155yeaaum5la2p3mkhrn9nwtx7kyvn39xwlm94u',
    chainName: 'dig',
  },
  {
    operatorAddress: 'evmosvaloper17z0xyw6vwjn6gqj86s3axs7mjsngdl6sncdwga',
    chainName: 'evmos',
  },
  {
    operatorAddress: 'cosmosvaloper13p5ckpmc9g2v8ez5qsxs00wadqvcc7q0qheh26',
    chainName: 'cosmos',
  },
  {
    operatorAddress: 'junovaloper1dru5985k4n5q369rxeqfdsjl8ezutch8mc6nx9',
    chainName: 'juno',
  },
  {
    operatorAddress: 'osmovaloper1hjct6q7npsspsg3dgvzk3sdf89spmlpf6t4agt',
    chainName: 'osmosis',
  },
  {
    operatorAddress: 'agoricvaloper1upz9xpay0qx0vqealgr69ejtpzj5gskla5v0d9',
    chainName: 'agoric',
  },
  {
    operatorAddress: 'comdexvaloper17f70yjkvmvld379904jaddx9h0f74n32pjtmp6',
    chainName: 'comdex',
  },
  {
    operatorAddress: 'digvaloper18yvd0x0xr3xu43qdk0ldlmzpufzrtzzxfrpjhc',
    chainName: 'dig',
  },
  {
    operatorAddress: 'junovaloper193xl2tqh2tjkld2zv49ku5s44ee4qmgr65jcep',
    chainName: 'juno',
  },
];
const initialInterval: number = 30000;

const save = <T>(key: string, value: T) => {
  const parsed = typeof value === 'string' ? value : JSON.stringify(value);
  window.localStorage.setItem(key, parsed);
  return value;
};

const download = <T>(key: string, defaultValue: T, parse = true) => {
  const cache = window.localStorage.getItem(key);
  let parsed: T;
  if (cache) {
    parsed = parse ? JSON.parse(cache) : cache; // allow strings to bypass parsing.
  } else {
    parsed = defaultValue;
  }
  return parsed;
};
interface UseLocalValidators {
  validators: StorageItem[] | undefined;
  setValidators: (validators: StorageItem[]) => void;
}
const useLocalValidatorsState = create<UseLocalValidators>((set) => ({
  validators: undefined,
  setValidators: (validators) => {
    set((state) => ({
      ...state,
      validators: save<StorageItem[]>(VALIDATORS_KEY, validators),
    }));
  },
}));
export const useLocalValidators = () => {
  const { validators, setValidators } = useLocalValidatorsState();
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current === true && typeof setValidators === 'function') {
      setValidators(download(VALIDATORS_KEY, initialStorageItems));
      firstUpdate.current = false;
    }
  }, [setValidators]);
  return {
    save: setValidators,
    validators,
  };
};
interface UsePollingInterval {
  pollingInterval: number;
  setPollingInterval: (interval: number) => void;
}
export const usePollingIntervalState = create<UsePollingInterval>((set) => ({
  pollingInterval: 0,
  setPollingInterval: (interval) => {
    set((state) => ({
      ...state,
      pollingInterval: save(POLLING_KEY, interval),
    }));
  },
}));
export const usePollingInterval = () => {
  const { pollingInterval, setPollingInterval } = usePollingIntervalState();
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (
      firstUpdate.current === true &&
      typeof setPollingInterval === 'function'
    ) {
      setPollingInterval(download(POLLING_KEY, initialInterval));
      firstUpdate.current = false;
    }
  }, [setPollingInterval]);
  return {
    pollingInterval,
    setPollingInterval,
  };
};
