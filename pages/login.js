import Link from 'next/link'

export default function Login() {
  return (
    <main className="w-screen h-screen grid place-items-center p-5 max-w-sm mr-auto ml-auto">
      <div className="filter shadow-lg bg-white p-5 rounded w-full">
        <h1 className="text-3xl font-semibold mb-3 text-center">Login</h1>
        <form className="flex flex-col gap-3">
          <label>
            <p className="mb-0.5">Email</p>
            <input
              type="email"
              placeholder="Email"
              className="border w-full border-gray-400 focus:border-blue-500 focus:ring-2 ring-blue-500 ring-opacity-80 rounded p-2 focus:outline-none"
            />
          </label>
          <label>
            <p className="mb-0.5">Password</p>
            <input
              type="password"
              placeholder="Password"
              className="border w-full border-gray-400 focus:border-blue-500 focus:ring-2 ring-blue-500 ring-opacity-80 rounded p-2 focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="p-2 bg-blue-500 hover:bg-blue-400 rounded text-white"
          >
            Login
          </button>
          <Link href="/register">
            <button
              type="button"
              className="p-2 border-blue-500 border rounded text-blue-600 hover:text-white hover:bg-blue-500 transition"
            >
              Register
            </button>
          </Link>
        </form>
      </div>
    </main>
  )
}
