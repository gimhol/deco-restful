import { Controller, CONTROLLER_ROOT, DELETE, GET, Pack, Param, POST, Property, PUT } from "../index.mjs";

@Pack
class DemoPack {
  @Property
  get a(): null { return null }
  @Property
  set a(v) { }
}

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
  @Param.Pack('pack', DemoPack)
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
