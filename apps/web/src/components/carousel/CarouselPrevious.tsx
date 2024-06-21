'use client'

import { forwardRef } from 'react'
import { useCarousel } from './useCarousel'

const CarouselPrevious = forwardRef<
  keyof JSX.IntrinsicElements,
  React.ComponentPropsWithRef<'button'>
>(({ className, ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <button
      ref={ref}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      {/* <ArrowLeft className="h-4 w-4" /> */}
      <span className="sr-only">Previous slide</span>
    </button>
  )
})

CarouselPrevious.displayName = "CarouselPrevious"

export { CarouselPrevious }