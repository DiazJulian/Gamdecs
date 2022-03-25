import { useEffect } from 'react'
import Layout from '../../components/Layout'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Youtube from 'react-youtube'
import { getUser, redirectIfNotAuth } from '../../services/user'
import { deleteVideo, getVideoPost } from '../../services/post'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import relativeTime from 'dayjs/plugin/relativeTime'
import Buttons from '../../components/Video/Buttons'
import CommentForm from '../../components/Comments/CommentForm'
dayjs.extend(relativeTime)
dayjs.locale('es')

PostVideo.getInitialProps = async (context) => {
  let postUser
  const Path = context.query.video

  try {
    const res = await getVideoPost(Path)
    postUser = res.data
  } catch (err) {
    console.log(err)
  }

  return { postUser, Path }
}

export default function PostVideo ({ postUser, Path }) {
  useEffect(async () => {
    redirectIfNotAuth()

    const post = postUser.post
    const time = dayjs(post.time).fromNow(true)
    const user = await getUser(post.user)
    console.log(user.data)
    if (time === '1 día' && user.data.role === 'Normal') {
      const postDeleted = await deleteVideo(post._id)
      console.log(postDeleted)
    }
  }, [])

  console.log(Path)
  console.log(postUser)

  const opts = {
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      showinfo: 1
    }
  }

  return (
    <Layout>
      <Navigation />
      <div className='container'>
        <header className='profile'>
          <a href={`/${postUser.post.user}`}>
            <img src={postUser.post.profileImage} alt='' />
            <h2>{postUser.post.user}</h2>
          </a>
          <h3>{postUser.post.description}</h3>
        </header>
        <div className='youtube'>
          <Youtube videoId={Path} opts={opts} />
        </div>
      </div>
      <Buttons post={postUser.post} />
      <p> Hace {dayjs(postUser.post.time).fromNow(true)}</p>
      <CommentForm site='Video' path={Path} />
      <Footer />

      <style jsx>{`
                    .container {
                        width: 100%;
                        margin-top: 60px;
                    }
                    .youtube {
                        width: 100%;
                        height: 370px;
                    }
                    .profile {
                        width: 100%;
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
                        .container {    margin-top: 70px;   }
                        a {    height: 50px;   }
                        img {
                            height: 25px;
                            width:25px; }
                        h2 { font-size: 18px;    }
                        p { font-size: 20px;    }
                        }
                    @media screen and (min-width: 700px) {
                        .container { display: flex; }
                        .profile { width: 30%; }
                    }
                    @media screen and (min-width: 1000px) {
                        img {
                            height: 35px;
                            width: 35px; }
                        h2 { font-size: 25px;    }
                        }
                    @media screen and (min-height: 1000px) {
                        .container {
                            margin-top: 100px;
                        }
                    }
                   
                `}
      </style>

    </Layout>
  )
}
