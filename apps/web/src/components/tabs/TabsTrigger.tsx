'use client'

import classnames from 'classnames'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import type { TabsTriggerProps } from './types'

const TabsTrigger = ({
  children,
  value,
  disabled,
  className
}: TabsTriggerProps) => {

  const classes = classnames([
    className,
  ])
  return (
    <TabsPrimitive.Trigger
      value={value}
      disabled={disabled}
      className={classes}
    >
      {children}
    </TabsPrimitive.Trigger>
  )
}

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

export { TabsTrigger }