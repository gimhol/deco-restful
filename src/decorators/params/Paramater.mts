import { Context } from "../../Context.mjs";
import type { IMethodDecorator, IParamaterInfo, Type } from "../../types.mjs";
import type { Bool } from "./Bool.mjs";
import type { Num } from "./Num.mjs";
import type { PackParam } from "./Pack.mjs";
import type { Str } from "./Str.mjs";

export function Param<This, Args extends any[], Return>(info: IParamaterInfo): IMethodDecorator<This, Args, Return>
export function Param<This, Args extends any[], Return>(key: string, type: Type, required?: boolean, fallback?: any): IMethodDecorator<This, Args, Return>
export function Param<This, Args extends any[], Return>(
  arg0: string | IParamaterInfo,
  type?: Type,
  required: boolean = false,
  fallback?: any
): IMethodDecorator<This, Args, Return> {
  if (typeof arg0 === 'string' && type) {
    switch (type) {
      case String: case Number: case Boolean:
        return Param({ type: type, required, key: arg0, fallback })
      default:
        throw new Error('[Param] wrong arguments')
    }
  }
  if (typeof arg0 === 'object') {
    return (func) => Context.registParamater(func, arg0)
  }
  throw new Error('[Param] wrong arguments')
}

Param.Str = (() => { }) as unknown as typeof Str
Param.Num = (() => { }) as unknown as typeof Num
Param.Bool = (() => { }) as unknown as typeof Bool
Param.Pack = (() => { }) as unknown as typeof PackParam