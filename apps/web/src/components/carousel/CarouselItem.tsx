'use client'

import { forwardRef } from 'react'
import { useCarousel } from './useCarousel'

const CarouselItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      {...props}
    />
  )
})

CarouselItem.displayName = "CarouselItem"

export { CarouselItem }