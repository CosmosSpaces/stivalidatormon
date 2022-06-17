import { readFileSync, promises as fsp } from 'node:fs';
import path from 'node:path';
import { cwd } from 'process';

import Chain from '../model/chain';

export const getFile = <T extends Object>(dir: string): T => {
  const files = readFileSync(dir, 'utf8');
  return JSON.parse(files);
};

export const scan = async (dir: string = 'chains', results: string[] = []) => {
  const directoryPath = path.join(cwd(), dir);
  const files = await fsp.readdir(directoryPath, {
    withFileTypes: true,
  });
  files.forEach((fileName) => {
    results.push(fileName.name);
  });
  return results;
};

export const getChains = async () => {
  const files = await scan();
  const chains: Chain[] = files.map((fileName) => {
    const jsonData = getFile<Chain>(path.join(cwd(), `chains/${fileName}`));
    return jsonData;
  });
  return chains;
};
