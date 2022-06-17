export interface BlockResponse {
  block_id: BlockID;
  block: Block;
}

export interface Block {
  header: Header;
  data: Data;
  evidence: Evidence;
  last_commit?: LastCommit;
}

export interface Data {
  txs: string[];
}

export interface Evidence {
  evidence: any[];
}

export interface Header {
  version: Version;
  chain_id: string;
  height: string;
  time: Date;
  last_block_id: BlockID;
  last_commit_hash: string;
  data_hash: string;
  validators_hash: string;
  next_validators_hash: string;
  consensus_hash: string;
  app_hash: string;
  last_results_hash: string;
  evidence_hash: string;
  proposer_address: string;
}

export interface BlockID {
  hash: string;
  parts: Parts;
}

export interface Parts {
  total: number;
  hash: string;
}

export interface Version {
  block: string;
  app: string;
}

export interface LastCommit {
  height: string;
  round: number;
  block_id: BlockID;
  signatures: Signature[];
}

export interface Signature {
  block_id_flag: number;
  validator_address: string;
  timestamp: Date;
  signature: null | string;
}
