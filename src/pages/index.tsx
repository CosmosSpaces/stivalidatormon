import React, { useEffect, useState } from 'react';

import { fromBech32, toHex } from '@cosmjs/encoding';
import { GetStaticProps } from 'next';
import { BarLoader } from 'react-spinners';

import Card from '../components/card';
import { getChains } from '../lib/fs';
import {
  blockByHeight,
  getLatestBlock,
  getSlashingInfo,
  getValidatorByAddress,
  getValidatorSets,
  validatorsByChain,
  // validatorsByChain,
} from '../lib/query';
import { consensusPubkeyToHexAddress } from '../lib/util';
import { Block, BlockResponse } from '../model/block';
import Chain from '../model/chain';
import SlashInfo from '../model/slashinfo';
import Validator from '../model/validator';
import ValidatorSet from '../model/validatorset';
import useValidators from '../stores/usevalidators';
import { Main } from '../templates/main';

// temp adding chains here for mvp.
const cmdx: Chain = {
  chain_name: 'comdex',
  api: 'https://rest.comdex.one/',
  rpc: ['https://api.comdex.audit.one:443/rpc', 'https://rpc.comdex.one:443'],
  snapshot_provider: '',
  sdk_version: '0.44.3',
  coin_type: '118',
  min_tx_fee: '5000',
  addr_prefix: 'comdex',
  logo: '/logos/comdex.png',
  assets: [
    {
      base: 'ucmdx',
      symbol: 'CMDX',
      exponent: '6',
      coingecko_id: 'comdex',
      logo: '/logos/comdex.png',
    },
  ],
};
const osmos: Chain = {
  chain_name: 'osmosis',
  api: [
    'https://osmosis-api.polkachu.com',
    'https://osmo.api.ping.pub',
    'https://lcd-osmosis.blockapsis.com',
  ],
  rpc: [
    'https://osmosis.validator.network:443',
    'https://rpc-osmosis.blockapsis.com:443',
  ],
  snapshot_provider: '',
  sdk_version: '0.44.5',
  coin_type: '118',
  min_tx_fee: '800',
  addr_prefix: 'osmo',
  logo: '/logos/osmosis.jpg',
  assets: [
    {
      base: 'uosmo',
      symbol: 'OSMO',
      exponent: '6',
      coingecko_id: 'osmosis',
      logo: '/logos/osmosis.jpg',
    },
    {
      base: 'uion',
      symbol: 'ION',
      exponent: '6',
      coingecko_id: 'ion',
      logo: '/logos/osmosis.jpg',
    },
    {
      base: 'usomm',
      symbol: 'SOMM',
      exponent: '6',
      coingecko_id: 'somm',
      logo: '',
    },
  ],
};
const juno: Chain = {
  chain_name: 'juno',
  api: [
    'https://lcd-juno.itastakers.com',
    'https://juno-api.polkachu.com',
    'https://api-juno.nodes.guru',
  ],
  rpc: [
    'https://rpc-juno.itastakers.com:443',
    'https://rpc-juno.itastakers.com:443',
  ],
  snapshot_provider: '',
  sdk_version: '0.44.5',
  coin_type: '118',
  min_tx_fee: '3000',
  addr_prefix: 'juno',
  logo: '/logos/juno.jpg',
  assets: [
    {
      base: 'ujuno',
      symbol: 'JUNO',
      exponent: '6',
      coingecko_id: 'juno-network',
      logo: '/logos/juno.jpg',
    },
  ],
};
const cosmos: Chain = {
  chain_name: 'cosmos',
  api: 'https://cosmos.api.s16.ventures',
  rpc: [
    'https://cosmoshub.validator.network:443',
    'https://cosmos.rpc.s16.ventures',
  ],
  snapshot_provider:
    'd2008adf6d12f1a1951cce2b5ef531fbecb81895@cosmos.statesync.ping.pub:26656,27483c10217c542908a899024ed26ddfefeee9b9@cosmos.rpc.skystarcapital.xyz:26656',
  sdk_version: '0.44.3',
  coin_type: '118',
  min_tx_fee: '800',
  addr_prefix: 'cosmos',
  logo: '/logos/cosmos.svg',
  assets: [
    {
      base: 'uatom',
      symbol: 'ATOM',
      exponent: '6',
      coingecko_id: 'cosmos',
      logo: '/logos/cosmos.svg',
    },
  ],
};
const agoric: Chain = {
  chain_name: 'agoric',
  api: ['https://api.agoric.sgtstake.com', 'https://main.api.agoric.net'],
  rpc: ['https://main.rpc.agoric.net:443', 'https://main.rpc.agoric.net:443'],
  snapshot_provider: '',
  sdk_version: '0.41.3',
  coin_type: '564',
  min_tx_fee: '8000',
  assets: [
    {
      base: 'ubld',
      symbol: 'BLD',
      exponent: '6',
      coingecko_id: '',
      logo: '',
    },
    {
      base: 'urun',
      symbol: 'RUN',
      exponent: '6',
      coingecko_id: '',
      logo: '',
    },
  ],
  addr_prefix: 'agoric',
  logo: '/logos/agoric.png',
};
const dig: Chain = {
  chain_name: 'dig',
  api: 'https://api-1-dig.notional.ventures',
  rpc: [
    'https://rpc-1-dig.notional.ventures:443',
    'https://rpc-1-dig.notional.ventures:443',
  ],
  snapshot_provider: '',
  sdk_version: '0.44.5',
  coin_type: '118',
  min_tx_fee: '5000',
  addr_prefix: 'dig',
  logo: '/logos/dig1.png',
  assets: [
    {
      base: 'udig',
      symbol: 'DIG',
      exponent: '6',
      coingecko_id: 'dig-chain',
      logo: '/logos/dig1.png',
    },
  ],
};
const evmos: Chain = {
  chain_name: 'evmos',
  api: [
    'https://rest.bd.evmos.org:1317',
    'https://evmos-api.skynetvalidators.com',
  ],
  rpc: [
    'https://tendermint.bd.evmos.org:26657',
    'https://tendermint.bd.evmos.org:26657',
  ],
  snapshot_provider: '',
  sdk_version: '0.45.1',
  coin_type: '60',
  min_tx_fee: '3000000000000000',
  addr_prefix: 'evmos',
  logo: '/logos/evmos.jpeg',
  assets: [
    {
      base: 'aevmos',
      symbol: 'evmos',
      exponent: '18',
      coingecko_id: '',
      logo: '/logos/evmos.jpeg',
    },
  ],
};

