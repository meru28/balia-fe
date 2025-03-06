'use client'

import * as React from "react"

const CarouselContext = React.createContext(null)

export function useCarousel() {
    const context = React.useContext(CarouselContext)

    if (!context) {
        throw new Error("useCarousel must be used within a <Carousel />")
    }

    return context
}

export { CarouselContext }