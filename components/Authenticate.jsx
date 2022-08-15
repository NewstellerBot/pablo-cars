import Link from 'next/link'

export default function Authenticate() {
  return (
    <div className="h-screen w-screen text-3xl font-semibold text-white grid place-items-center p-5">
      <Link href="/api/auth/signin">
        <button className="bg-blue-500 p-6 rounded-lg transition hover:scale-105">
          Please Authenticate
        </button>
      </Link>
    </div>
  )
}
