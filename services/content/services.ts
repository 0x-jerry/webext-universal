export function createServices() {
  return {
    userAgent: {
      change: (userAgent: string) => {
        Object.defineProperty(navigator, 'userAgent', { value: userAgent })

        console.log('User agent changed to', userAgent)
      },
    },
  }
}

export type ContentServices = ReturnType<typeof createServices>
