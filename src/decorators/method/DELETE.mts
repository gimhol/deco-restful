import { Handler } from "../../Handler.mjs";
import type { IFunc, IMethodDecorator, IHandlerInfo } from "../../types.mjs";

export function DELETE<This, Args extends any[], Return>(
  opts?: IHandlerInfo | string
): IMethodDecorator<This, Args, Return>;

export function DELETE<This, Args extends any[], Return>(
  target: IFunc<This, Args, Return>,
  context: ClassMethodDecoratorContext<This, IFunc<This, Args, Return>>
): void;

export function DELETE<This, Args extends any[], Return>(
  arg0?: string | IHandlerInfo | IFunc<This, Args, Return>,
  ctx?: ClassMethodDecoratorContext<This, IFunc<This, Args, Return>>
): IMethodDecorator<This, Args, Return> | void {
  return Handler<This, Args, Return>('DELETE', arg0, ctx);
}
