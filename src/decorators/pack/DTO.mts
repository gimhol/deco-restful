import { Context } from "../../Context.mjs";
import type { IClass } from "../../types.mjs";
import type { IRPropertyInfo } from "./Property.mjs";

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
          if (key.startsWith('_$$$')) continue;
        }
        const getters = this['_$$$_GETTERS_'] as IRPropertyInfo<unknown, unknown>[];
        if (Array.isArray(getters)) {
          for (const n of getters) {
            ret[n.field] = this[n.name]
          }
        }

        return ret
      }
    }

  })
}