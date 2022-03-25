import React, { useEffect, useState } from 'react'
import Navigation from '../components/Navigation'
import MyPosts from '../components/Posts/MyPosts'
import Avatar from '../components/Avatar'
import Footer from '../components/Footer'
import { getSession, getUser } from '../services/user'
import { getPost, getUserVideo } from '../services/post'
import UserVideo from '../components/Video/UserVideo'

User.getInitialProps = async (context) => {
  const userPost = { user: {}, post: {}, video: {} }
  const name = context.query.name

  try {
    const resName = await getUser(name)
    userPost.user = resName.data
    console.log(resName)
    const post = await getPost(name)
    userPost.post = post.data
    const video = await getUserVideo(name)
    userPost.video = video.data
  } catch (err) {
    console.error(err)
  }

  return { userPost }
}

export default function User ({ userPost }) {
  const [session, setSession] = useState(false)

  useEffect(async () => {
    const res = await getSession()
    if (res) {
      setSession(true)
    }
  }, [])

  const { user, post, video } = userPost
  console.log(post)
  console.log(session)
  console.log(video)

  return (
    <div className='container-user'>
      <Navigation />
      {user && <Avatar data={user} />}
      {video && <UserVideo data={video} />}
      {post && <MyPosts post={post[0]} />}
      {session === true && <Footer />}

      <style jsx>{`
            .container-user {
                
            }
            
        `}
      </style>

      <style jsx global>{`
            body {
                margin: 0;
                padding: 0;
                min-height: 100vh; 
                background: #c31432;
            }
            body::-webkit-scrollbar {
                width: 10px;
            }
            body::-webkit-scrollbar-thumb {
                border-radius: 4px;
                background: orange;
            }
            body::-webkit-scrollbar-track {
                background: #c31432;
                border-radius: 4px;
            }

        `}
      </style>

    </div>
  )
}
