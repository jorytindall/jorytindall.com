import { forwardRef } from 'react'
import * as TabsPrimitive from "@radix-ui/react-tabs"

const TabsList = forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

export { TabsList }