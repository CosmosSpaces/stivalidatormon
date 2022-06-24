import React, { useEffect, useRef, useState } from 'react';

import { fromBech32, toHex } from '@cosmjs/encoding';
import { GetStaticProps } from 'next';
import BarLoader from 'react-spinners/BarLoader';
import PuffLoader from 'react-spinners/PuffLoader';

import Card from '../components/card';
import { ID as ADD_VALIDATOR } from '../components/modals/addvalidator';
import { getChains } from '../lib/fs';
import {
  blockByHeight,
  getLatestBlock,
  getSlashingInfo,
  getValidatorByAddress,
  getValidatorSets,
  validatorsByChain,
} from '../lib/query';
import { useLocalValidators, usePollingInterval } from '../lib/storage';
import { consensusPubkeyToHexAddress } from '../lib/util';
import { Block, BlockResponse } from '../model/block';
import Chain from '../model/chain';
import SlashInfo from '../model/slashinfo';
import StorageItem from '../model/storageitem';
import Validator from '../model/validator';
import ValidatorSet from '../model/validatorset';
import ValidatorState from '../model/validatorstate';
import useAllChains from '../stores/useallchains';
import useModals from '../stores/usemodals';
import useUpdating from '../stores/useupdating';
import useValidators from '../stores/usevalidators';
import { Main } from '../templates/main';

interface IndexProps {
  chains: Chain[];
}

interface ChainStateItem {
  chain: Chain;
  blocks: Block[];
  validators: Validator[];
}

