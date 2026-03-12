import { Handler } from "../../Handler.mjs";
import type { IFunc, IHandlerInfo, IMethodDecorator } from "../../types.mjs";

export function PUT<This, Args extends any[], Return>(
  opts?: IHandlerInfo | string
): IMethodDecorator<This, Args, Return>;

export function PUT<This, Args extends any[], Return>(
  target: IFunc<This, Args, Return>,
  context: ClassMethodDecoratorContext<This, IFunc<This, Args, Return>>
): void;

export function PUT<This, Args extends any[], Return>(
  arg0?: string | IHandlerInfo | IFunc<This, Args, Return>,
  ctx?: ClassMethodDecoratorContext<This, IFunc<This, Args, Return>>
): IMethodDecorator<This, Args, Return> | void {
  return Handler<This, Args, Return>('PUT', arg0, ctx);
}

