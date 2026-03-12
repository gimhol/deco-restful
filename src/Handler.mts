import { Context } from "./Context.mjs";
import type { IClass, IFunc, IHandlerInfo, IMethodDecorator, IRHandlerInfo } from "./types.mjs";

export function Handler<This, Args extends any[], Return>(
  method: string,
  arg0?: string | IHandlerInfo | IFunc<This, Args, Return>,
  ctx?: ClassMethodDecoratorContext<This, IFunc<This, Args, Return>>
): IMethodDecorator<This, Args, Return> | void {
  if (!arg0) return (func, ctx) => HandlerDecorator<This, Args, Return>(func, ctx, { method, path: ctx.name.toString(), name: ctx.name.toString() });
  if (typeof arg0 === 'string') return (func, ctx) => HandlerDecorator<This, Args, Return>(func, ctx, { method, path: arg0, name: ctx.name.toString() });
  if (typeof arg0 !== 'function') return (func, ctx) => HandlerDecorator<This, Args, Return>(func, ctx, arg0);
  if (ctx && typeof arg0 === 'function') return HandlerDecorator<This, Args, Return>(arg0, ctx, { method, path: ctx.name.toString(), name: ctx.name.toString() });
  throw new Error('[Handler] wrong arguments');
}

export function HandlerDecorator<This, Args extends any[], Return>(
  func: IFunc<This, Args, Return>,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
  info: IHandlerInfo
) {
  info.path = info.path.replace(/^\/*/, '').replace(/\/*$/, '');
  Context.registHandler(func, info)
  context.addInitializer(function () {
    const { constructor } = (this as { constructor: IClass; });
    const rinfo: IRHandlerInfo = {
      ...info,
      func: func,
      clazz: constructor,
      owner: this
    }
    Context.initHandler(rinfo)
  });
}

