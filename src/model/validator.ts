export default interface Validator {
  commission: Commission;
  consensus_pubkey: ConsensusPubkey;
  delegator_shares: string;
  description: Description;
  min_self_delegation: string;
  operator_address: string;
  status: number;
  tokens: string;
  unbonding_time: Date;
}

export interface Commission {
  commission_rates: CommissionRates;
  update_time: Date;
}

export interface CommissionRates {
  max_change_rate: string;
  max_rate: string;
  rate: string;
}

export interface ConsensusPubkey {
  type: string;
  value: string;
}

export interface Description {
  moniker: string;
  identity: string;
  website: string;
  details?: string;
}
