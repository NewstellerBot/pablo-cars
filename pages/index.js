import Head from 'next/head'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

import Navbar from '../components/Navbar'
import Car from '../components/Car'
import Footer from '../components/Footer'
import CarPlaceholder from '../components/CarPlaceholder'

import useCars from '../lib/useCars'

export default function Home() {
  const { data: session } = useSession()
  const admin = session?.user?.role === 'admin'

  const { cars, isLoading, isError } = useCars()

  return (
    <>
      <Head>
        <title>Pablo Cars</title>
        <meta name="description" content="Pablo's Cars" />
      </Head>
      <Navbar />
      <main className="pt-20 lg:pt-24 pb-5 px-4 min-h-screen max-w-4xl mr-auto ml-auto">
        {admin ? (
          <>
            <Link href="/upload">
              <button className="text-white p-3 rounded-lg font-semibold w-full my-3 bg-blue-500">
                Dodaj Samochód
              </button>
            </Link>
          </>
        ) : null}
        <section id="cars">
          <h1 className="text-4xl font-semibold mb-5">Samochody</h1>
          <div className="grid md:grid-cols-2 gap-5">
            {isLoading ? (
              Array(4).map((i) => {
                return <CarPlaceholder key={i} />
              })
            ) : isError ? (
              <h1>Error nastąpił podczas ładowania!</h1>
            ) : (
              cars.map((car) => {
                return <Car key={car.id} props={car} />
              })
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
