import { Data, Property } from "../index.mjs";

export @Data
class SubData {
  @Property({ field: 'bar' })
  get foo(): string { return 'good' }
}

@Data
export class DemoData {
  /**
   * Property Use Case 1: setter-only
   *
   * getter will be auto-gen, init-value will be undefined.
   */
  @Property
  set setter_only(_: string | undefined) { }

  /**
   * Property Use Case 2: setter-only with init-value
   *
   * getter will be auto-gen
   */
  @Property({ init: 'init-value' })
  set setter_only_with_init(_: string | undefined | null) { }

  /**
   * Property Use Case 2: getter-only with init-value
   *
   * setter will be auto-gen. however, without setter declare,
   *
   * DemoData.hello2 = 'x' can not pass ts-check.
   */
  @Property
  get getter_only(): string { return 'init-value'; }

  /**
   * Property Use Case 3: tyepof field is another data.
   *
   * !!! WARNING: init-value use same class (for here is DemoData) will cause loop problem
   * (Maximum call stack size exceeded)
   */
  @Property({ init: () => new SubData() })
  get sub(): SubData { return null!; }
}
