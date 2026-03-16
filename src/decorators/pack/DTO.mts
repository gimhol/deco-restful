import { __INNER_PREFIX__, Context } from "../../Context.mjs";
import type { IClass } from "../../types.mjs";
import { get_props_map } from "./get_props_map.mjs";

export interface IDTOInfo<C = any> {
  clazz: IClass<C>;
}

export function DTO<C = any, T extends IClass<C> = IClass<C>>(clazz: T, ctx: ClassDecoratorContext<T>): void {
  const rinfo: IDTOInfo<C> = { clazz }
  Context.registDTO(rinfo);
  ctx.addInitializer(function () {
    console.debug('DTO Initializer Called!', ctx)
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