'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({ children }) {
  return (
    <ThemeProvider
      defaultTheme='light'
      enableSystem={true}
      themes={['light', 'dark', 'system']}
    >
      {children}
    </ThemeProvider>
  )
}