'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({ children }) {
  return (
    <ThemeProvider
      defaultTheme='system'
      enableSystem={true}
      enableColorScheme={true}
      themes={['light', 'dark']}
    >
      {children}
    </ThemeProvider>
  )
}