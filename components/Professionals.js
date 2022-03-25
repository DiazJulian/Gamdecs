import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { getPro } from '../services/user'

export default function Professionals () {
  const [pros, setPros] = useState([])
  const isMounted = useRef(true)

  const getProfessionals = async () => {
    const res = await getPro()
    if (isMounted.current) {
      setPros(res.data)
    }
  }

  useEffect(() => {
    getProfessionals()

    return () => {
      isMounted.current = false
    }
  }, [pros])

  return (
    <div className='professionals'>
      {
        pros.map(pro => (
          <Link href={`/${pro.professional}`} key={pro._id}>
            <img src={pro.imageId} alt='imagen1' />
          </Link>
        ))
      }

      <style jsx>{`
                .professionals {
                    display: inline-flex;
                    margin: 10px 0 40px 0;
                    background: transparent;
                    height: 200px;
                    width: 100%;
                }
                img{
                    object-fit: cover;
                    width: 32%;
                    height: 100%;
                    border-radius: 12px;
                    cursor: pointer;
                }

                @media screen and (min-height: 600px) and (orientation: portrait) {
                    .professionals {  height: 240px }            
                }
                @media screen and (min-height: 900px) and (orientation: portrait) {
                    .professionals {  height: 400px }            
                }

                @media screen and (min-width: 500px) and (orientation: landscape) {
                    .professionals {  height: 350px }            
                }

                @media screen and (min-width: 850px) and (orientation: landscape) {
                    .professionals {  height: 380px;
                                      gap: 10px; }            
                }

                @media screen and (min-width: 950px) and (orientation: landscape) {
                    .professionals {  height: 490px;
                                      gap: 15px; }            
                }

            `}
      </style>

    </div>
  )
}
