import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarRear } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Link from 'next/link'

function Hamburger(props) {
  return (
    <button type="button" className="justify-self-end lg:hidden">
      <div {...props} className="flex flex-col gap-1 self-center">
        <div className="h-0.5 w-5 bg-white" />
        <div className="h-0.5 w-5 bg-white" />
        <div className="h-0.5 w-5 bg-white" />
      </div>
    </button>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)
  return (
    <>
      <nav className="m-4 block p-4 lg:py-2 text-white filter fixed bg-black bg-opacity-20 backdrop-blur-xl rounded-xl left-0 right-0 z-20 max-w-4xl lg:ml-auto lg:mr-auto">
        <div className="grid grid-cols-2 items-center">
          <Link href="/">
            <a>
              <div className="flex items-center font-semibold">
                <FontAwesomeIcon icon={faCarRear} className="mr-2" />
                Pablo Cars
              </div>
            </a>
          </Link>
          <Hamburger onClick={toggle} />
          <ul className="lg:flex flex-row gap-1 hidden justify-self-end">
            <Link href="/">
              <a>
                <li className="py-1 px-2 hover:bg-white hover:bg-opacity-30 rounded">
                  Samochody
                </li>
              </a>
            </Link>
            {/* <li className="py-1 px-2 hover:bg-white hover:bg-opacity-30 rounded">
              About
            </li> */}
            <Link href="/contact">
              <a>
                <li className="py-1 px-2 hover:bg-white hover:bg-opacity-30 rounded">
                  Kontakt
                </li>
              </a>
            </Link>
          </ul>
        </div>

        <div className={`pt-5 w-full ${open ? 'block' : 'hidden'} lg:hidden`}>
          <ul className="flex flex-col gap-1 w-full" onClick={toggle}>
            <Link href="/">
              <a>
                <li className="p-1 pl-2 hover:bg-white hover:bg-opacity-30 rounded">
                  Samochody
                </li>
              </a>
            </Link>
            {/* <li className="p-1 pl-2 hover:bg-white hover:bg-opacity-30 rounded">
              About
            </li> */}
            <Link href="/contact">
              <a>
                <li className="p-1 pl-2 hover:bg-white hover:bg-opacity-30 rounded">
                  Kontakt
                </li>
              </a>
            </Link>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
