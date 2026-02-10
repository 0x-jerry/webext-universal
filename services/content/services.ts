import { isSymbol } from '@0x-jerry/utils'
import { getMainWorldServiceClient } from './main-world'

export function createServices() {
  return {
    mainWorld: createMainWorldProxy(),
  }
}

const EMPTY_FN = () => {}

function createMainWorldProxy() {
  type MainWorldServices = ReturnType<typeof getMainWorldServiceClient>

  return createProxy<MainWorldServices>([])

  function createProxy<T>(keyPath: string[]) {
    const targetValue = keyPath.length
      ? (...args: unknown[]) => {
          const mainWorldServiceClient = getMainWorldServiceClient()

          const fn = getValue(mainWorldServiceClient, keyPath)

          return fn(...args)
        }
      : {}

    const p = new Proxy(targetValue, {
      get(_, key) {
        if (
          key === 'valueOf' ||
          key === Symbol.toPrimitive ||
          key === 'toString'
        ) {
          return EMPTY_FN
        }

        if (isSymbol(key)) {
          return undefined
        }

        return createProxy([...keyPath, key])
      },
    })

    return p as T
  }

  function getValue(obj: any, keyPath: string[]) {
    if (keyPath.length === 0) {
      return obj
    }
    const [key, ...restKeys] = keyPath

    return getValue(obj[key], restKeys)
  }
}

export type ContentServices = ReturnType<typeof createServices>
