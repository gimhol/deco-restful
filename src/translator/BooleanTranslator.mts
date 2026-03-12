import type { IParamaterInfo } from "../types.mjs";
import { BaseTranslator } from "./BaseTranslator.mjs";

export class BooleanTranslator extends BaseTranslator<boolean> {
  fromBigint(raw: bigint, info: IParamaterInfo): boolean { return this.fromString(raw.toString(), info); }
  fromSymbol(raw: Symbol, info: IParamaterInfo): boolean { return this.fromString(raw.toString(), info); }
  fromNull(info: IParamaterInfo): boolean { return false; }
  fromUndefined(info: IParamaterInfo): boolean { return false; }
  fromString(raw: string, info: IParamaterInfo): boolean {
    const r = raw.trim().toLocaleLowerCase();
    return r !== '0' && r !== 'false';
  }
  fromBoolean(raw: boolean): boolean { return raw; }
  fromNumber(raw: number): boolean { return raw !== 0; }
}


