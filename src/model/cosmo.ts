import { Block } from './block';

// this is an arbitrary data type to represent our saved data in local storage. This is the validators that someone has chosen to monitor.
export default interface Cosmos {
  delegation: string;
  twentyFourHourChange: number;
  delegator_shares: string;
  total: string;
  rank: number;
  chainName: string;
  name: string;
  version: string;
  blocks?: Block[];
}
