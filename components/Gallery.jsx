import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from '@fortawesome/free-solid-svg-icons'

import { useRef } from 'react'

export default function Gallery({ images, title, className }) {
  const ref = useRef(null)
  return (
    <div className="relative">
      <button
        className="absolute text-white text-4xl top-1/2 -translate-y-1/2 left-2 z-10 hidden md:inline-block opacity-20 hover:opacity-100 transition"
        onClick={() => {
          ref.current.scrollLeft -= ref.current.clientWidth
        }}
      >
        <FontAwesomeIcon icon={faCircleArrowLeft} />
      </button>
      <div
        className={`relative flex flex-nowrap flex-row snap-x snap-mandatory [&>div]:flex-none [&>div]:snap-center overflow-auto ${className}`}
        ref={ref}
      >
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-full">
            <Image
              key={index}
              alt={title}
              placeholder="blur"
              blurDataURL="https://a.allegroimg.com/s128/119868/18a270c44dfeb84793767035d98d/1-24-TOYOTA-CROWN-Car-Model-Alloy-Die-Cast-Classic"
              src={`https://pablo-cars-images.s3.eu-central-1.amazonaws.com/${image}`}
              layout="fill"
              objectFit="cover"
              className="snap-center"
            />
          </div>
        ))}
      </div>
      <button
        className="absolute text-white text-4xl top-1/2 -translate-y-1/2 right-2 z-10 hidden md:inline-block opacity-20 hover:opacity-100 transition"
        onClick={() => {
          ref.current.scrollLeft += ref.current.clientWidth
        }}
      >
        <FontAwesomeIcon icon={faCircleArrowRight} />
      </button>
    </div>
  )
}
