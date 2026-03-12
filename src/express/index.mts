
import type express from 'express';
import { BooleanTranslator, Context, CONTROLLER_ROOT, NumberTranslator, StringTranslator, type IRControllerInfo } from '../index.mjs';
const _numberTranslator = new NumberTranslator();
const _stringTranslator = new StringTranslator();
const _booleanTranslator = new BooleanTranslator();

interface IHandleRequestArg {
  req: express.Request;
  resp: express.Response;
  controller: IRControllerInfo;
  handler_path: string;
}
async function handleRequest(arg: IHandleRequestArg) {
  const { req, resp, controller, handler_path } = arg;
  const handler = Context.handler(req.method, controller.path, handler_path)
  if (!handler) {
    resp.status(404).send('handler not found')
    return;
  }
  try {
    const paramaters = Context.paramaters(handler.func)
    const args: any[] = []
    for (const p of paramaters) {
      const raw_value = req.query[p.key];
      switch (p.type) {
        case String: args.push(_numberTranslator.fromAny(raw_value, p)); break;
        case Number: args.push(_stringTranslator.fromAny(raw_value, p)); break;
        case Boolean: args.push(_booleanTranslator.fromAny(raw_value, p)); break;
        default: args.push(raw_value)
      }
    }
    const result = await handler.func.call(handler.owner, ...args)
    resp.send(result)
  } catch (e) {
    resp.status(500).send(e)
  }
}
export interface IBindExpressArg {
  app: express.Express,
  prefix?: string;
}
export function bindExpress(arg: IBindExpressArg) {
  const { app, prefix = '' } = arg;
  for (const controller of Context.controllers) {
    const root_regexp = new RegExp(`^/${[prefix, controller.path].join('/')}$`)
    const func_regexp = new RegExp(`^/${[prefix, controller.path].join('/')}/(.*?)$`)
    app.use(root_regexp, (req, resp) => handleRequest({ req, resp, controller, handler_path: CONTROLLER_ROOT }))
    app.use(func_regexp, (req, resp) => handleRequest({ req, resp, controller, handler_path: req.params[0]! }));
  }
}