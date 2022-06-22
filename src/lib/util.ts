import { useEffect } from 'react';

import { sha256 } from '@cosmjs/crypto';
import { fromBase64, fromHex, toHex, fromBech32 } from '@cosmjs/encoding';
import RIPEMD160 from 'ripemd160';
import runes from 'runes';

import { ConsensusPubkey } from '../model/validator';

/**
 * Credit to Ping.pub explorer for figuring out this logic.
 */
export const consensusPubkeyToHexAddress = (
  consensusPubkey: ConsensusPubkey
) => {
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
};

export const searchString = (input: string, value: string) => {
  const index = value.indexOf(input);
  return index !== -1;
};

export const useEscapeHatch = (onCloseCallback: () => void) => {
  return useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseCallback();
      }
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const truncate = (str: string, n: number) => {
  return str.length > n ? `${runes.substr(str, 0, n - 1)}&hellip;` : str;
};
