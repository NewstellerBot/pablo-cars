import Link from 'next/link'
import Gallery from './Gallery'
import { useSession } from 'next-auth/react'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'

export default function Car(props) {
  const { id, title, price, imgUrl, year, mileage, drive } = props.props
  const router = useRouter()

  const { data: session } = useSession()

  const admin = session?.user?.role === 'admin'

  return (
    <>
      <div className="relative rounded drop-shadow-md bg-white w-full">
        <Gallery images={imgUrl} title={title} className="h-56 rounded-t" />
        <div className="p-4">
          <h1 className="text-xl md:text-2xl font-semibold">{title}</h1>
          <h2 className="text-lg md:text-xl">
            {price.toLocaleString().replaceAll(',', ' ')} PLN
          </h2>
          <h3>
            {year}
            <span> • </span>
            {mileage.toLocaleString().replaceAll(',', ' ')} km
            <span> • </span>
            {drive}
          </h3>
          <Link href={`/cars/${id}`}>
            <button
              type="button"
              className="bg-blue-500 text-white rounded p-2 mt-2"
            >
              See more
            </button>
          </Link>
          {admin && (
            <button
              className="bg-red-500 text-white rounded p-2 mt-2 ml-2"
              onClick={async () => {
                await toast.promise(fetch(`/api/delete-car?id=${id}`), {
                  loading: 'Deleting...',
                  success: 'Deleted!',
                  error: 'Error!',
                })
                router.reload(window.location.pathname)
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <Toaster />
    </>
  )
}
