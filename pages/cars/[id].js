import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Gallery from '../../components/Gallery'

export default function Listing({
  id,
  title,
  maker,
  mileage,
  drive,
  year,
  price,
  createdAt,
  description,
  imgUrl,
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-[100vh] pt-24 p-5 max-w-4xl ml-auto mr-auto">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <h2 className="text-xl">{maker}</h2>
          <h3>
            {year}
            <span> • </span>
            {mileage.toLocaleString().replaceAll(',', ' ')} km
            <span> • </span>
            {drive}
          </h3>
          <h3>
            {new Date(createdAt)
              .toLocaleDateString('us-US')
              .replaceAll('.', '-')}
          </h3>
        </div>
        <Gallery
          images={imgUrl}
          title={title}
          className="my-5 rounded h-56 sm:h-80 md:h-96 lg:h-[36rem]"
        />
        <p>{description}</p>
      </main>
      <Footer />
    </>
  )
}

import prisma from '../../lib/prisma'

export async function getServerSideProps(context) {
  const { id } = context.params
  const data = await prisma.cars.findUnique({ where: { id } })
  console.log(data)
  return {
    props: {
      ...data,
      createdAt: String(data.createdAt),
    },
  }
}
