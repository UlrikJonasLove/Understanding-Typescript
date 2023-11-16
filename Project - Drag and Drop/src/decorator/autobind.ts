// autobind decorator for the submitHandler
export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  // _ tells typescript that we don't care about the first and second argument
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}
