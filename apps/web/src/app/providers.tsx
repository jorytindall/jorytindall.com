'use client'

import { ThemeProvider } from 'next-themes'
import { MDXProvider } from '@mdx-js/react'

// MDX Provider Components
import { Paragraph, Headline } from 'components/typography'

const components = {
  Paragraph,
  Headline,
  h2: props => {
    console.log(props)
    return (
      <Headline type='h2' color='primary' {...props} />
    )
  },
  p: props => {
    console.log(props)
    return (
      <Paragraph type='primary' color='primary' {...props} />
    )
  }
}

export function Providers({ children }) {
  return (
    <ThemeProvider
      defaultTheme='light'
      enableSystem={true}
      themes={['light', 'dark', 'system']}
    >
      <MDXProvider components={components}>
        {children}
      </MDXProvider>
    </ThemeProvider>
  )
}