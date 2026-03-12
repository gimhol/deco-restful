import type { IParamaterInfo } from "../types.mjs";
import { BaseTranslator } from "./BaseTranslator.mjs";

export class NumberTranslator extends BaseTranslator<number> {
  fromBigint(raw: bigint, info: IParamaterInfo): number { return this.fromString(raw.toString(), info); }
  fromSymbol(raw: Symbol, info: IParamaterInfo): number { return this.fromString(raw.toString(), info); }
  fromNull(info: IParamaterInfo): number { return 0; }
  fromUndefined(info: IParamaterInfo): number { return 0; }
  fromString(raw: string, info: IParamaterInfo): number { return Number(raw); }
  fromBoolean(raw: boolean): number { return raw ? 1 : 0; }
  fromNumber(raw: number): number { return raw; }
}
