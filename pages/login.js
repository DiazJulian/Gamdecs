import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import Navigation from '../components/Navigation'
import Layout from '../components/Layout'
import { signIn, redirectIfAuth } from '../services/user'
import alert from 'sweetalert'

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [, setLoading] = useState(false)

  useEffect(() => {
    redirectIfAuth()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const res = await signIn(email, password)
    console.log(res)
    if (res === 'Usuario incorrecto') {
      alert({
        title: res,
        icon: 'warning'
      })
      return null
    }
    if (res === 'Contraseña incorrecta') {
      alert({
        title: res,
        icon: 'warning'
      })
      return null
    }

    Router.push('/')
  }

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <Navigation />
      <form className='card-form' onSubmit={handleSubmit}>
        <h1>Iniciar Sesión</h1>
        <input
          type='email' name='email' onChange={(e) => setEmail(e.target.value)}
          placeholder='Correo electronico' required
        />
        <input
          type='password' name='password' onChange={(e) => setPassword(e.target.value)}
          placeholder='Contraseña' required
        />
        <button type='submit'>Acceder</button>
        <p>¿No tienes una cuenta?</p>
        <Link href='/register'>
          <a> Crear Cuenta</a>
        </Link>
      </form>

      <style jsx>{`
                form {
                    width: 100%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                }
                h1{
                    text-transform: uppercase;
                    font-size: 20px;
                    font-weight: 800;
                    color: white;
                }
                input {
                    border: 0;
                    display: block;
                    background: none;
                    margin: 20px auto;
                    text-align: center;
                    border: 2px solid indigo;
                    padding: 14px 10px;
                    width: 190px;
                    outline: none;
                    color: white;
                    border-radius: 24px;
                }
                input:focus {
                    width: 200px;
                }
                button {
                    border: 0;
                    display: block;
                    background: indigo;
                    margin: 20px auto;
                    text-align: center;
                    padding: 14px 10px;
                    width: 200px;
                    outline: none;
                    color: white;
                    border-radius: 24px;
                }
                button:hover {
                    background: #3498db;
                }
                p{
                    color: white;
                }
                a{
                    color: #a5a0a0;
                    text-decoration: none;
                }
                h2{
                    text-align: center;
                    padding: 50% 30%;
                    color: white;
                }

                @media screen and (min-height: 900px) and (orientation: portrait) {
                    form{
                        height: 500px;
                        width: 400px;
                        top: 55%;
                    }
                    input{
                        margin: 30px auto;
                        width: 250px;
                        padding: 25px 30px;
                        border: 4px solid indigo;
                    }
                    botton{
                        padding: 20px 10px;
                        width: 230px;
                    }
                    p{      font-size: 20px;    }
                    a{      font-size: 22px;    }
                }

                @media screen and (min-height: 250px) and (orientation: landscape) {
                   form{ 
                        height: 220px;
                        width: 250px;
                        top: 60%;
                        padding: 5px;
                    }
                    input {
                        margin: 5px auto;
                        top: 55%;
                        padding: 8px 10px;
                        border: 2px solid indigo;
                    }
                    h1 {
                        font-size: 11px;
                    }
                    button{
                        height: 30px;
                        width: 100px;
                        padding: 8px 10px;
                        margin: 0px auto;
                    }
                    h2 { padding: 20% 40%; }
                }
                @media screen and (min-height: 500px) and (orientation: landscape) {
                    form{ 
                        width: 600px;
                        height: 400px;
                        top: 55%;
                     }
                     h1{
                        font-size: 18px;
                     }
                     input {
                        margin: 20px auto;
                        padding: 20px 20px;
                        width: 300px;
                        border: 4px solid indigo;
                     }
                     input:focus {
                        width: 320px;
                    }
                    button{
                        height: 50px;
                        width: 230px;
                        padding: 20px 10px;
                        margin: 0px auto;
                    }
                    p{      font-size: 20px;    }
                    a{      font-size: 22px;    }
                 }

             `}
      </style>
    </Layout>
  )
}
