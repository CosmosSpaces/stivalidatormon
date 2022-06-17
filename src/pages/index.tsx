import React, { useEffect, useState } from 'react';

import { GetStaticProps } from 'next';
import Link from 'next/link';

import Card from '../components/card';
import { getChains } from '../lib/fs';
import {
  blockByHeight,
  getLatestBlock,
  getSlashingInfo,
  getValidatorByAddress,
  // validatorsByChain,
} from '../lib/query';
import { consensusPubkeyToHexAddress } from '../lib/util';
import { Block } from '../model/block';
import Chain from '../model/chain';
import SlashInfo from '../model/slashinfo';
import Validator from '../model/validator';
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
// const osmos: Chain = {
//   chain_name: 'osmosis',
//   api: [
//     'https://osmosis-api.polkachu.com',
//     'https://osmo.api.ping.pub',
//     'https://lcd-osmosis.blockapsis.com',
//   ],
//   rpc: [
//     'https://osmosis.validator.network:443',
//     'https://rpc-osmosis.blockapsis.com:443',
//   ],
//   snapshot_provider: '',
//   sdk_version: '0.44.5',
//   coin_type: '118',
//   min_tx_fee: '800',
//   addr_prefix: 'osmo',
//   logo: '/logos/osmosis.jpg',
//   assets: [
//     {
//       base: 'uosmo',
//       symbol: 'OSMO',
//       exponent: '6',
//       coingecko_id: 'osmosis',
//       logo: '/logos/osmosis.jpg',
//     },
//     {
//       base: 'uion',
//       symbol: 'ION',
//       exponent: '6',
//       coingecko_id: 'ion',
//       logo: '/logos/osmosis.jpg',
//     },
//     {
//       base: 'usomm',
//       symbol: 'SOMM',
//       exponent: '6',
//       coingecko_id: 'somm',
//       logo: '',
//     },
//   ],
// };
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

const initialState = [
  {
    operatorAddress: 'junovaloper1836fhsg6yqpu98vezfc7caakchqe8pvske7t8q',
    chain: juno,
  },
  {
    operatorAddress: 'comdexvaloper1ee63nuagkj5age25jhdytj6vawt89jqqxyw7ls',
    chain: cmdx,
  },
];

interface IndexProps {
  chains: Chain[];
}

interface ChainStateItem {
  chain: Chain;
  blocks: Block[];
}

type ValidatorTracking = {
  chain: Chain;
  validator: Validator;
  key: string;
}[];

const Index = () => {
  // page loads and we pull saved chains from local storage.
  // for now  we'll just use local state for this.
  // this will also hold the nested block state for each chain.
  const [chainState, setChainState] = useState<ChainStateItem[]>([]);
  const [validatorsToTrack, setValidatorsToTrack] =
    useState<ValidatorTracking>();
  const [missing, setMissing] = useState<SlashInfo[]>([]);
  const [init, setInit] = useState(false);

  useEffect(() => {
    // initialize state.
    const nextChainState: ChainStateItem[] = [
      {
        chain: cmdx,
        blocks: [],
      },
      // {
      //   chain: osmos,
      //   blocks: [],
      // },
      {
        chain: juno,
        blocks: [],
      },
    ];
    // fetch all chains blocks and then set state.
    async function fetchBlocks() {
      // const validators = await validatorsByChain(juno);
      // validators.result.forEach((x) => {
      //   console.log(x.description.moniker);
      //   console.log(x);
      //   console.log(consensusPubkeyToHexAddress(x.consensus_pubkey));
      // });

      // iterate over next chains and fetch blocks for each chain.
      nextChainState.forEach(async ({ chain }, index) => {
        const latestBlock = await getLatestBlock(chain);

        if (!latestBlock?.block) {
          return;
        }

        // now we have the latest block for each chain,
        // we need to get the previous 49 blocks for each chain.
        // we'll use the block height to get the previous blocks.
        for (
          let i = Number(latestBlock.block.last_commit?.height) - 1;
          i > Number(latestBlock.block.last_commit?.height) - 50;
          i -= 1
        ) {
          // eslint-disable-next-line no-await-in-loop
          const nextBlock = await blockByHeight(chain, i);
          nextChainState[index].blocks = [
            nextBlock.block,
            ...nextChainState[index].blocks,
          ];
        }
      });
    }
    async function fetchValidators() {
      const promise = initialState.map(async ({ operatorAddress, chain }) => {
        const { result: validator } = await getValidatorByAddress(
          operatorAddress,
          chain
        );
        const key = consensusPubkeyToHexAddress(validator.consensus_pubkey);
        return { chain, validator, key };
      });
      const next = await Promise.all(promise);
      setValidatorsToTrack(next);
    }
    fetchBlocks().then(async () => {
      await fetchValidators();
      setChainState(nextChainState);
    });
  }, []);

  useEffect(() => {
    async function getInfo() {
      if (validatorsToTrack) {
        const promise = validatorsToTrack.map(async ({ chain }) => {
          const res: { info: SlashInfo[] } = await getSlashingInfo(chain);
          let nextMissing: SlashInfo[] = [];
          if (res.info) {
            res.info.forEach((x: any) => {
              nextMissing = [...nextMissing, x];
            });
          }
          return nextMissing;
        });
        const next = await Promise.all(promise);
        setMissing(next.flat());
      }
      setInit(true);
    }
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validatorsToTrack?.length]);

  console.log('missing', missing);

  return (
    <Main>
      {/* <!-- Page header --> */}
      <div className="bg-purple-300 shadow">
        <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
            <div className="flex-1 min-w-0">
              {/* <!-- Profile --> */}
              <div className="flex items-center">
                <h1 className="ml-3 text-lg font-medium leading-7 text-cyan-400 sm:leading-9 sm:truncate">
                  By{' '}
                  <Link href="https://linktr.ee/CosmosTwitterSpaces">
                    <a className="text-cyan-400">Cosmos Spaces ☮️💜⚛️</a>
                  </Link>
                </h1>
              </div>
            </div>
            <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-500 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                Add Validator
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* <!-- Card --> */}

            {init && validatorsToTrack
              ? validatorsToTrack.map(({ validator, chain, key: address }) => {
                  const blocks = chainState.find(
                    (x) => x.chain.chain_name === chain.chain_name
                  )?.blocks;
                  // console.log(blocks);
                  return (
                    <Card
                      key={address}
                      chainName={chain.chain_name}
                      name={validator.description.moniker}
                      delegation={validator.delegator_shares.split('.0')[0]}
                      twentyFourHourChange={0.0111}
                      delegator_shares={validator.delegator_shares}
                      total={'0'}
                      rank={64}
                      version="0.0.1"
                      blocks={blocks}
                    />
                  );
                })
              : null}

            {/* <!-- More items... --> */}
          </div>
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
