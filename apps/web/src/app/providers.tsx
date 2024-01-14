'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({ children }) {
  return (
    <ThemeProvider
      defaultTheme='light'
      enableSystem={false}
      themes={['light', 'dark']}
    >
      {children}
    </ThemeProvider>
  )
}