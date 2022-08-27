import { useSession } from 'next-auth/react'
import toast, { Toaster } from 'react-hot-toast'
import Authenticate from '../components/Authenticate'
import useUsers from '../lib/useUsers'

export default function ManageUsers() {
  const { data: session, status } = useSession({})
  const admin = session?.user?.role === 'admin'
  const { users, isLoading, isError } = useUsers()

  if (admin)
    return (
      <>
        <div className="w-screen h-screen flex items-center justify-center flex-col p-5">
          <h1 className="text-2xl font-semibold mb-3">Users</h1>
          <div className="h-3/4 rounded-lg overflow-scroll flex flex-col gap-2">
            {users.map((user) => {
              const { email, id } = user
              return (
                <>
                  <button
                    className="p-2 bg-gray-50 hover:bg-gray-100 rounded"
                    onClick={async () => {
                      await toast.promise(
                        fetch(`/api/auth/add-admin?id=${id}`),
                        {
                          loading: 'Adding admin...',
                          success: 'Admin added!',
                          error: 'Error adding admin!',
                        }
                      )
                    }}
                  >
                    <p key={email}>{email}</p>
                  </button>
                </>
              )
            })}
          </div>
        </div>
        <Toaster />
      </>
    )
  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error occured while loading users!</p>
  else return <Authenticate />
}
