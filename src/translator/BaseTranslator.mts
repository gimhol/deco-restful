import type { IParamaterInfo } from "../types.mjs";

export abstract class BaseTranslator<V> {
  abstract fromString(raw: string, info: IParamaterInfo): V;
  abstract fromBoolean(raw: boolean, info: IParamaterInfo): V;
  abstract fromNumber(raw: number, info: IParamaterInfo): V;
  abstract fromBigint(raw: bigint, info: IParamaterInfo): V;
  abstract fromNull(info: IParamaterInfo): V;
  abstract fromUndefined(info: IParamaterInfo): V;
  abstract fromSymbol(raw: Symbol, info: IParamaterInfo): V;
  fromAny(raw: any, info: IParamaterInfo, fallbacking: boolean = false): V {
    if (raw == null || raw == void 0) {
      if (
        fallbacking == false &&
        info.fallback !== null &&
        info.fallback !== void 0
      ) {
        return this.fromAny(info.fallback, info, true)
      }
      if (raw == null) return this.fromNull(info)
      if (raw == void 0) return this.fromUndefined(info)
    }
    if (typeof raw === 'boolean') return this.fromBoolean(raw, info)
    if (typeof raw === 'number') return this.fromNumber(raw, info)
    if (typeof raw === 'bigint') return this.fromBigint(raw, info)
    if (typeof raw === 'string') return this.fromString(raw, info)
    if (typeof raw === 'symbol') return this.fromSymbol(raw, info)
    throw new Error(`[BaseTranslator::fromAny] failed!`)
  }
}