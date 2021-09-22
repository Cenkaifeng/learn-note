import { get } from 'lodash';

const safeGet = (target, path, defaultValue) => {
  return get(target, path, defaultValue) || defaultValue;
};

export { safeGet };
