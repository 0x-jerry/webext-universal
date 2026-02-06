import { type CommunicationProtocol, isObject, isString } from '@0x-jerry/utils'

export function isCommunicationProtocol(
  o: unknown,
): o is CommunicationProtocol {
  return isObject(o) && '_' in o && isString(o._)
}
