import { Param } from "./Paramater.mjs";
import type { IClass, IMethodDecorator } from "../../types.mjs";

export function PackParam<This, Args extends any[], Return, C = unknown>(
  key: string,
  cls: IClass<C>,
  required: boolean = false,
  fallback?: unknown
): IMethodDecorator<This, Args, Return> {
  return Param({ key, type: cls, required, fallback });
}
PackParam.Fallback = function <This, Args extends any[], Return, C = unknown>(key: string, cls: IClass<C>, fallback: C): IMethodDecorator<This, Args, Return> {
  return PackParam(key, cls, false, fallback);
};
PackParam.Required = function <This, Args extends any[], Return, C = unknown>(key: string, cls: IClass<C>): IMethodDecorator<This, Args, Return> {
  return PackParam(key, cls, true);
};
