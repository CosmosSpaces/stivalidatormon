import { sha256 } from '@cosmjs/crypto';
import { fromBase64, fromHex, toHex, fromBech32 } from '@cosmjs/encoding';
import RIPEMD160 from 'ripemd160';

import { ConsensusPubkey } from '../model/validator';

export function consensusPubkeyToHexAddress(consensusPubkey: ConsensusPubkey) {
  let raw = null;
  if (typeof consensusPubkey === 'object') {
    if (consensusPubkey.type === 'tendermint/PubKeySecp256k1') {
      raw = new RIPEMD160()
        .update(Buffer.from(sha256(fromBase64(consensusPubkey.value))))
        .digest('hex')
        .toUpperCase();
      return raw;
    }
    raw = sha256(fromBase64(consensusPubkey.value));
  } else {
    raw = sha256(
      fromHex(
        toHex(fromBech32(consensusPubkey).data)
          .toUpperCase()
          .replace('1624DE6420', '')
      )
    );
  }
  const address = toHex(raw).slice(0, 40).toUpperCase();
  return address;
}
