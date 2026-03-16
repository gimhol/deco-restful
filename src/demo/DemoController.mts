import { Controller, CONTROLLER_ROOT, DELETE, DTO, GET, Param, POST, Property, PUT } from "../index.mjs";

@DTO
class SubDTO {
  @Property({ field: 'bar' })
  get foo(): string { return 'good' }
}

@DTO
class DemoDTO {

  @Property({})
  get hello(): string { return 'world' }

  @Property({ init: 'hello setter' })
  set hello(v: string) { }


  @Property
  get sub(): SubDTO { return new SubDTO() }
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
  @Param.DTO('pack', DemoDTO)
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

const dto = new DemoDTO();
console.log('dto:', dto)
console.log('dto.hello:', dto.hello)
console.log('dto.toJSON:', JSON.stringify(dto))