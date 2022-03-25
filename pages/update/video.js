import { useEffect, useState } from 'react'
import { getSession, redirectIfNotAuth, userNormal } from '../../services/user'
import { filter, newVideoPost } from '../../services/post'
import Router from 'next/router'
import Head from 'next/head'
import Navigation from '../../components/Navigation'
import Layout from '../../components/Layout'
import LoaderPost from '../../components/Loaders/LoaderPost'
import Footer from '../../components/Footer'

export default function FormVideo () {
  const [user, setUser] = useState(null)
  const [profileImage, setProfileImg] = useState('')
  const [description, setDescription] = useState('')
  const [videoId, setVideoId] = useState('')
  const [loading, setLoading] = useState(false)
  const [normal, setNormal] = useState(false)

  useEffect(async () => {
    redirectIfNotAuth()
    handleUser()

    const normal = await userNormal()
    if (normal) {
      setNormal(true)
    }
  }, [])

  const handleUser = async () => {
    const data = await getSession()
    if (data) {
      setUser(data.name)
      setProfileImg(data.profileImage)
    }
  }

  const handleDescription = (e) => {
    const valor = e.target.value
    const newVal = filter(valor)

    setDescription(newVal)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const nVideo = await newVideoPost(videoId, description, profileImage, user)
    if (nVideo) {
      Router.push('/')
    }
  }
  console.log(description)
  return (
    <Layout>
      <Head>
        <title>Publicar</title>
      </Head>
      <Navigation />
      {normal
        ? <section>
          <h2>Para publicar un video debes tener una cuenta Premium</h2>
          <h2>Si eres creador de contenido</h2>
          <h2>¡Solicita una gratis!</h2>
          <a href='https://www.instagram.com/diazjulian8' target='_blank' rel='noreferrer'>Contactar</a>
          </section>
        : <>
          {!loading
            ? <form className='card-form' onSubmit={handleSubmit}>
              <h1>Nuevo Video</h1>
              <input
                type='text' name='videoId' onChange={(e) => setVideoId(e.target.value)}
                placeholder='Introduce id del video'
              />
              <textarea
                name='description' table='2' placeholder='Descripcion'
                onChange={handleDescription}
              />
              {(videoId.length > 5) && <button type='submit'>Publicar</button>}
              </form>
            : <div>
              <p>Publicando...</p>
              <LoaderPost />
              </div>}
          </>}
      <Footer />

      <style jsx>{`
            section {
                margin-top: 90px;
                width: 100%;
                text-align: center;
            }
            section a {
                text-decoration: none;
                color: white;
                padding: 10px;
                border: 2px solid #7622aa;
                border-radius: 10px;
                background: #ff00cc;
                background: -webkit-linear-gradient(to right,#333399,#ff00cc);
                background: linear-gradient(to right,#333399,#ff00cc);
            }
            section h2 {
                color: white;
            }
            form {
                height: 70vh;
                width: 215px;
                position: absolute;
                padding: 30px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
            }
            h1{
                text-transform: uppercase;
                font-size: 12px;
                font-weight: 800;
                color: white;
            }
            .img-holder{
                margin: auto;
                width: 150px;
                height: 170px;
                border: 3px black solid;
                border-radius: 5px;
                margin-top: 1rem;
              }
            .img{
                width: 150px;
                height: 170px;
                object-fit: cover;
            }
            input {
                display: block;
                background: #ff253a;
                margin: 20px auto;
                text-align: center;
                border: 2px solid #ff253a;
                padding: 14px 10px;
                width: 180px;
                outline: none;
                color: white;
                border-radius: 24px;
            }
            textarea {
                border: 0;
                display: block;
                background: none;
                margin: 20px auto;
                text-align: center;
                border: 2px solid #ff253a;
                padding: 14px 10px;
                width: 180px;
                outline: none;
                color: white;
                border-radius: 24px;
            }
            textarea:focus {
                width: 200px;
            }
            textarea::-webkit-scrollbar {
                display: none;
            }
            label{
                width: 100%;
                margin-top: 1rem;
                display: flex;
                justify-content: center;
                margin: auto;
                width: 160px;
                height: 30px;
                color: white;
                border-radius: 10px;
                background-color: indigo;
                text-align: center;
                cursor: pointer;
                line-height: 30px;
              }
            button {
                border: 0;
                display: block;
                background: indigo;
                margin: 20px auto;
                text-align: center;
                padding: 12px 10px;
                width: 190px;
                outline: none;
                color: white;
                border-radius: 24px;
            }
            button:hover {
                background: #3498db;

            }
            div {
                width: 100%;
                text-align: center;
                margin-top: -30px;
            }
            p{
                padding-top: 90px;
                color: white;
                font-size: 30px;
                margin-bottom: 0;
            }
            @media screen and (max-height: 500px) and (orientation: landscape) {
                form{ 
                    height: 65vh;
                    top: 50%;
                    overflow: scroll;
                }
                form::-webkit-scrollbar {
                    display: none;
                }
            }
            // @media screen and (min-width: 280px) and (orientation: landscape) {
            //    form{ 
            //         height: 60vh;
            //         top: 57%;
            //         width: 88%;
            //         position: absolute;
            //         display: flex;
            //         left: 50%;
            //     }
            //     .img-holder {
            //     margin-top: 1rem;

            //     }
            //     input {
            //         position: relative;
            //         margin: 10px 10px;
            //         top: 30%;
            //         width: 300px;
            //         height: 50px;  
            //         padding: 12px 10px;
            //     }
            //     label {
            //         margin: -19px 0;
            //         position: absolute;
            //         width: 160px;

            //     }
            //     h1 {
            //         display: none;
            //     }
            //     button {
            //         top: 40%;
            //         width: 100px;
            //         height: 40px;
            //         position: relative;
            //      }
            // }
            
            // @media screen and (min-width: 750px) and (orientation: landscape) {
            //     form{ 
            //          height: 65vh;
            //          top: 55%;
            //      }
            //     .img {
            //          width: 170px;
            //          height: 230px;
            //      }
            //     .img-holder {
            //         margin-top: 2rem;
            //         width: 170px;
            //         height: 230px;
            //     }
            //     input {
            //         width: 400px;
            //     }
            //     label {
            //         margin: -10px 20px;
            //     }
            //  }

         `}
      </style>
    </Layout>
  )
}
