import { useQuery } from 'react-query';

import { BlockResponse } from '../model/block';
import Chain from '../model/chain';
import Result from '../model/result';
import Validator from '../model/validator';

const VALIDATOR_ENDPOINT = '/staking/validators';
const BLOCK_ENDPOINT = '/blocks';
const SLASHING_ENDPOINT =
  '/cosmos/slashing/v1beta1/signing_infos?pagination.limit=500';

export const validatorsByChain = async (
  chain: Chain
): Promise<Result<Validator>> => {
  const request = await fetch(
    `${
      Array.isArray(chain.api) ? chain.api[0] : chain.api
    }${VALIDATOR_ENDPOINT}`
  );
  const response: Result<Validator> = await request.json();
  return response;
};

/**
 * Get Validator By Address
 * @param {string} address 32 bit address for the validator
 * @param {Chain}  chain   current block chain.
 * @returns {Promise<Validator>}
 */
export const getValidatorByAddress = async (
  operator_address: string,
  chain: Chain
) => {
  const request = await fetch(
    `${
      Array.isArray(chain.api) ? chain.api[0] : chain.api
    }${VALIDATOR_ENDPOINT}/${operator_address}`
  );
  const response: { result: Validator } = await request.json();
  return response;
};

export const useValidatorsByChain = (chain: Chain) => {
  return useQuery(
    ['validators', chain.chain_name],
    async () => validatorsByChain(chain),
    {
      enabled: false,
    }
  );
};

/**
 * Get Latest Block by Chain
 * @param {Chain} chain current block chain.
 * @returns {Promise<BlockResponse>}
 */
export const getLatestBlock = async (chain: Chain): Promise<BlockResponse> => {
  const request = await fetch(
    `${
      Array.isArray(chain.api) ? chain.api[0] : chain.api
    }${BLOCK_ENDPOINT}/latest?${new Date().getTime()}`
  );
  const response: BlockResponse = await request.json();
  return response;
};

export const blockByHeight = async (
  chain: Chain,
  height: number
): Promise<BlockResponse> => {
  const request = await fetch(
    `${Array.isArray(chain.api) ? chain.api[0] : chain.api}${BLOCK_ENDPOINT}/${
      height > 0 ? height : 0
    }`
  );
  const response: BlockResponse = await request.json();
  return response;
};

export const useBlockByHeight = (chain: Chain, height: number) => {
  return useQuery(
    ['block', chain.chain_name, height],
    async () => blockByHeight(chain, height),
    {
      enabled: false,
    }
  );
};

export const getSlashingInfo = async (chain: Chain) => {
  const request = await fetch(
    `${Array.isArray(chain.api) ? chain.api[0] : chain.api}${SLASHING_ENDPOINT}`
  );
  const response = await request.json();
  return response;
};
