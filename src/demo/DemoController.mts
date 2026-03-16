import { Controller, CONTROLLER_ROOT, Data, DELETE, GET, Param, POST, Property, PUT } from "../index.mjs";

@Data
class SubData {
  @Property({ field: 'bar' })
  get foo(): string { return 'good' }
}

@Data
class DemoData {

  @Property({})
  get hello(): string { return 'world' }
  set hello(_: string) { }

  @Property
  get sub(): SubData { return new SubData() }
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
demoData.hello = 'world by user'
// console.log('Data:', Data)
// console.log('Data.hello:', Data.hello)
console.log('Data.toJSON:', JSON.stringify(demoData))