import Head from 'next/head'
import Image from 'next/image'

import prisma from '../lib/prisma'

import Navbar from '../components/Navbar'
import Car from '../components/Car'
import Footer from '../components/Footer'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Home({ data, base64 }) {
  const cars = JSON.parse(data)
  const { data: session, status } = useSession()

  const admin = session?.user?.role === 'admin'

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
                Add Car
              </button>
            </Link>
          </>
        ) : null}
        <section id="cars">
          <h1 className="text-4xl font-semibold mb-5">Cars</h1>
          <div className="grid md:grid-cols-2 gap-5">
            {cars.map((car) => {
              return <Car key={car.id} props={car} />
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  try {
    const data = await prisma.cars.findMany()
    return {
      props: {
        data: JSON.stringify(data),
      },
    }
  } catch (error) {
    console.log(error)
  }
}
