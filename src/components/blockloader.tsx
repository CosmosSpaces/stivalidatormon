import { Block } from '../model/block';
import Cosmos from '../model/cosmo';

interface BlockProps {
  fail?: boolean;
}

const BlockComponent = (props: BlockProps) => {
  return (
    <div
      className={`${props.fail ? 'bg-red-500' : 'bg-green-500'}`}
      style={{
        width: '10px',
        height: '12px',
      }}
    />
  );
};

const BlockLoader = (props: Cosmos) => {
  const checkStatus = (block: Block) => {
    return (
      block?.last_commit?.signatures?.some(
        (x) => x.validator_address === props.validatorAddress
      ) ?? false
    );
  };
  return (
    <div>
      <div className="flex w-full items-center mb-4">
        <input type="checkbox" />
        <p className="ml-2 text-cyan-400">
          {props.chainName} - {props.name}
        </p>
        <div
          className={`${
            props.total === '0' ? 'bg-green-100' : 'bg-red-200'
          } px-1 rounded-xl h-1 w-1 ml-auto flex justify-center items-center`}
          style={{ minWidth: '20px', width: 'auto', height: '20px' }}
        >
          <p className="text-center">
            <span className="sr-only">Total number of blocks is:</span>
            {props.total}
          </p>
        </div>
      </div>
      <div className="flex gap-px">
        {props.blocks?.map((block) => (
          <BlockComponent
            key={block.header.app_hash}
            fail={!checkStatus(block)}
          />
        ))}
      </div>
    </div>
  );
};

export default BlockLoader;
