"use client";

import { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

export default function HeaderSlide() {

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
    useEffect(() => {
        if (emblaApi) {
            console.log(emblaApi.slideNodes()) // Access API
        }
    }, [emblaApi])

    return (
        <div className="border border-2 border-white flex w-full h-full overflow-x-scroll">
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    <div className="embla__slide">Slide 1</div>
                    <div className="embla__slide">Slide 2</div>
                    <div className="embla__slide">Slide 3</div>
                </div>
            </div>
        </div>
    )
}