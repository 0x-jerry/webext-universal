import { useEventListener, useMouseInElement } from '@vueuse/core'

export function useHorizontalScroll(
  element: MaybeRef<HTMLElement | null | undefined>,
) {
  const { isOutside } = useMouseInElement(element)

  useEventListener(element, 'wheel', (event) => {
    if (isOutside.value) return

    if (event.deltaY === 0) return

    event.preventDefault()
    const target = event.currentTarget as HTMLElement

    target.scrollTo({
      left: target.scrollLeft + event.deltaY,
    })
  })
}