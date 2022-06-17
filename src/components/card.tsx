import Cosmos from '../model/cosmo';
import BlockLoader from './blockloader';

const Card = (props: Cosmos) => {
  return (
    <div className="bg-purple-300 overflow-hidden shadow rounded-lg">
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
          <p className="text-green-200">{props.twentyFourHourChange}</p>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <a href="#" className="font-medium text-cyan-700 hover:text-cyan-900">
            {' '}
            View secure info{' '}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
