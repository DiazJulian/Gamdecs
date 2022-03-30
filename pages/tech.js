import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { getCategory } from '../services/user'
import Layout from '../components/Layout'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { useSession } from '../hooks/useSession'

export default function Tech () {
  const [categories, setCategories] = useState([])
  const {session} = useSession()
  const isMounted = useRef(true)

  const allCategories = async () => {
    const res = await getCategory()
    if (isMounted.current) {
      setCategories(res.data)
    }
  }
  useEffect(() => {
    allCategories()

    return () => {
      isMounted.current = false
    }
  }, [])

  return (

    <Layout>
      <Navigation />
      <div className='title'>
        <h1>¡Elige lo que deseas aprender!</h1>
      </div>
      <section className='categories'>
        <div className='category'>
          {categories &&
                        categories.map(item => (
                          <div className='category-content' style={{ background: item.color1, background: item.color2, background: item.color3 }} key={item._id}>
                            <Link href={`/tech/${item.category}`}>
                              <h2>{item.category.toUpperCase()}</h2>
                            </Link>
                          </div>
                        ))}
        </div>
      </section>
      {session &&  <Footer />}

      <style jsx>{`
                .title {
                    text-align: center;
                    width: 100%;
                }
                h1 {
                    color: white;
                    font-size: 12px;
                    margin-top: 70px;
                }
                .categories {
                    display: flex;
                    margin-top: 20px;
                    background: transparent;
                    width: 100%;
                    box-sizing: border-box;
                    justify-content: center;
                }
                .category {
                    width: 80%;
                    height: 45%;
                    margin-left: 1%;
                    cursor: pointer;
                    display: block;
                }
                h2 {
                    color: white;
                    line-height: 4;
                    font-family: arial;
                    font-size: 20px;
                }
                .category-content {
                    display: block;
                    width: 100%;
                    height: 80%;
                    text-align: center;
                    margin-bottom: -20px;
                    border-radius: 20px;
                }
                
                @media screen and (min-width: 700px) {
                    h1{ font-size: 20px; }
                    h2 { color: white;
                        line-height: 6;
                    }
                }
                
            `}
      </style>

    </Layout>
  )
}