const Index = (props: IndexProps) => {
  // local storage state.
  const { validators: localValidators } = useLocalValidators();
  const { pollingInterval } = usePollingInterval();
  // local state.
  const validatorStore = useValidators();
  const { activate } = useModals();
  const { isUpdating, setIsUpdating } = useUpdating();
  const allChainsRef = useRef(true);
  const allChainsStore = useAllChains();
  const [lastUpdateTimestamp, setLastUpdatedTimestamp] = useState<string>('-');
  const [loadingText, setLoadingText] = useState('Loading...');
  const [chainState, setChainState] = useState<ChainStateItem[]>([]);
  const [missing, setMissing] = useState<{ [key: string]: SlashInfo }>();
  const [validatorSets, setValidatorSets] = useState<{
    [key: string]: ValidatorSet[];
  }>();
  const [init, setInit] = useState(false);
  const [previousValidatorSets, setPreviousValidatorSets] = useState<{
    [key: string]: ValidatorSet[];
  }>();

  // methods.
  const fetchSlashInfo = async (a: ValidatorState[]) => {
    setLoadingText('Checking slash info...');
    const promise = a.map(async ({ chain }) => {
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
  };
  const fetchValidatorSets = async (b: ValidatorState[]) => {
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
    setLoadingText('Calculating Ranking...');
    let heightsByChainName: { [chainName: string]: number } = {};
    const chains = unique(b.map(({ chain }) => chain));
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
    return Promise.resolve();
  };
  const setBlocksByChain = async (c: ChainStateItem) => {
    const n: ChainStateItem = {
      ...c,
    };
    const latestBlock = await getLatestBlock(c.chain);
    const currentHeight = parseInt(latestBlock.block.header.height, 10);
    n.blocks = [latestBlock.block];
    // get latest 50 blocks.
    let blockPromises: Promise<BlockResponse>[] = [];
    for (let i = currentHeight - 1; i > currentHeight - 50; i -= 1) {
      blockPromises = [...blockPromises, blockByHeight(c.chain, i)];
    }
    const blockResponses: BlockResponse[] = await Promise.all(blockPromises);
    n.blocks = [...n.blocks, ...blockResponses.map(({ block }) => block)];
    return n;
  };
  const setValidatorsByChain = async (d: ChainStateItem) => {
    const n: ChainStateItem = {
      ...d,
    };
    const validatorsResult = await validatorsByChain(d.chain);
    n.validators = validatorsResult.result;
    // sorting validators by rank while we're at it.
    n.validators = n.validators.sort(
      (a, b) =>
        parseInt(b.delegator_shares, 10) - parseInt(a.delegator_shares, 10)
    );
    return n;
  };
  const fetchBlocks = async (e: ChainStateItem[]) => {
    let next: ChainStateItem[] = [];
    next = await Promise.all(e.map((csi) => setBlocksByChain(csi)));
    return next;
  };
  const fetchAllValidators = async (f: ChainStateItem[]) => {
    let next: ChainStateItem[] = [];
    next = await Promise.all(f.map((csi) => setValidatorsByChain(csi)));
    return next;
  };
  const fetchValidators = async (g: StorageItem[]) => {
    const promise = g.map(async ({ operatorAddress, chainName }) => {
      const chain = props.chains.find(
        ({ chain_name }) => chain_name === chainName
      );
      if (!chain) {
        return {
          key: '',
          validator: {} as Validator,
          chain: {} as Chain,
        };
      }

      const { result: validator } = await getValidatorByAddress(
        operatorAddress,
        chain
      );
      const key = consensusPubkeyToHexAddress(validator.consensus_pubkey);
      return { chain, validator, key };
    });
    const next = await Promise.all(promise);
    validatorStore.setValidators(next);
    return next;
  };
  const setup = async (h: StorageItem[]) => {
    let next: ChainStateItem[] = [];
    h.forEach((storageItem) => {
      const currentChain = props.chains.find(
        (chain) => chain.chain_name === storageItem.chainName
      );
      if (currentChain) {
        next = [
          ...next,
          {
            chain: currentChain,
            blocks: [],
            validators: [],
          },
        ];
      }
    });

    return Promise.resolve(next);
  };

  // side effects.
  useEffect(() => {
    if (localValidators && isUpdating) {
      setLoadingText('Fetching blocks...');
      setup(localValidators).then(async (cs) => {
        const chainStateWithBlocks = await fetchBlocks(cs);
        setLoadingText('Refreshing Validators...');
        const chainStateWithValidators = await fetchAllValidators(
          chainStateWithBlocks
        );
        setChainState(chainStateWithValidators);
        const validators = await fetchValidators(localValidators);
        await fetchSlashInfo(validators);
        await fetchValidatorSets(validators);
        // allow cards to display and stamp time.
        setInit(true);
        if (validators.length > 0) {
          setLastUpdatedTimestamp(new Date().toTimeString());
        }
        if (isUpdating) {
          setIsUpdating(false);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localValidators, isUpdating]);

  // Auto-refresh.
  useEffect(() => {
    let refreshTimer: NodeJS.Timer | undefined;
    let intervalTimeInMS = pollingInterval;
    if (intervalTimeInMS < 30000) {
      const s = intervalTimeInMS;
      intervalTimeInMS = 30000;
      // eslint-disable-next-line no-console
      console.warn(`Polling Interval ${s} is too short. Using 30000 instead.`);
    }
    if (refreshTimer) {
      refreshTimer = undefined;
    }
    if (init && localValidators && localValidators.length > 0) {
      refreshTimer = setInterval(() => {
        setIsUpdating(true);
      }, intervalTimeInMS);
    }
    return () => {
      if (refreshTimer) {
        clearInterval(refreshTimer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init, pollingInterval]);

  useEffect(() => {
    if (
      typeof allChainsStore.setAllChains === 'function' &&
      allChainsRef.current === true
    ) {
      allChainsStore.setAllChains(props.chains);
      allChainsRef.current = false;
    }
    return () => {
      setIsUpdating(true);
    };
  }, [allChainsStore, props.chains, setIsUpdating]);

  return (
    <Main>
      {/* <!-- Page header --> */}
      <div className="bg-purple-300 shadow">
        <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200 w-full">
            <div className="text-white flex items-center">
              <p>
                last updated: {isUpdating && init ? null : lastUpdateTimestamp}
              </p>
              {isUpdating && init ? (
                <PuffLoader color="#22d3ee" size={25} />
              ) : null}
            </div>
            <p className="text-xs text-gray-600">
              v{process.env.NEXT_PUBLIC_APP_VERSION}beta
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {!init ? (
            <div className="h-96 w-full flex flex-col items-center justify-center">
              <p className="text-white text-md mb-4">{loadingText}</p>
              <BarLoader color="#231d4b" height={10} width={200} />
            </div>
          ) : null}
          {init &&
            validatorStore.validators &&
            validatorStore.validators.length === 0 && (
              <button
                type="button"
                className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                style={{ minHeight: '400px' }}
                onClick={() => activate(ADD_VALIDATOR)}
              >
                <span
                  className="material-icons mx-auto text-white"
                  style={{ fontSize: '50px' }}
                >
                  bolt
                </span>
                <span className="mt-2 block text-sm font-medium text-white">
                  Add a new validator
                </span>
              </button>
            )}
          {init &&
          validatorStore.validators &&
          validatorStore.validators.length > 0 ? (
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {validatorStore.validators.map(
                ({ validator, chain, key: address }) => {
                  const blocks = chainState?.find(
                    (x) => x.chain.chain_name === chain.chain_name
                  )?.blocks;
                  let count: string = '0';

                  const check = missing
                    ? Object.keys(missing).find((key) => key === address)
                    : '';

                  if (check && missing) {
                    count = missing[check].missed_blocks_counter;
                  }

                  const vbc = chainState?.find(
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
                      operatorAddress={validator.operator_address}
                      chain={chain}
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
