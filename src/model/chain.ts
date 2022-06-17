export default interface Chain {
  chain_name: string;
  api: string | string[];
  rpc?: string | string[];
  snapshot_provider?: string;
  sdk_version?: string;
  coin_type?: string;
  min_tx_fee?: string;
  addr_prefix?: string;
  excludes?: string;
  logo?: string;
  assets?: ChainAsset[];
}

export interface ChainAsset {
  base: string;
  symbol: string;
  exponent: string;
  coingecko_id: string;
  logo: string;
}
