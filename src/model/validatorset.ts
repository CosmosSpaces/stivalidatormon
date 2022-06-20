interface Pagination {
  next_key: null | string;
  total: string;
}
interface PubKey {
  '@type': string;
  key: string;
}
export default interface ValidatorSet {
  address: string;
  proposer_priority: string;
  pub_key: PubKey;
  voting_power: string;
}
export interface ValidatorSetResponse {
  block_height: string;
  pagination: Pagination;
  validators: ValidatorSet[];
}
