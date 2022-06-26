import Cosmos from '../model/cosmo';
import useModals from '../stores/usemodals';
import BlockLoader from './blockloader';

const Card = (props: Cosmos) => {
  const { activate } = useModals();
  const isNegativeChange = Math.sign(props.twentyFourHourChange) === -1;
  return (
    <div className="bg-purple-300 overflow-hidden shadow rounded-lg flex flex-col h-max">
      <div className="px-5 pt-5">
        <BlockLoader {...props} />
      </div>
      <div className="grid grid-cols-3 text-white px-5 py-3">
        <div className="flex flex-col items-center">
          <p>Delegation</p>
          <p className="text-cyan-400">{props.delegation}</p>
        </div>
        <div className="flex flex-col items-center">
          <p>Rank</p>
          <p className="text-green-200">{props.rank}</p>
        </div>
        <div className="flex flex-col items-center">
          <p>24hr Change</p>
          <p className={isNegativeChange ? 'text-red-200' : 'text-green-200'}>
            {isNegativeChange ? '-' : '+'}
            {isNegativeChange
              ? Math.abs(props.twentyFourHourChange)
              : props.twentyFourHourChange}
          </p>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3 mt-auto">
        <div className="text-sm">
          <button
            className="font-medium text-cyan-700 hover:text-cyan-900"
            onClick={() => activate('secure-info')}
          >
            {' '}
            View secure info{' '}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
