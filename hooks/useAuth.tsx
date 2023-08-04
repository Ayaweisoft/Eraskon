import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"


const useAuth = () => {
    const { data: session } = useSession()
    // console.log("session", session)
  return (
    <div>useAuth</div>
  )
}

export default useAuth