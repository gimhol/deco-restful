import type { IMethodDecorator } from "../../types.mjs";
import { Paramater } from "./Paramater.mjs";


export function Bool<This, Args extends any[], Return>(
  key: string,
  required: boolean = false,
  fallback?: boolean
): IMethodDecorator<This, Args, Return> {
  return Paramater({ key, type: Boolean, required, fallback });
}
Bool.Fallback = function <This, Args extends any[], Return>(key: string, fallback: boolean): IMethodDecorator<This, Args, Return> {
  return Bool(key, false, fallback);
};
Bool.Required = function <This, Args extends any[], Return>(key: string): IMethodDecorator<This, Args, Return> {
  return Bool(key, true);
};
