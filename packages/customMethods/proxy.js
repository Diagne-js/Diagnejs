import {v} from '../v/v.js'

export function observe(callback,variable) {

      v[variable] = new Proxy(v[variable], {
      set(target, key, value) {
      callback(key, target, value);
      target[key] = value;
      return true;
    },
    });
}