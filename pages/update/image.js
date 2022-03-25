import { useEffect, useState } from 'react'
import { getSession, redirectIfNotAuth } from '../../services/user'
import { newPost, filter } from '../../services/post'
import Router from 'next/router'
import Head from 'next/head'
import Navigation from '../../components/Navigation'
import Layout from '../../components/Layout'
import LoaderPost from '../../components/Loaders/LoaderPost'
import Footer from '../../components/Footer'

export default function FormImage () {
  const [user, setUser] = useState(null)
  const [profileImage, setProfileImg] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState('')
  const [loading, setLoading] = useState(false)
  const [imgForm, setImgForm] = useState('https://res.cloudinary.com/dhehnqygp/image/upload/v1621966463/upload_cmkcrb.png')

  useEffect(() => {
    redirectIfNotAuth()
    handleUser()
  }, [])

  const handleUser = async () => {
    const data = await getSession()
    if (data) {
      setUser(data.name)
      setProfileImg(data.profileImage)
    }
  }

  const handleChange = (e) => {
    const valor = e.target.value
    const newVal = filter(valor)
    setDescription(newVal)
  }

  const handlePostChange = (e) => {
    setFile(e.target.files[0])

    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImgForm(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append('post', file)
    formData.append('description', description)
    formData.append('profileImage', profileImage)
    formData.append('user', user)

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    const nPost = await newPost(formData, config)
    if (nPost) {
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

      {!loading
        ? <form className='card-form' onSubmit={handleSubmit}>
          <h1>Nueva Publicación</h1>
          <div className='img-holder'>
            <img src={imgForm} alt='' id='img' className='img' />
          </div>
          <input
            type='file' accept='image/png,image/gif,image/jpg,image/jpeg'
            name='post' id='input' onChange={handlePostChange}
          />
          <label htmlFor='input'>Elige una imagen</label>
          <textarea
            name='description' table='2' placeholder='Descripcion'
            onChange={handleChange}
          />
          {file && <button type='submit'>Publicar</button>}
          </form>
        : <div>
          <p>Publicando...</p>
          <LoaderPost />
          </div>}
      <Footer />
      <style jsx>{`
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
            #input[type="file"] {
                display: none;
            }
            textarea {
                border: 0;
                display: block;
                background: none;
                margin: 20px auto;
                text-align: center;
                border: 2px solid indigo;
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

         `}
      </style>
    </Layout>
  )
}
