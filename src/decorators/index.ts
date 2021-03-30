export const enumerable: {
  (target: any, name: string): void
  (target: any, name: string, desc: PropertyDescriptor): PropertyDescriptor
} = (target: any, name: string, desc?: any) => {
  if (desc) {
    desc.enumerable = true
    return desc
  }
  Object.defineProperty(target, name, {
    set(value) {
      Object.defineProperty(this, name, {
        value,
        enumerable: true,
        writable: true,
        configurable: true,
      })
    },
    enumerable: true,
    configurable: true,
  })
}

export const nonenumerable: {
  (target: any, name: string): void
  (target: any, name: string, desc: PropertyDescriptor): PropertyDescriptor
} = (target: any, name: string, desc?: any) => {
  if (desc) {
    desc.enumerable = false
    return desc
  }
  Object.defineProperty(target, name, {
    set(value) {
      Object.defineProperty(this, name, {
        value,
        writable: true,
        configurable: true,
      })
    },
    configurable: true,
  })
}
