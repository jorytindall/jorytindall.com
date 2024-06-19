'use client'

import classnames from 'classnames'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import type { TabsContentProps } from './types'

const TabsContent = ({
  children,
  value,
  forceMount = false,
  className
}: TabsContentProps) => {

  const classes = classnames([
    className,
  ])

  return (
    <TabsPrimitive.Content
      value={value}
      // @ts-ignore
      forceMount={forceMount}
      className={classes}
    >
      {children}
    </TabsPrimitive.Content>
  )
}

TabsContent.displayName = TabsPrimitive.Content.displayName

export { TabsContent }