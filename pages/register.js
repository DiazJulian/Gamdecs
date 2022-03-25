import React, { useState, useEffect } from 'react'
import { redirectIfAuth, registerUser } from '../services/user'
import { filter } from '../services/post'
import Router from 'next/router'
import Head from 'next/head'
import Navigation from '../components/Navigation'
import Layout from '../components/Layout'
import alert from 'sweetalert'

export default function Form () {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profileImage, setProfileImg] = useState('')
  const [imgForm, setImgForm] = useState('https://res.cloudinary.com/dhehnqygp/image/upload/v1612474875/user_d5ltrx.png')

  useEffect(() => {
    redirectIfAuth()
  })

  const handleNameChange = (e) => {
    const valor = e.target.value
    const a = filter(valor)
    const newVal = a.replace(/ +/g, '-')

    setName(newVal)
  }

  const handleEmailChange = (e) => {
    const valor = e.target.value
    const a = filter(valor)
    const newVal = a.replace(/ +/g, '-')

    setEmail(newVal)
  }

  const handlePostChange = (e) => {
    setProfileImg(e.target.files[0])

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
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('perfil', profileImage)

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    const res = await registerUser(formData, config)
    console.log(res)
    if (res === 'Nombre de usuario existente') {
      alert({
        title: res,
        icon: 'warning'
      })
      return null
    }
    if (res === 'Email existente') {
      alert({
        title: res,
        icon: 'warning'
      })
      return null
    }

    alert({
      title: 'Usuario nuevo',
      icon: 'success',
      timer: 2000
    })
    Router.push('/login')
  }

  console.log(name)
  console.log(email)
  console.log(password)
  console.log(imgForm)
  console.log(profileImage)
  return (
    <Layout>
      <Head>
        <title>Crear Cuenta</title>
      </Head>
      <Navigation />
      <form className='card-form' onSubmit={handleSubmit}>
        <div className='img-holder'>
          <img src={imgForm} alt='' id='img' className='img' />
        </div>
        <input type='file' name='perfil' id='input' onChange={handlePostChange} />
        <label htmlFor='input'>Elige una imagen</label>
        <input
          name='name' placeholder='Nombre de Usuario'
          onChange={handleNameChange} required
        />
        <input
          type='email' name='email' placeholder='Correo electrónico'
          onChange={handleEmailChange} required
        />
        <input
          type='password' name='password' placeholder='Contraseña'
          onChange={(e) => setPassword(e.target.value)} required
        />
        {profileImage && <button type='submit'>Registrarme</button>}
      </form>
      <style jsx>{`
            form {
                height: 398px;
                width: 218px;
                position: absolute;
                padding: 30px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
            }
            .img-holder{
                margin: auto;
                width: 100px;
                height: 100px;
                border: 3px black solid;
                border-radius: 5px;
                margin-bottom: 5px;
              }
            .img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            #input[type="file"] {
                display: none;
            }
            input {
                border: 0;
                display: block;
                background: none;
                margin: 20px auto;
                text-align: center;
                border: 2px solid indigo;
                padding: 15px 10px;
                width: 190px;
                outline: none;
                color: white;
                border-radius: 24px;
            }
            input:focus {
                width: 200px;
                border: 2px solid #2980b9;
            }
            label{
                width: 100%;
                margin-top: 1rem;
                display: flex;
                justify-content: center;
                margin: auto;
                width: 80%;
                height: 30px;
                color: white;
                border-radius: 10px;
                background-color: #4f3bd2;
                text-align: center;
                cursor: pointer;
                line-height: 30px;
              }
            button {
                border: 0;
                display: block;
                background: blue;
                margin: 20px auto;
                text-align: center;
                padding: 10px 10px;
                width: 80%;
                outline: none;
                color: white;
                border-radius: 24px;
            }
            button:hover {
                background: #3498db;
            }
            p{
                text-align: center;
                padding:  50% 30%;
                color: white;
            }

            @media screen and (min-height: 250px) and (orientation: landscape) {
                p { padding: 25% 38%; }
            }
            @media screen and (max-height: 500px) and (orientation: landscape) {
               form{ 
                    height: 60vh;
                    top: 55%;
                    overflow: scroll;
                }
                form::-webkit-scrollbar {
                    display: none;
                }
            }
            @media screen and (min-width: 750px) and (orientation: landscape) {
                form{ 
                     height: 65vh;
                     top: 50%;
                 }
                 input {
                     margin: 20px auto;
                     padding: 14px 10px;
                 }
                 h1 {
                     margin-top: -5px;
                 }
             }

         `}
      </style>
    </Layout>
  )
}
