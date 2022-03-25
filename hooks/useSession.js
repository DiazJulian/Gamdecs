import { useState, useEffect, useCallback } from 'react'
import { getSession } from '../services/user'

export function useSession () {
  const [session, setSession] = useState(false)

  const updateSession = useCallback(async () => {
    let res = await getSession()
    if (res = typeof Object) setSession(true)
    if (res = typeof String) setSession(false)
  }, [session])

  useEffect(() => {
    updateSession()

    console.log(session)
  }, [session, updateSession])

  return [session]
}
