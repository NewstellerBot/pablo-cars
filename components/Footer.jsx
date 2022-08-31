import Link from 'next/link'

function Footer() {
  return (
    <footer className="bg-black text-gray-200 p-5">
      <div className="max-w-4xl mr-auto ml-auto">
        <ul className="text-white mb-5 ">
          <Link href="/">
            <a>
              <li className="hover:bg-white hover:bg-opacity-10 p-2 rounded">
                Samochody
              </li>
            </a>
          </Link>
          {/* <li className="hover:bg-white hover:bg-opacity-10 p-2 rounded">
          About
        </li> */}
          <Link href="/contact">
            <a>
              <li className="hover:bg-white hover:bg-opacity-10 p-2 rounded">
                Kontakt
              </li>
            </a>
          </Link>
          <Link href="/api/auth/signin">
            <a>
              <li className="hover:bg-white hover:bg-opacity-10 p-2 rounded">
                Login
              </li>
            </a>
          </Link>
        </ul>
        <p className="text-sm">© Krystian Nowak 2022</p>
      </div>
    </footer>
  )
}

export default Footer
