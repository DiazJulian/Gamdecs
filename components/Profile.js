import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { getSession } from '../services/user'

export default function Profile () {
  const [name, setName] = useState('')
  const [profileImage, setProfileImg] = useState('')

  const updateSession = useCallback(async () => {
    const data = await getSession()
    if (data) {
      setName(data.name)
      setProfileImg(data.profileImage)
      console.log(data)
    }
  }, [])

  useEffect(() => {
    updateSession()
  }, [name, updateSession])

  console.log(name, profileImage)
  return (
    <div className='profContainer'>
      <Link as={`/${name}`} href={`/${name}`}>
        <img src={profileImage} alt='User' />
      </Link>

      <style jsx>{`
                .profContainer {
                    height: 22px;
                    width: 22px;
                    cursor: pointer;
                }
                img {
                    border-radius: 50%;
                    height: 100%;
                    width: 100%;
                }
            `}
      </style>

    </div>
  )
}
