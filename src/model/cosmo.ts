import { Block } from './block';
import Chain from './chain';

// this is an arbitrary data type to represent our saved data in local storage. This is the validators that someone has chosen to monitor.
export default interface Cosmos {
  delegation: string;
  twentyFourHourChange: number;
  total: string;
  rank: number;
  chainName: string;
  name: string;
  blocks?: Block[];
  validatorAddress: string;
  operatorAddress: string;
  chain: Chain;
}
