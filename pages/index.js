import { useEffect, useState, Suspense, lazy, memo } from 'react'
import Navigation from '../components/Navigation'
import Head from 'next/head'
import Layout from '../components/Layout'
import Categories from '../components/Categories'
import Professionals from '../components/Professionals'
import Footer from '../components/Footer'
import { getSession } from '../services/user'
import About from '../components/About'
import LoaderPost from '../components/Loaders/LoaderPosts'
import GamdecsLoader from '../components/Loaders/GamdecsLoader'
import UsersVideos from '../components/Video/UsersVideos'
import { motion } from 'framer-motion'
import Lottie from 'react-lottie'
import lottieCode from '../lottie/code.json'
const UsersPosts = lazy(() => import('../components/Posts/UsersPosts'))

function Home () {
  const [session, setSession] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 2000)
    const resUser = async () => {
      const res = await getSession()
      if (res) setSession(true)
      console.log('Index Montado')
    }
    resUser()
  }, [session, loading])

  const Options = {
    loop: true,
    autoplay: true,
    rendererSetting: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <Layout>
      <Head>
        <title>Gamdecs</title>
      </Head>
      <Navigation />
      {!loading && <GamdecsLoader />}

      {session
        ? <>
          <UsersVideos />
          <Suspense fallback={<LoaderPost />}>
            <UsersPosts />
          </Suspense>
          <Footer />
          </>
        : <>
          <motion.header
            className='subtitle'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2>Aprende de tecnología y prepárate para el futuro.</h2>
            <h1 className='title'>¡ENCUENTRA CURSOS Y CONTENIDOS GRATUITOS Y EMPIEZA A ESTUDIAR HOY MISMO!
              <br /> <a href='/tech'>  más...  </a>
            </h1>
          </motion.header>
          <div className='Category-container'>
            <Lottie options={{ animationData: lottieCode, ...Options }} width='50%' />
            <Categories />
          </div>
          <article>
            <h2>Gamdecs tambien es un sitio para deportes electronicos como<br />
              Counter Strike <br /> <a href='/cs'>  más...  </a>
            </h2>
          </article>
          <Professionals />
          <article>
            <h2>Gamdecs esta pensado para que pases tu tiempo aprendiendo alguna tecnología nueva
              y también puedas encontrar información y comunidades de Counter Strike para sumarte.
              <br /> Solo tienes que <a href='/register'>crear tu cuenta</a>
            </h2>
          </article>
          <About />
          </>}
      <style>{`
                    header {
                        width: 100%;
                    }
                    header .title {
                        text-align: center;
                        margin-top: 30px;
                        color: white;
                        font-size: 12px;
                    }
                    .subtitle {
                        font-size: 11px;
                        margin-top: 70px;
                        text-align: center;
                        color: white;
                    }
                `}
      </style>
      <style jsx>{`
                    .Category-container {
                        display: flex;
                        width: 100%;
                        align-content: space-between;
                    }
                    article {
                        width: 100%;
                        margin-top: 20px;
                    }
                    article h2 {
                        text-align: center;
                        color: white;
                        font-size: 12px;
                    }
                    a {
                        border: 2px solid;
                        font-family: arial;
                        border-radius: 5px;
                        text-decoration: none;
                        color: #ffa500;
                    }
                    @media screen and (min-width: 500px)  {
                        header .title {
                            font-size: 15px;
                        }
                        header h2 {
                            font-size: 14px;
                        }
                        article h2 {
                            font-size: 15px;
                        }
                    }
                    @media screen and (min-width: 700px) {
                        header .title {
                            font-size: 22px;
                        }
                        header h2 {
                            font-size: 20px;
                        }
                        article h2 {
                            font-size: 20px;
                        }
                    }
                    // @media screen and (min-width: 900px) {
                    //     header .title {
                    //         margin-top: 60px;
                    //         font-size: 40px;
                    //     }
                    //     header h2 {
                    //         font-size: 35px;
                    //         margin-top: 150px;
                    //     }
                    //     article h2 {
                    //         font-size: 35px;

                    //     }
                    // }
                `}
      </style>

    </Layout>
  )
}

export default memo(Home)
