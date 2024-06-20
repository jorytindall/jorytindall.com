'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import classnames from 'classnames'
import s from 'styles/components/Tabs.module.scss'

import { TabsProps } from './types'

const Tabs = ({
  children,
  defaultValue,
  value,
  onValueChange,
  orientation = 'horizontal',
  dir = 'ltr',
  activationMode = 'automatic',
  className,
}: TabsProps) => {

  const classes = classnames([
    s[`tabs--root`],
    className,
  ])

  return  (
    <TabsPrimitive.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      orientation={orientation}
      dir={dir}
      activationMode={activationMode}
      className={classes}
    >
      {children}
    </TabsPrimitive.Root>
  )
}

Tabs.displayName = 'Tabs'

const Root = Tabs

export { Root, Tabs }

export type { TabsProps }