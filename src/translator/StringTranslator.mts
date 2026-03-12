import type { IParamaterInfo } from "../types.mjs";
import { BaseTranslator } from "./BaseTranslator.mjs";

export class StringTranslator extends BaseTranslator<string> {
  fromBigint(raw: bigint, info: IParamaterInfo): string { return '' + raw }
  fromSymbol(raw: Symbol, info: IParamaterInfo): string { return '' + raw }
  fromNull(info: IParamaterInfo): string { return '' }
  fromUndefined(info: IParamaterInfo): string { return '' }
  fromString(raw: string): string { return raw; }
  fromBoolean(raw: boolean): string { return '' + raw }
  fromNumber(raw: number): string { return '' + raw }
}


