import { __PROPS_MAP_KEY__ } from "../../index.mjs";
import type { IRPropertyInfo } from "./Property.mjs";


export function get_props_map(obj: any): Map<string, IRPropertyInfo<any, any>> {
  return obj[__PROPS_MAP_KEY__] = obj[__PROPS_MAP_KEY__] || new Map<string, IRPropertyInfo<any, any>>();
}
