import { Param } from "./Paramater.mjs";
import type { IMethodDecorator } from "../../types.mjs";


export function Num<This, Args extends any[], Return>(
  key: string,
  required: boolean = false,
  fallback?: number
): IMethodDecorator<This, Args, Return> {
  return Param({ key, type: Number, required, fallback });
}
Num.Fallback = function <This, Args extends any[], Return>(key: string, fallback: number): IMethodDecorator<This, Args, Return> {
  return Num(key, false, fallback);
};
Num.Required = function <This, Args extends any[], Return>(key: string): IMethodDecorator<This, Args, Return> {
  return Num(key, true);
};
