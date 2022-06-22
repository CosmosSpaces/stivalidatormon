import { useEffect, useState } from 'react';

import StorageItem from '../model/storageitem';

const KEY = 'cs:validators';

const initialState: StorageItem[] = [
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

const save = (validators: StorageItem[]) => {
  window.localStorage.setItem(KEY, JSON.stringify(validators));
};

const download = () => {
  const cache = window.localStorage.getItem(KEY);
  let parsed: StorageItem[] = [];
  if (cache) {
    parsed = JSON.parse(cache);
  } else {
    parsed = initialState;
  }
  return parsed;
};

const useLocalValidators = () => {
  const [validators, setValidators] = useState<StorageItem[] | undefined>(
    undefined
  );
  useEffect(() => {
    setValidators(download());
  }, []);
  return {
    save,
    validators,
  };
};

export default useLocalValidators;
