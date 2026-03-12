import { Context } from "../Context.mjs";
import type { IClass, IClassDecorator } from "../types.mjs";

export interface IControllerInfo {
  path: string;
}
export interface IRControllerInfo<C = any> extends IControllerInfo {
  clazz: IClass<C>;
}

export function Controller<C = any, T extends IClass<C> = IClass<C>>(info?: IControllerInfo | string): IClassDecorator<T>;
export function Controller<C = any, T extends IClass<C> = IClass<C>>(clazz: T, ctx: ClassDecoratorContext<T>): void;
export function Controller<C = any, T extends IClass<C> = IClass<C>>(arg0?: T | IControllerInfo | string, ctx?: ClassDecoratorContext<T>): IClassDecorator<T> | void {
  if (ctx && typeof arg0 === 'function') return ControllerDecorator<C, T>(arg0, ctx);
  if (typeof arg0 === 'object') return (p1, p2) => ControllerDecorator<C, T>(p1, p2, arg0)
  if (typeof arg0 === 'string') return (p1, p2) => ControllerDecorator<C, T>(p1, p2, { path: arg0 })
  return ControllerDecorator<C, T>;
}

function ControllerDecorator<C = any, T extends IClass<C> = IClass<C>>(
  clazz: T,
  ctx: ClassDecoratorContext<T>,
  info: IControllerInfo = { path: clazz.name }
) {
  info.path = info.path.replace(/^\/*/, '').replace(/\/*$/, '');
  const rinfo: IRControllerInfo = { ...info, clazz }
  Context.registController(rinfo);
}