const initialState = [
  {
    operatorAddress: 'junovaloper1836fhsg6yqpu98vezfc7caakchqe8pvske7t8q',
    chain: juno,
  },
  {
    operatorAddress: 'comdexvaloper1ee63nuagkj5age25jhdytj6vawt89jqqxyw7ls',
    chain: cmdx,
  },
  {
    operatorAddress: 'osmovaloper1t48236ajss9wswamwll4nj7up2gqdns52gvyaa',
    chain: osmos,
  },
  {
    operatorAddress: 'digvaloper155yeaaum5la2p3mkhrn9nwtx7kyvn39xwlm94u',
    chain: dig,
  },
  {
    operatorAddress: 'evmosvaloper17z0xyw6vwjn6gqj86s3axs7mjsngdl6sncdwga',
    chain: evmos,
  },
  {
    operatorAddress: 'cosmosvaloper13p5ckpmc9g2v8ez5qsxs00wadqvcc7q0qheh26',
    chain: cosmos,
  },
  {
    operatorAddress: 'junovaloper1dru5985k4n5q369rxeqfdsjl8ezutch8mc6nx9',
    chain: juno,
  },
  {
    operatorAddress: 'osmovaloper1hjct6q7npsspsg3dgvzk3sdf89spmlpf6t4agt',
    chain: osmos,
  },
  {
    operatorAddress: 'agoricvaloper1upz9xpay0qx0vqealgr69ejtpzj5gskla5v0d9',
    chain: agoric,
  },
  {
    operatorAddress: 'comdexvaloper17f70yjkvmvld379904jaddx9h0f74n32pjtmp6',
    chain: cmdx,
  },
  {
    operatorAddress: 'digvaloper18yvd0x0xr3xu43qdk0ldlmzpufzrtzzxfrpjhc',
    chain: dig,
  },
  {
    operatorAddress: 'junovaloper193xl2tqh2tjkld2zv49ku5s44ee4qmgr65jcep',
    chain: juno,
  },
];

