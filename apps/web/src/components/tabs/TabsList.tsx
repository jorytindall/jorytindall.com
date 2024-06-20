'use client'

import classnames from 'classnames'
import * as TabsPrimitive from "@radix-ui/react-tabs"
import s from 'styles/components/Tabs.module.scss'

import type { TabsListProps } from "./types"

const TabsList = ({
  children,
  loop = true,
  className,
}: TabsListProps) => {

  const classes = classnames([
    s[`tabs--list`],
    className,
  ])

  return (
    <TabsPrimitive.List
      loop={loop}
      className={classes}
    >
      {children}
    </TabsPrimitive.List>
  )
}

TabsList.displayName = TabsPrimitive.List.displayName

export { TabsList }