import { useState, useEffect } from 'react'
import { getSession, userAdmin } from '../services/user'

export function useSession () {
  const [session, setSession] = useState(false)
  const [isAdmin, setAdmin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userSession, setName] = useState('')
  const [profileImage, setProfileImg] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 2000)
    const resUser = async () => {
      const res = await getSession()
      if (res) {
        setSession(true)
        setName(res.name)
        setProfileImg(res.profileImage)
      }
      const admin = await userAdmin()
      if(admin) setAdmin(true)
    }
    resUser()
  }, [session, loading])

  return {session, loading, userSession, profileImage, isAdmin}
}
