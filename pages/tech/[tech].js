import { useEffect, useState } from 'react'
import Navigation from '../../components/Navigation'
import Layout from '../../components/Layout'
import Footer from '../../components/Footer'
import Link from 'next/link'
import { getRole, getSession } from '../../services/user'

Tech.getInitialProps = async (context) => {
  const role = context.query.tech
  const userData = { user: {}, role }
  try {
    const res = await getRole(role)
    userData.user = res.data
    console.log(userData)
  } catch (error) {
    console.log(error)
  }
  return { userData }
}

export default function Tech ({ userData }) {
  const [session, setSession] = useState(false)

  useEffect(() => {
    const Session = async () => {
      const res = await getSession()
      if (res) {
        setSession(true)
      }
    }
    Session()
  }, [session])

  const { user, role } = userData
  console.log(user, role)
  return (
    <Layout>
      <Navigation />
      <section>
        <h1>¿Eres un profesional de {role}?</h1>
        <h2>¡Solicita tu cuenta Premium gratis!</h2>
        <a href='https://www.instagram.com/diazjulian8' target='_blank' rel='noreferrer'>Contactar</a>
      </section>
      <div className='container-content'>
        {user && user.map(u => (
          <Link key={u._id} href={`/${u.name}`}>
            <div className='content'>
              <img src={u.profileImage} />
              <p>{u.name}</p>
            </div>
          </Link>
        ))}
        {session &&
          <Footer />}

      </div>

      <style jsx>{`
                    section {
                        height: 100%;
                        width: 100%;
                        text-align: center;
                        padding: 60px 20px 40px 20px;
                    }
                    section h1 {
                        font-size: 15px;
                        color: white;
                    }
                    section h2 {
                        font-size: 12px;
                        color: white;
                    }
                    section a {
                        font-size: 12px;
                        color: white;
                        padding: 10px;
                        border: 2px solid #7622aa;
                        border-radius: 10px;
                        background: #ff00cc;
                        background: -webkit-linear-gradient(to right,#333399,#ff00cc);
                        background: linear-gradient(to right,#333399,#ff00cc);
                    }
                    .container-content {
                        margin: 20px 10px;
                        width: 95%;
                        display: grid;
                        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
                        gap: 5px;
                        text-align: center;
                    }
                    .content {
                        width: 100%;
                        height: 100%;
                        overflow: scroll;
                    }
                    .content::-webkit-scrollbar {
                        display: none;
                    }
                    img {
                        width: 90%;
                        height: 70%;
                        cursor: pointer
                    }
                    p {
                        width: 100%;
                        font-size: 12px;
                        margin: 0;
                        color: yellow;
                        cursor: pointer
                    }
                    @media screen and (min-width: 600px) {
                        p{ font-size: 15px; }
                    }
                    @media screen and (min-width: 1000px) {
                        section h1 { font-size: 20px; }
                        section h2 { font-size: 17px; }
                        section a { font-size: 15px; }
                        p { font-size: 17px; }
                    }
                    @media screen and (min-height: 800px) {
                        section { padding: 90px 20px 40px 20px; }
                    }

                `}
      </style>
    </Layout>
  )
}
