
import { Bool } from "./Bool.mjs";
import { DataParam } from "./Data.mjs";
import { Num } from "./Num.mjs";
import { Param as _Param } from "./Param.mjs";
import { Str } from "./Str.mjs";

export * from "./Bool.mjs";
export * from "./Data.mjs";
export * from "./Num.mjs";
export * from "./Str.mjs";
export const Param = Object.assign(_Param, {
  Str,
  Num,
  Bool,
  Data: DataParam,
})