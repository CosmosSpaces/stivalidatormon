import Chain from './chain';
import Validator from './validator';

export default interface ValidatorState {
  chain: Chain;
  validator: Validator;
  key: string;
}
