'use client'

import { forwardRef } from 'react'
import { useCarousel } from './useCarousel'

const CarouselContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        {...props}
      />
    </div>
  )
})

CarouselContent.displayName = "CarouselContent"

export { CarouselContent }