export enum GestureDir {
  Up,
  Down,
  Left,
  Right,
}

export interface GesturePosition {
  x: number
  y: number
}

export interface GestureAction {
  name: string
  gesture: GestureDir[]
  action: () => Promise<void> | void
}
