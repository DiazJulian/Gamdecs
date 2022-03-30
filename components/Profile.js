import React from 'react'
import Link from 'next/link'
import { useSession } from '../hooks/useSession'

export default function Profile () {
  const {userSession, profileImage} = useSession()

  return (
    <div className='profContainer'>
      <Link as={`/${userSession}`} href={`/${userSession}`}>
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
