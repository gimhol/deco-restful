import type { IRPropertyInfo } from "./Property.mjs";


export function get_init_value(self: any, p: IRPropertyInfo<any, any>) {
  if (!("init" in p)) return void 0;
  if (typeof p.init === 'function') return p.init(self);
  return p.init;
}
