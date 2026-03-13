export interface IGetter<This = unknown, Value = unknown> { (this: This): Value }
export interface ISetter<This = unknown, Value = unknown> { (this: This, v: Value): void }
export type Property<This = unknown, Value = unknown> = IGetter<This, Value> | ISetter<This, Value>
export type PropertyDecoratorContext<This = unknown, Value = unknown> =
  ClassGetterDecoratorContext<This, Value> |
  ClassSetterDecoratorContext<This, Value>

export function Property<This, T = unknown>(target: IGetter<This, T>, ctx: ClassGetterDecoratorContext<This, T>): void;
export function Property<This, T = unknown>(target: ISetter<This, T>, ctx: ClassSetterDecoratorContext<This, T>): void;
export function Property<This, T = unknown>(arg0: Property<This, T>, ctx: PropertyDecoratorContext<This, T>) {

  console.log(arg0.name)

  if (ctx.kind === 'getter') {
    const getter = arg0 as IGetter<This, T>;
    ctx.addInitializer(function () {

    })


  } else if (ctx.kind === 'setter') {
    const setter = arg0 as ISetter<This, T>;
  }
}


