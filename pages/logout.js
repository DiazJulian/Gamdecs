import { useEffect } from 'react'
import { logOut, redirectIfNotAuth } from '../services/user'

export default function Logout () {
  useEffect(() => {
    logOut()
    redirectIfNotAuth()
  })
  return null
}
