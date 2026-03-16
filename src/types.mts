export interface IClass<C extends any = any> {
  new(...args: any): C
}
export interface IClassDecorator<T extends IClass> {
  (cls: T, ctx: ClassDecoratorContext<T>): void;
}
export interface IMethodDecorator<This, Args extends any[], Return> {
  (
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
  ): void;
}
export interface IPropertyDecorator<This, T> {
  (
    target: (this: This, v: T) => void,
    context: ClassSetterDecoratorContext<This, T>
  ): void;
  (
    target: (this: This) => T,
    context: ClassGetterDecoratorContext<This, T>
  ): void;
}
export interface IFunc<This, Args extends any[], Return> {
  (this: This, ...args: Args): Return
}
export interface IHandlerInfo<C = any> {
  method: string;
  path: string;
  name: string;
}
export interface IRHandlerInfo<C = any> extends IHandlerInfo<C> {
  owner: C;
  clazz: IClass<C>;
  func(...args: any[]): any;
}

export type Type = typeof String | typeof Number | typeof Boolean;

export interface IParamaterInfo {
  type: Type | IClass<any>;
  key: string;
  required: boolean;
  fallback: any;
}