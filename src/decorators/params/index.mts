
import { Bool } from "./Bool.mjs";
import { DTOParam } from "./DTO.mjs";
import { Num } from "./Num.mjs";
import { Param as _Param } from "./Param.mjs";
import { Str } from "./Str.mjs";

export * from "./Bool.mjs";
export * from "./DTO.mjs";
export * from "./Num.mjs";
export * from "./Str.mjs";
export const Param = Object.assign(_Param, {
  Str,
  Num,
  Bool,
  DTO: DTOParam,
})