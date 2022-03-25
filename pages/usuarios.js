import { useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import Navigation from '../components/Navigation'
import { getUsers } from '../services/user'
import Footer from '../components/Footer'

Users.getInitialProps = async () => {
  let users = []
  try {
    const response = await getUsers()
    users = response.data
  } catch (err) {
    console.error(err)
  }

  return { users: users.splice(0, 20) }
}

function Users ({ users }) {
  const [search, setSearch] = useState('')
  console.log(users)
  console.log(search)

  return (
    <Layout>
      <Navigation />
      <div className='container'>
        <input
          type='text' placeholder='Buscar...'
          onChange={(e) => setSearch(e.target.value)}
        />
        <ul>
          {users.filter(user => {
            if (search === '') {
              return user
            } else if (user.name.toLowerCase().includes(search.toLowerCase())) {
              return user
            }
          }).map(user => {
            return (
              <ul key={user._id}>
                <Link as={`/${user.name}`} href={`/${user.name}`}>
                  <a>
                    <img src={user.profileImage} />
                    <h3>{user.name}</h3>
                  </a>
                </Link>
              </ul>
            )
          })}

        </ul>
      </div>
      <Footer />

      <style jsx>{`
                    .container {
                        margin-top: 60px;
                        padding: 5px;
                        display: flex;
                        flex-wrap: wrap;
                        height: 100%;
                        width: 100%;
                        background: indigo;
                        box-sizing: border-box;
                    }
                    input {
                        border: 0;
                        display: block;
                        background: none;
                        margin: 10px auto;
                        text-align: center;
                        border: 2px solid #3498db;
                        padding: 14px 10px;
                        width: 200px;
                        height: 8px;
                        outline: none;
                        color: white;
                        border-radius: 24px;
                    }
                    ul {
                        width: 100%;
                        height: 100%;
                        box-sizing: border-box;
                        margin-top: 0px;
                    }
                    a {
                        text-decoration: none;
                        overflow: scroll;
                        display: flex;
                        flex-wrap: nowrap;
                        margin-left: -25px;
                    }
                    a::-webkit-scrollbar {
                        display: none;
                    }
                    img {
                        display: inline-block;
                        height: 35px;
                        width: 35px;
                        border-radius: 10px;
                        vertical-align: top;
                    }
                    h3 {
                        color: white;
                        display: inline-block;
                        margin: 8px;
                        line-height: 25px;
                        font-size: 15px;
                    }
                `}
      </style>

    </Layout>
  )
}

export default Users
