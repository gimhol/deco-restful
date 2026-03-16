import { Context } from "../../Context.mjs";
import { __INNER_PREFIX__ } from "../../DEFINES.mjs";
import type { IClass } from "../../types.mjs";
import { get_props_map } from "./get_props_map.mjs";

export interface IDataInfo<C = any> {
  clazz: IClass<C>;
}

export function Data<C = any, T extends IClass<C> = IClass<C>>(clazz: T, ctx: ClassDecoratorContext<T>): void {
  const rinfo: IDataInfo<C> = { clazz }
  Context.registData(rinfo);
  ctx.addInitializer(function () {
    if (!this.prototype.toJSON) {
      this.prototype.toJSON = function () {
        const ret: any = {}
        for (const key in this) {
          if (key.startsWith(__INNER_PREFIX__)) continue;
        }
        for (const [_, n] of get_props_map(this)) {
          ret[n.field ?? n.name] = this[n.name]
        }
        return ret
      }
    }
  })
}