// atom, nom.

interface IndexProps {
  chains: Chain[];
}

interface ChainStateItem {
  id: string;
  chain: Chain;
  blocks: Block[];
  validators: Validator[];
}

const defaultChainState: ChainStateItem[] = [
  {
    id: 'osmosis',
    chain: osmos,
    blocks: [],
    validators: [],
  },
  {
    id: 'juno',
    chain: juno,
    blocks: [],
    validators: [],
  },
  {
    id: 'cmdx',
    chain: cmdx,
    blocks: [],
    validators: [],
  },
  {
    id: 'cosmos',
    chain: cosmos,
    blocks: [],
    validators: [],
  },
  {
    id: 'agoric',
    chain: agoric,
    blocks: [],
    validators: [],
  },
  {
    id: 'dig',
    chain: dig,
    blocks: [],
    validators: [],
  },
  {
    id: 'evmos',
    chain: evmos,
    blocks: [],
    validators: [],
  },
];

const Index = () => {
  // local state.
  const validatorStore = useValidators();
  const [lastUpdateTimestamp, setLastUpdatedTimestamp] = useState<string>('-');
  const [loadingText, setLoadingText] = useState('Loading...');
  const [chainState, setChainState] =
    useState<ChainStateItem[]>(defaultChainState);
  const [missing, setMissing] = useState<{ [key: string]: SlashInfo }>();
  const [validatorSets, setValidatorSets] = useState<{
    [key: string]: ValidatorSet[];
  }>();
  const [init, setInit] = useState(false);
  const [previousValidatorSets, setPreviousValidatorSets] = useState<{
    [key: string]: ValidatorSet[];
  }>();

  // methods.
  const fetchSlashInfo = async () => {
    if (validatorStore.validators) {
      setLoadingText('Checking slash info...');
      const promise = validatorStore.validators.map(async ({ chain }) => {
        const res: { info: SlashInfo[] } = await getSlashingInfo(chain);
        let nextMissing: { [key: string]: SlashInfo } = {};
        if (res.info) {
          res.info.forEach((slashInfo: SlashInfo) => {
            if (slashInfo.address) {
              const address = toHex(
                fromBech32(slashInfo.address).data
              ).toUpperCase();
              nextMissing = {
                ...nextMissing,
                [address]: slashInfo,
              };
            }
          });
        }
        return nextMissing;
      });
      const next = await Promise.all(promise);
      let container: { [key: string]: SlashInfo } = {};
      next.forEach((n) => {
        container = {
          ...container,
          ...n,
        };
      });
      setMissing(container);
    }
  };
  const fetchValidatorSets = async () => {
    const uniqueIds: string[] = [];

    const unique = (arr: Chain[]) =>
      arr.filter((element) => {
        const isDuplicate = uniqueIds.includes(element.chain_name);
        if (!isDuplicate) {
          uniqueIds.push(element.chain_name);
          return true;
        }
        return false;
      });
    if (validatorStore.validators) {
      setLoadingText('Calculating Ranking...');
      let heightsByChainName: { [chainName: string]: number } = {};
      const chains = unique(
        validatorStore.validators.map(({ chain }) => chain)
      );
      const currentSetPromise = chains.map(async (chain) => {
        let total = 0;
        let height = 0;
        let fetched = 0;
        let validators: ValidatorSet[] = [];
        const vs = await getValidatorSets({
          chain,
        });
        if (vs.pagination.total) {
          total = parseInt(vs.pagination.total, 10);
          fetched = vs.validators.length;
          validators = vs.validators;
        }
        if (vs.block_height) {
          height = Number(vs.block_height);
        }
        if (height > 14400) {
          height -= 14400;
        } else {
          height = 1;
        }
        heightsByChainName = {
          ...heightsByChainName,
          [chain.chain_name]: height,
        };
        while (fetched < total) {
          const offset = fetched.toString();
          // eslint-disable-next-line no-await-in-loop
          const v = await getValidatorSets({ chain, offset });
          validators = [...validators, ...v.validators];
          fetched += v.validators.length;
        }
        const prev = validatorSets?.[chain.chain_name] ?? [];
        return { [chain.chain_name]: [...prev, ...validators] };
      });
      const update = await Promise.all(currentSetPromise);
      let nextValidatorSet: { [key: string]: ValidatorSet[] } = {};
      update.forEach((v) => {
        nextValidatorSet = {
          ...nextValidatorSet,
          ...v,
        };
      });
      setValidatorSets(nextValidatorSet);
      const previousSetPromise = chains.map(async (chain) => {
        let validators: ValidatorSet[] = [];
        let fetched = 0;
        let total = 0;
        const height = heightsByChainName[chain.chain_name];

        const previousSets = await getValidatorSets({ chain, height });
        if (previousSets.pagination?.total) {
          total = parseInt(previousSets.pagination.total, 10);
          fetched = previousSets.validators.length;
          validators = previousSets.validators;
        }
        while (fetched < total) {
          const offset = fetched.toString();
          // eslint-disable-next-line no-await-in-loop
          const v = await getValidatorSets({ offset, chain, height });
          validators = [...validators, ...v.validators];
          fetched += v.validators.length;
        }

        const prev = previousValidatorSets?.[chain.chain_name] ?? [];
        return { [chain.chain_name]: [...prev, ...validators] };
      });
      const update2 = await Promise.all(previousSetPromise);
      let previousValidatorSet: { [key: string]: ValidatorSet[] } = {};
      update2.forEach((v) => {
        previousValidatorSet = {
          ...previousValidatorSet,
          ...v,
        };
      });
      setPreviousValidatorSets(previousValidatorSet);
      setInit(true);
      setLastUpdatedTimestamp(new Date().toTimeString());
    }
  };
  const setBlocksByChain = async (chainStateItem: ChainStateItem) => {
    const n: ChainStateItem = {
      ...chainStateItem,
    };
    const latestBlock = await getLatestBlock(chainStateItem.chain);
    const currentHeight = parseInt(latestBlock.block.header.height, 10);
    n.blocks = [latestBlock.block];
    // get latest 50 blocks.
    let blockPromises: Promise<BlockResponse>[] = [];
    for (let i = currentHeight - 1; i > currentHeight - 50; i -= 1) {
      blockPromises = [
        ...blockPromises,
        blockByHeight(chainStateItem.chain, i),
      ];
    }
    const blockResponses: BlockResponse[] = await Promise.all(blockPromises);
    n.blocks = [...n.blocks, ...blockResponses.map(({ block }) => block)];
    return n;
  };
  const setValidatorsByChain = async (chainStateItem: ChainStateItem) => {
    const n: ChainStateItem = {
      ...chainStateItem,
    };
    const validatorsResult = await validatorsByChain(chainStateItem.chain);
    n.validators = validatorsResult.result;
    // sorting validators by rank while we're at it.
    n.validators = n.validators.sort(
      (a, b) =>
        parseInt(b.delegator_shares, 10) - parseInt(a.delegator_shares, 10)
    );
    return n;
  };
  const fetchBlocks = async () => {
    let next: ChainStateItem[] = [];
    next = await Promise.all(chainState.map((csi) => setBlocksByChain(csi)));
    setChainState(next);
    return next;
  };
  const fetchAllValidators = async (cs: ChainStateItem[]) => {
    let next: ChainStateItem[] = [];
    next = await Promise.all(cs.map((csi) => setValidatorsByChain(csi)));
    setChainState(next);
  };
  const fetchValidators = async () => {
    const promise = initialState.map(async ({ operatorAddress, chain }) => {
      const { result: validator } = await getValidatorByAddress(
        operatorAddress,
        chain
      );
      const key = consensusPubkeyToHexAddress(validator.consensus_pubkey);
      return { chain, validator, key };
    });
    const next = await Promise.all(promise);
    validatorStore.setValidators(next);
  };

  // side effects.
  useEffect(() => {
    setLoadingText('Fetching blocks...');
    fetchBlocks().then(async (cs) => {
      setLoadingText('Refreshing Validators...');
      await fetchAllValidators(cs);
      await fetchValidators();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // this will only work once the validators list is updated so it's tracked in a separate effect so we can wait until that moment.
  useEffect(() => {
    fetchSlashInfo();
    fetchValidatorSets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validatorStore.validators?.length]);

  return (
    <Main>
      {/* <!-- Page header --> */}
      <div className="bg-purple-300 shadow">
        <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200 w-full">
            <p className="text-white">last updated: {lastUpdateTimestamp}</p>
            <p className="text-xs text-gray-600">
              v{process.env.NEXT_PUBLIC_APP_VERSION}beta
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {!init ? (
            <div className="h-96 w-full flex flex-col items-center justify-center">
              <p className="text-white text-md mb-4">{loadingText}</p>
              <BarLoader color="#231d4b" height={10} width={200} />
            </div>
          ) : null}
          {init && validatorStore.validators ? (
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {validatorStore.validators.map(
                ({ validator, chain, key: address }) => {
                  const blocks = chainState.find(
                    (x) => x.chain.chain_name === chain.chain_name
                  )?.blocks;
                  let count: string = '0';

                  const check = missing
                    ? Object.keys(missing).find((key) => key === address)
                    : '';

                  if (check && missing) {
                    count = missing[check].missed_blocks_counter;
                  }

                  const vbc = chainState.find(
                    (x) => x.chain.chain_name === chain.chain_name
                  )?.validators;
                  const rank = vbc?.findIndex((v) => {
                    return v.operator_address === validator.operator_address;
                  });

                  let delegation = '-';
                  let twentyFourHourChange = 0;
                  let previousAddress = '';
                  const validatorSet = validatorSets?.[chain.chain_name];
                  const previousValidatorSet =
                    previousValidatorSets?.[chain.chain_name];

                  if (rank && validatorSet?.[rank]) {
                    delegation = parseInt(
                      validatorSet[rank].voting_power,
                      10
                    ).toLocaleString('en-US');
                    previousAddress = validatorSet[rank].address;
                  }

                  if (
                    rank &&
                    previousValidatorSet &&
                    previousAddress &&
                    validatorSet?.[rank]
                  ) {
                    const prev = previousValidatorSet.find(
                      ({ address: a }) => a === previousAddress
                    );
                    if (prev) {
                      twentyFourHourChange =
                        parseInt(validatorSet[rank].voting_power, 10) -
                        parseInt(prev.voting_power, 10);
                    }
                  }

                  return (
                    <Card
                      key={address}
                      chainName={chain.chain_name}
                      name={validator.description.moniker}
                      delegation={delegation}
                      twentyFourHourChange={twentyFourHourChange}
                      total={count || '0'}
                      rank={rank ? rank + 1 : 0}
                      blocks={blocks}
                      validatorAddress={address}
                    />
                  );
                }
              )}
            </div>
          ) : null}
        </div>
      </div>
    </Main>
  );
};

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const chains = await getChains();
  return {
    props: {
      chains,
    },
  };
};

export default Index;
