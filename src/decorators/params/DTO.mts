import type { IClass, IMethodDecorator } from "../../types.mjs";
import { Param } from "./Param.mjs";

export function DTOParam<This, Args extends any[], Return, C = unknown>(
  key: string,
  cls: IClass<C>,
  required: boolean = false,
  fallback?: unknown
): IMethodDecorator<This, Args, Return> {
  return Param({ key, type: cls, required, fallback });
}
DTOParam.Fallback = function <This, Args extends any[], Return, C = unknown>(key: string, cls: IClass<C>, fallback: C): IMethodDecorator<This, Args, Return> {
  return DTOParam(key, cls, false, fallback);
};
DTOParam.Required = function <This, Args extends any[], Return, C = unknown>(key: string, cls: IClass<C>): IMethodDecorator<This, Args, Return> {
  return DTOParam(key, cls, true);
};
