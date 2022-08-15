import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Register() {
  const router = useRouter()
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, 3000)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="h-screen bg-black text-white text-3xl font-bold grid place-items-center">
      Coming soon...
    </div>
  )
}
