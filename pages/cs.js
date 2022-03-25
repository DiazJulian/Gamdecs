import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getRole, getSession, getUser } from '../services/user'
import Layout from '../components/Layout'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function Cs () {
  const [session, setSession] = useState(false)
  const [Info, setInfo] = useState([])
  const [Comunidad, setComunidad] = useState([])
  const [CSGOUsers, setCSGOUsers] = useState([])
  const [CS16Users, setCS16Users] = useState([])

  useEffect(async () => {
    const user = await getSession()
    if (user) {
      setSession(true)
    }
    CsgoUsers()
    Cs16Users()
  }, [])

  const CsgoUsers = async () => {
    const user = await getUser('HLTV')
    if (user) {
      setInfo(user.data.user)
    }

    const res = await getRole('CSGO')
    if (res) {
      setCSGOUsers(res.data)
    }
  }

  const Cs16Users = async () => {
    const user = await getRole('Comunidad')
    if (user) {
      setComunidad(user.data)
    }

    const res = await getRole('CS1.6')
    if (res) {
      setCS16Users(res.data)
    }
  }

  console.log(CSGOUsers)
  console.log(CS16Users)
  console.log(Comunidad)

  return (

    <Layout>
      <Navigation />
      <section className='categories'>
        <p>¡Toda la información del CSGO Argentino y del mundo!</p>
        <Link href={`/${Info.name}`}>
          <img src={Info.profileImage} alt='user' />
        </Link>
      </section>
      <h1>Cuentas de CSGO que te pueden gustar:</h1>
      <div className='profiles'>
        {CSGOUsers && CSGOUsers.map(u => (
          <Link key={u._id} href={`/${u.name}`}>
            <div className='users'>
              <img src={u.profileImage} />
            </div>
          </Link>
        ))}
      </div>
      <section className='categories'>
        <p>Comunidades de CS 1.6</p>
        <div className='com-container'>
          {Comunidad && Comunidad.map(u => (
            <Link key={u._id} href={`/${u.name}`}>
              <div className='comunidades'>
                <img src={u.profileImage} />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <h1>Cuentas de CS 1.6 que te pueden gustar:</h1>
      <div className='profiles'>
        {CS16Users && CS16Users.map(u => (
          <Link key={u._id} href={`/${u.name}`}>
            <div className='users'>
              <img src={u.profileImage} />
            </div>
          </Link>
        ))}
      </div>
      {session === true &&
        <Footer />}
      <style jsx>{`
                .categories {
                    display: flex;
                    width: 100%;
                    margin-top: 70px;
                }
                p {
                    width: 65%;
                    height: 30px;
                    color: yellow;
                    font-size: 10px;
                    font-family: Arial;
                    top: 50%;
                    position: relative;
                    text-align: center;
                }
                .categories img {
                    width: 80px;
                    height: 120px;
                    padding: 5px;
                    border-radius: 15px;
                    cursor: pointer;
                }
                .profiles {
                    text-align: center;
                    width: 100%;
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    margin-bottom: 70px;
                }
                h1 {
                    color: white;
                    font-size: 12px;
                }
                .users img {
                    width: 50px;
                    height: 50px;
                    cursor: pointer;
                }
                .com-container {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    overflow-x: auto;
                    overflow-y: hidden;
                    display: flex;
                    scrollbar-color: gray transparent;
                }
                .com-container::-webkit-scrollbar {
                    height: 10px;
                }
                .com-container::-webkit-scrollbar-thumb {
                    border-radius: 4px;
                    background: gray;
                }
                .com-container::-webkit-scrollbar-track {
                    background: transparent;
                    border-radius: 4px;
                }
                
                @media screen and (min-width: 360px) {
                    p {  font-size: 15px }            
                    .categories img { width: 100px;
                          height: 150px; }
                }
                @media screen and (min-width: 410px) {
                    .categories img { width: 130px;
                          height: 200px; }
                }
                @media screen and (min-width: 520px) {
                    .categories img { width: 170px;
                        height: 250px; }
                    .profiles {
                        grid-template-columns: repeat(6, 1fr);
                    }
                    .users img {
                        width: 70px;
                        height: 70px; }
                }
                @media screen and (min-width: 700px) {
                    h1 { font-size: 17px;}
                    p {  font-size: 30px }            
                    .categories img { width: 210px;
                        height: 310px; }
                    .profiles {
                        grid-template-columns: repeat(8, 1fr);
                    }
                    .users img {
                        width: 80px;
                        height: 80px;
                    }   
                }
                
            `}
      </style>

    </Layout>
  )
}
