export type TSetGenericObject<Base, Type> = {
  [Key in keyof Base]: Base[Key] extends object
    ? TSetGenericObject<Base[Key], Type>
    : Type;
};

// Пример использования
//  interface x {
//    a: string
//    b: {
//      a: string
//    }
//  }
//
//  interface y extends SetGenericObject<x, number> {}
//
//  const a: y = {
//    a: 5,
//    b: { a: 6 },
//  }
