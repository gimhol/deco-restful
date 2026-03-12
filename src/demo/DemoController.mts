import { Bool, Controller, CONTROLLER_ROOT, DELETE, GET, Num, POST, PUT, Str } from "../index.mjs";

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
  @Str('str')
  @Num('num')
  @Bool('bool')
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
