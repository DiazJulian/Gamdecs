import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { getCategory } from '../services/user'

export default function Categories () {
  const [categories, setCategories] = useState([])
  const isMounted = useRef(true)

  const getCategories = async () => {
    const res = await getCategory()
    if (isMounted.current) {
      setCategories(res.data)
      console.log('Categories Montado')
    }
  }

  useEffect(() => {
    getCategories()

    return () => {
      isMounted.current = false
      console.log('Categories Desmontado')
    }
  }, [categories])

  console.log(categories)
  return (
    <section className='categories'>
      <div className='category'>
        {categories &&
                    categories.map(item => (
                      <div
                        style={{
                          background: item.color1,
                          background: item.color2,
                          background: item.color3
                        }}
                        className='category-content' key={item._id}
                      >
                        <Link href={`/tech/${item.category}`}>
                          <h1>{item.category.toUpperCase()}</h1>
                        </Link>
                      </div>
                    ))}
      </div>

      <style jsx>{`
                .categories {
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: 20px;
                    background: transparent;
                    height: 150px;
                    width: 100%;
                    box-sizing: border-box;
                    justify-content: center;
                    overflow: scroll;
                    scrollbar-color: black transparent;
                }
                .categories::-webkit-scrollbar {
                    display: none;
                }
                .category {
                    width: 80%;
                    height: 45%;
                    margin-left: 1%;
                    display: block;
                    cursor: pointer;
                }
                .category-content {
                    display: block;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    border-radius: 12px;
                }
                h1 {
                    font-size: 15px;
                    color: white;
                    line-height: 4;
                    margin: 0;
                    font-family: arial;
                }

                @media screen and (min-width: 700px) {
                    .categories {  height: 250px }            
                    h1 { font-size: 40px; }
                }
                @media screen and (min-width: 700px) and (orientation: landscape) {
                    .categories {  height: 200px }            
                }

                @media screen and (min-width: 900px) and (orientation: landscape) {
                    .categories {  height: 300px }            
                }

                @media screen and (min-width: 1500px) and (orientation: landscape) {
                    .categories {  height: 400px }            
                }

            `}
      </style>

    </section>
  )
}
