'use client'

import { forwardRef } from 'react'
import { useCarousel } from './useCarousel'

const CarouselNext = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithRef<'button'>
>(({ className, ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <button
      ref={ref}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      {/* <ArrowRight className="h-4 w-4" /> */}
      <span className="sr-only">Next slide</span>
    </button>
  )
})

CarouselNext.displayName = "CarouselNext"

export { CarouselNext }