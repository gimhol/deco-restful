import { Context } from "../../index.mjs";
import type { IPropertyDecorator } from "../../types.mjs";
export interface IPropertyInfo<This = unknown, T = unknown> {
  field?: string;
  init?: T | ((target: This) => T);
}
export interface IRPropertyInfo<This = unknown, T = unknown> extends IPropertyInfo<T> {
  kind: 'getter' | 'setter';
  func: IProperty<This, T>;
  field: string;
  name: string;
}
export interface IGetter<This = unknown, Value = unknown> { (this: This): Value }
export interface ISetter<This = unknown, Value = unknown> { (this: This, v: Value): void }
export type IProperty<This = unknown, Value = unknown> = IGetter<This, Value> | ISetter<This, Value>
export type IPropertyDecoratorContext<This = unknown, Value = unknown> =
  ClassGetterDecoratorContext<This, Value> |
  ClassSetterDecoratorContext<This, Value>


export function Property<This = unknown, T = unknown>(info: IPropertyInfo<T>): IPropertyDecorator<T, This>;
export function Property<This = unknown, T = unknown>(func: IProperty<This, T>, ctx: IPropertyDecoratorContext<This, T>): void;
export function Property<This = unknown, T = unknown>(arg0?: IProperty<This, T> | IPropertyInfo<T>, ctx?: IPropertyDecoratorContext<This, T>): void | IPropertyDecorator<T, This> {
  if (typeof arg0 === 'function' && ctx) return _decorator({}, arg0, ctx)
  if (typeof arg0 === 'object') return (a, b) => _decorator(arg0, a, b)
  throw new Error('wrong property')
}

function _decorator<This = unknown, T = unknown>(info: IPropertyInfo<T>, func: IProperty<This, T>, ctx: IPropertyDecoratorContext<This, T>) {
  const { name, kind } = ctx
  const field = info.field ?? name.toString()
  const rinfo: IRPropertyInfo<This, T> = {
    ...info, kind, func, field, name: name.toString()
  }
  Context.registProperty(rinfo)
  ctx.addInitializer(function () {
    const self = (this as any)

    console.debug('Property Initializer Called!', ctx)
    if (ctx.kind === 'getter') {
      self['_$$$_GETTERS_'] = self['_$$$_GETTERS_'] || [];
      self['_$$$_GETTERS_'].push(rinfo);
    }

    const private_name = `_$$$${ctx.name.toString()}`;
    if ('init' in rinfo) {
      self[private_name] = typeof rinfo.init === 'function' ? rinfo.init(self) : rinfo.init;
    } else if (ctx.kind === 'getter') {
      self[private_name] = self[ctx.name.toString()];
    }
    Object.defineProperty(this, ctx.name, {
      configurable: true,
      get() { return this[private_name] },
      set(v) { this[private_name] = v },
    })
  })
}

