import { Controller, CONTROLLER_ROOT, DELETE, GET, Param, POST, PUT } from "../index.mjs";
import { DemoData } from "./DemoData.mjs";


@Controller('blog')
class Demo {
  static TAG = 'Demo'
  @GET(CONTROLLER_ROOT)
  root() {
    const TAG = `[${Demo.TAG}::root]`
    console.log(`${TAG} called.`)
    return `${TAG} called.`
  }

  @PUT @GET @POST @DELETE
  @Param.Str('str')
  @Param.Num('num')
  @Param.Bool('bool')
  @Param.Data('pack', DemoData)
  str_num_bool(str: string, num: number, bool: boolean) {
    const TAG = `[${Demo.TAG}::test]`
    console.log(`${TAG} called`)
    const ret = {
      data: { str, num, bool },
      msg: `${TAG} called`
    }
    console.log(`${TAG} called`, ret)
    return ret;
  }

  world() { }
}

const demoData = new DemoData();
demoData.setter_only_with_init = 'world by user'
demoData.setter_only_with_init = null
console.log('Data.toJSON:', JSON.stringify(demoData))