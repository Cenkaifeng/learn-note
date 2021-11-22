import { get } from "lodash";

export const safeGet = (target, path, defaultValue) => {
  return get(target, path, defaultValue) || defaultValue;
};
