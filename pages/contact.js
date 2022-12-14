import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Image from 'next/image'

import { useRef, useEffect, useState } from 'react'

export default function Contact() {
  const [size, setSize] = useState({ width: 400, height: 400 })
  const ref = useRef(null)
  useEffect(() => {
    const handleResize = () => {
      const { clientWidth: width } = ref.current
      const SCALE = width < 600 ? 0.9 : 0.5
      setSize({ width: width * SCALE, height: (width * SCALE * 4) / 5 })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [ref])
  return (
    <>
      <Navbar />
      <main
        ref={ref}
        className="min-h-[100vh] pt-24 p-5 max-w-4xl ml-auto mr-auto flex flex-col gap-2"
      >
        <div className="relative" style={{ ...size }}>
          <Image
            className="rounded"
            src="/pawel.webp"
            alt=""
            layout="fill"
            objectFit="cover"
          />
        </div>

        <h1 className="text-3xl font-bold">Paweł Nowak</h1>
        <h2 className="text-xl ">Główny Sprzedawca</h2>
        <a href="mailto: pawel@pablocars.pl">
          <p>pn@mastal.com</p>
        </a>
        <p>+48 695 084 489</p>
      </main>
      <Footer />
    </>
  )
}
