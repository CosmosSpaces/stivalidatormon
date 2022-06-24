import { truncate } from '../lib/util';
import { Block } from '../model/block';
import Cosmos from '../model/cosmo';
import useValidatorEdit from '../stores/usevalidatoredit';

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
  const { setSelected, removeSelected } = useValidatorEdit();
  const checkStatus = (block: Block) => {
    return (
      block?.last_commit?.signatures?.some(
        (x) => x.validator_address === props.validatorAddress
      ) ?? false
    );
  };
  const title = truncate(props.name, 27);
  return (
    <div>
      <div className="flex w-full items-center mb-4">
        <input
          type="checkbox"
          onClick={(event) => {
            if (event.target instanceof HTMLInputElement) {
              if (event.target.checked) {
                setSelected(props);
              } else {
                removeSelected(props.validatorAddress);
              }
            }
          }}
        />
        <img
          src={props.chain.logo}
          className="flex-shrink-0 ml-2 h-6 w-6 rounded-full"
          alt={`${props.chain.chain_name} logo`}
        />
        <p
          className="ml-2 text-cyan-400"
          dangerouslySetInnerHTML={{ __html: title }}
        />
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
        {props.blocks?.map((block, index) => (
          <BlockComponent
            key={block?.header?.app_hash ?? index}
            fail={!checkStatus(block)}
          />
        ))}
      </div>
    </div>
  );
};

export default BlockLoader;
