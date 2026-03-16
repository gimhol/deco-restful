import type { IRControllerInfo } from "./decorators/Controller.mjs";
import type { IDataInfo, IRPropertyInfo } from "./index.mjs";
import type { IClass, IHandlerInfo, IParamaterInfo, IRHandlerInfo } from "./types.mjs";

export class Context {
  protected static _cls_Data_map = new Map<IClass, IDataInfo>()
  protected static _ctrl_infos = new Set<IRControllerInfo>();
  protected static _cls_ctrl_info_map = new Map<IClass, IRControllerInfo>()
  protected static _path_ctrl_info_map = new Map<string, IRControllerInfo>()
  protected static _cls_ctrl_map = new Map<IClass, any>();
  protected static _path_ctrl_map = new Map<string, any>();
  protected static _handlers = new Map<string, IRHandlerInfo>()
  protected static _handler_info_maps = new Map<Function, IHandlerInfo[]>()
  protected static _paramater_info_maps = new Map<Function, IParamaterInfo[]>()
  protected static _property_info_maps = new Map<Function, IRPropertyInfo<any, any>>()

  static registProperty<This = unknown, T = unknown>(info: IRPropertyInfo<This, T>) {
    this._property_info_maps.set(info.func, info as IRPropertyInfo<unknown, unknown>)
  }
  static get cls_ctrl_info_map(): ReadonlyMap<IClass, IRControllerInfo> {
    return this._cls_ctrl_info_map
  }
  static get path_ctrl_info_map(): ReadonlyMap<string, IRControllerInfo> {
    return this._path_ctrl_info_map
  }
  static get controllers(): ReadonlySet<IRControllerInfo> { return this._ctrl_infos; }
  static registData(info: IDataInfo) {
    this._cls_Data_map.set(info.clazz, info)
  }

  static paramaters(func: Function): IParamaterInfo[] {
    return this._paramater_info_maps.get(func) || [];
  }
  static registParamater(func: Function, info: IParamaterInfo) {
    let arr = Context._paramater_info_maps.get(func)
    if (!arr) Context._paramater_info_maps.set(func, arr = [info]);
    else arr.unshift(info);
  }
  static registController(info: IRControllerInfo): void {
    this._cls_ctrl_info_map.set(info.clazz, info);
    this._path_ctrl_info_map.set(info.path, info);
    this._ctrl_infos.add(info);
  }
  static registHandler(func: Function, info: IHandlerInfo): void {
    let arr = Context._handler_info_maps.get(func)
    if (!arr) Context._handler_info_maps.set(func, arr = [info]);
    else arr.push(info);
  }
  static initHandler(info: IRHandlerInfo): void {
    const ctrl_info = Context.cls_ctrl_info_map.get(info.clazz);
    if (!ctrl_info) throw new Error('controller not found');
    const key = `${info.method}:${[ctrl_info.path, info.path].join('/')}`;
    let arr = this._handlers.get(key);
    if (!arr) this._handlers.set(key, info);
  }
  static handler(method: string, controller: string, handler: string) {
    const ctrl = Context.controller(controller);
    const key = `${method}:${[controller, handler].join('/')}`;
    return this._handlers.get(key)
  }
  static controllerByPath<C = any>(path: string): C | null {
    let ret = this._path_ctrl_map.get(path)
    if (!ret) {
      const info = this._path_ctrl_info_map.get(path);
      if (!info) return null;
      ret = new info.clazz();
      this._cls_ctrl_map.set(info.clazz, ret)
      this._path_ctrl_map.set(info.path, ret)
    }
    return ret
  }
  static controllerByCls<C>(clazz: IClass<C>): C | null {
    let ret = this._cls_ctrl_map.get(clazz)
    if (!ret) {
      const info = this._cls_ctrl_info_map.get(clazz);
      if (!info) return null;
      ret = new clazz();
      this._cls_ctrl_map.set(clazz, ret)
      this._path_ctrl_map.set(info.path, ret)
    }
    return ret
  }
  static controller<C = any>(arg0: IClass<C> | string): C | null {
    return typeof arg0 === 'string' ?
      this.controllerByPath(arg0) :
      this.controllerByCls(arg0)
  }
  static print() {
    for (const info of this._ctrl_infos)
      console.log(info)
    for (const [key, info] of this._handlers)
      console.log(key, ':', info)
  }
  static launchAll() {
    for (const info of this._ctrl_infos)
      this.controller(info.clazz)
  }
}