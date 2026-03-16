import { Context, __PRI_VAL_PREFIX__, __PROP_INFO_PREFIX__, __SRC_VAL_PREFIX__ } from "../../index.mjs";
import type { IPropertyDecorator } from "../../types.mjs";
import { get_init_value } from "./get_init_value.mjs";
import { get_props_map } from "./get_props_map.mjs";
export interface IPropertyInfo<This, T> {
  field?: string;
  init?: T | ((target: This) => T);
  type?: String | Number | Boolean;
  nullable?: boolean;
}
export interface IRPropertyInfo<This, T> extends IPropertyInfo<This, T> {
  kind: 'getter' | 'setter';
  func: IProperty<This, T>;
  name: string;
}
export interface IGetter<This, Value> { (this: This): Value }
export interface ISetter<This, Value> { (this: This, v: Value): void }
export type IProperty<This, Value> = IGetter<This, Value> | ISetter<This, Value>
export type IPropertyDecoratorContext<This, Value> =
  ClassGetterDecoratorContext<This, Value> |
  ClassSetterDecoratorContext<This, Value>


export function Property<This, T>(info: IPropertyInfo<This, T>): IPropertyDecorator<This, T>;
export function Property<This, T>(func: IProperty<This, T>, ctx: IPropertyDecoratorContext<This, T>): void;
export function Property<This, T>(arg0?: IProperty<This, T> | IPropertyInfo<This, T>, ctx?: IPropertyDecoratorContext<This, T>): void | IPropertyDecorator<This, T> {
  if (typeof arg0 === 'function' && ctx) return _decorator({}, arg0, ctx)
  if (typeof arg0 === 'object') return (a: any, b: any) => _decorator(arg0, a, b)
  throw new Error('wrong property')
}

function _decorator<This, T>(info: IPropertyInfo<This, T>, func: IProperty<This, T>, ctx: IPropertyDecoratorContext<This, T>) {
  const { kind } = ctx;
  const name = ctx.name.toString();
  const rinfo: IRPropertyInfo<This, T> = { ...info, kind, func, name: name.toString() }
  Context.registProperty(rinfo)
  ctx.addInitializer(function () {
    const self = (this as any)
    const props_map = get_props_map(self)
    const bro = props_map.get(rinfo.name)
    if (bro) {
      if ('field' in bro && 'field' in rinfo) {
        if (info.field !== bro.field) {
          console.warn(
            `[WARN] ${JSON.stringify(self.constructor.name)} field of property different, ` +
            `before: ${JSON.stringify(bro.field)}, ` +
            `after: ${JSON.stringify(info.field)}, after one will be uesed.`
          )
        }
      }
      if ('field' in bro && !('field' in rinfo))
        rinfo.field = bro.field
      if (!('field' in bro) && 'field' in rinfo)
        bro.field = rinfo.field
    }
    props_map.set(rinfo.name, rinfo)
    const src_val_name = `${__SRC_VAL_PREFIX__}${name}`;
    const pri_val_name = `${__PRI_VAL_PREFIX__}${name}`;
    const setter_info_name = `${__PROP_INFO_PREFIX__}_setter_${name}`
    const getter_info_name = `${__PROP_INFO_PREFIX__}_getter_${name}`
    const my_info_name = `${__PROP_INFO_PREFIX__}_${ctx.kind}_${name}`
    self[my_info_name] = rinfo;

    if (!(src_val_name in self)) self[src_val_name] = self[name]
    
    const init_value = get_init_value(self, rinfo) ?? self[src_val_name];
    if (ctx.kind == 'getter') {
      const bro_info = self[setter_info_name] as IRPropertyInfo<This, T> | undefined;
      do {
        if (!bro_info) break;
        if (!('init' in bro_info)) break;
        // 上方setter有初始值
        const bro_init_value = get_init_value(self, bro_info);
        if (init_value == bro_init_value)
          break;
        const jstr_bro_init_value = JSON.stringify(bro_init_value)
        const jstr_init_value = JSON.stringify(init_value)
        if (jstr_init_value == jstr_bro_init_value)
          break;
        console.warn(
          `[WARN] ${JSON.stringify(self.constructor.name)} init-value overwirte.\n` +
          `       init-value from getter will be used,\n` +
          `       init-value from setter will be ignored.\n` +
          `       init-value from getter: ${jstr_init_value},\n` +
          `       init-value from setter: ${jstr_bro_init_value}`
        )
      } while (0);

    } else if (ctx.kind === 'setter') {
      const bro_info = self[getter_info_name] as IRPropertyInfo<This, T> | undefined;
      do {
        if (!bro_info) break;
        const bro_init_value = get_init_value(self, bro_info) ?? self[src_val_name];
        if (init_value == bro_init_value)
          break;
        const jstr_bro_init_value = JSON.stringify(bro_init_value)
        const jstr_init_value = JSON.stringify(init_value)
        if (jstr_init_value == jstr_bro_init_value)
          break;
        console.warn(
          `[WARN] ${JSON.stringify(self.constructor.name)} init-value overwirte.\n` +
          `       init-value from setter will be used,\n` +
          `       init-value from getter will be ignored.\n` +
          `       init-value from setter: ${jstr_init_value},\n` +
          `       init-value from getter: ${jstr_bro_init_value}`
        )
      } while (0)
    }
    self[pri_val_name] = init_value;
    Object.defineProperty(this, ctx.name, {
      configurable: true,
      set(v: any) { self[pri_val_name] = v },
      get() { return self[pri_val_name] }
    })
  })
}

