
import { Bool } from "./Bool.mjs";
import { Num } from "./Num.mjs";
import { PackParam } from "./Pack.mjs";
import { Param } from "./Paramater.mjs";
import { Str } from "./Str.mjs";

export * from "./Bool.mjs";
export * from "./Num.mjs";
export * from "./Paramater.mjs";
export * from "./Str.mjs";
export * from "./Pack.mjs";

Param.Str = Str
Param.Num = Num
Param.Bool = Bool
Param.Pack = PackParam