import type { IMethodDecorator } from "../../types.mjs";
import { Param } from "./Param.mjs";

export function Str<This, Args extends any[], Return>(
  key: string,
  required: boolean = false,
  fallback?: string
): IMethodDecorator<This, Args, Return> {
  return Param({ key, type: String, required, fallback });
}
Str.Fallback = function <This, Args extends any[], Return>(key: string, fallback: string): IMethodDecorator<This, Args, Return> {
  return Str(key, false, fallback);
};
Str.Required = function <This, Args extends any[], Return>(key: string): IMethodDecorator<This, Args, Return> {
  return Str(key, true);
};
