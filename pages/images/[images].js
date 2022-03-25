import { useEffect } from 'react'
import Image from 'next/image'
import Layout from '../../components/Layout'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import CommentForm from '../../components/Comments/CommentForm'
import Buttons from '../../components/Posts/Buttons'
import { getUser, redirectIfNotAuth } from '../../services/user'
import { deletePost, getUserPost } from '../../services/post'
import useTimeAgo from '../../hooks/useTimeAgo'

Images.getInitialProps = async (context) => {
  let postUser
  const Path = context.query.images

  try {
    const res = await getUserPost(Path)
    postUser = res.data
  } catch (err) {
    console.log(err)
  }

  return { postUser, Path }
}

export default function Images ({ postUser, Path }) {
  const { createdAt } = postUser.post
  const date = new Date(createdAt)
  const postTime = useTimeAgo(+date)

  useEffect(async () => {
    redirectIfNotAuth()

    const post = postUser.post
    const limit = 'hace 1 día' || 'hace 2 días' || 'hace 3 días' || 'hace 4 días'
    const user = await getUser(post.user)
    if ((postTime === limit) && user.data.user.role === 'Normal') {
      await deletePost(post._id)
    }
  }, [])

  const { post } = postUser
  console.log(postTime)

  return (
    <Layout>
      <Navigation />
      <div className='profile'>
        <a href={`/${post.user}`}>
          <img src={post.profileImage} alt='' />
          <h2>{post.user}</h2>
        </a>
        <h3>{post.description}</h3>
      </div>
      <div className='container'>
        <Image layout='fill' src={`/${Path}`} />
      </div>
      <Buttons post={post} />
      <p>{postTime.toLowerCase()}</p>
      <CommentForm site='Image' path={Path} />
      <Footer />

      <style jsx>{`
                .container {
                    display: flex;
                    overflow: hidden;
                    width: 100%;
                    height: 70vh;
                    position: relative;
                }
                .profile {
                    width: 100%;
                    margin-top: 60px;
                    margin-left: 10px;

                }
                a {
                    text-decoration: none;
                    height: 30px;
                    display: flex; 
                }
                img {
                    margin-right: 5px;
                    height: 20px;
                    width:20px;
                    border-radius: 5px;
                }
                h2 {
                    top: -10px;
                    font-size: 14px;
                    position: relative;
                    color: orange;
                }
                h3 {
                    font-size: 16px;
                    color: #c3c2c2;
                }
                p {
                    font-size: 14px;
                    color: #c3c2c2;
                    margin: 0;
                    width: 100%;
                    margin-top: 10px;
                }
                
                @media screen and (min-height: 800px) {
                    .container { 
                        height: 80vh; }
                    .profile {    margin-top: 70px;   }
                    a {    height: 50px;   }
                    img {
                        height: 25px;
                        width:25px; }
                    h2 { font-size: 18px;    }
                    p { font-size: 20px;    }
                    }
                @media screen and (min-width: 1000px) {
                    img {
                        height: 35px;
                        width: 35px; }
                    h2 { font-size: 25px;    }
                    }
                @media screen and (min-height: 1000px) {
                    .profile {
                        margin-top: 100px;
                    }
                }
                @media screen and (min-width: 300px) and (orientation: landscape) {
                    .container { 
                        height: 95vh;
                        margin: 5px 32% ; }
                }
                @media screen and (min-width: 900px) and (orientation: landscape) {
                    .container { 
                        height: 95vh;
                        margin: 5px 29% ; }
                }
            `}
      </style>

    </Layout>
  )
}
