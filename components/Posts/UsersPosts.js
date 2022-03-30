import { useState, useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { getUser } from '../../services/user'
import { deletePost, getPosts } from '../../services/post'
import Image from 'next/image'
import LoaderPost from '../Loaders/LoaderPost'
import useTimeAgo from '../../hooks/useTimeAgo'

export default function UsersPosts () {
  const [Posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const allPosts = async () => {
      const res = await getPosts()
      if (res) {
        setPosts(res.data)
      }
    }
    allPosts()
    handleDeletePost()
  }, [])

  const handleDeletePost = async () => {
    Posts.map(post => {
      postUser = post
      const { createdAt } = post
      const date = new Date(createdAt)
      time = useTimeAgo(+date)
    })
    let postUser
    let time
    let user
    if (postUser) { user = await getUser(postUser.user) }
    if ((time === 'hace un día' || time === 'hace 2 días') && user.data.user.role === 'Normal') {
      const postDeleted = await deletePost(postUser._id)
      if (postDeleted) {
        Router.push('/')
      }
    }
  }

  return (
    <div className='container'>
      {Posts &&
                Posts.reverse().map(post => (
                  <div key={post._id} className='posts'>
                    {!loading
                      ? <>
                        <div className='user-card'>
                          <Link as={`/${post.user}`} href={`/${post.user}`}>
                            <a className='userPost'>
                              <img src={post.profileImage} className='profImg' />
                              <h2 className='userName'>{post.user}</h2>
                            </a>
                          </Link>
                        </div>
                        <div className='post-card'>
                          <Link as={`/images/${post.imagePath}`} href={`/images/${post.imagePath}`}>
                            <a className='postImg' onClick={() => setLoading(true)}>
                              <Image src={`/${post.imagePath}`} layout='fill' className='Image' />
                            </a>
                          </Link>
                        </div>
                        </>
                      : <LoaderPost />}
                  </div>
                ))}

      <style jsx>{`
            .container {
                width: 100%;
                display: grid;
                grid-template-columns: 1fr 1fr;
                margin-bottom: 40px;
                padding: 5px;
            }
            .posts {
                display: inline-block;
                width: 100%;
                height: 200px;
            }
            .user-card {
                width: 90%;
                height: 180px;
                background: #c92544;
                border-radius: 5%;
            }
            a {
                display: flex;
                height: 10%;
                text-decoration: none;
            }
            .profImg {
                height: 15px;
                width: 15px;
                margin-left: 5px;
                margin-top: 3px;
                border-radius: 5px;
            }
            .userName {
                font-size: 12px;
                color: #ffc84c;
                line-height: 0;
                margin-left: 2px;
            }
            .post-card {
                width: 95%;
                position: relative;
                top: -160px;
                height: 175px;
                border-radius: 5%;
                background: #000;
                left: 5%;
            }
            .postImg {
                height: 90%;
                width: 92%;
                position: relative;
                top: 5%;
                left: 4%;
            }
            .Image {
                border-radius: 10px;

            }
            p{
                text-align: center;
                padding: 25% 20%;
                color: white;
            }

            @media only screen and (min-width: 360px) {
                .posts { height: 260px;  }
                .user-card { height: 235px; }
                .post-card { top: -210px;
                    height: 230px; }
                }
            @media only screen and (min-width: 440px) {
                .posts { height: 300px;  }
                .user-card { height: 280px; }
                .post-card { top: -260px;
                    height: 275px; }
            }
            @media only screen and (min-width: 540px) {
                .posts { height: 350px;  }
                .user-card { height: 325px; }
                .post-card { top: -300px;
                    height: 320px; }
                .profImg {
                    height: 20px;
                    width: 20px;
                    margin-left: 10px; }
                .userName {
                    font-size: 15px; }
                a {  height: 8%; }
                .postImg {  height: 90%; }
            }
            @media only screen and (min-width: 660px) {
                .posts { height: 400px;  }
                .user-card { height: 375px; }
                .post-card { top: -350px;
                    height: 370px; }
            }
            @media only screen and (min-width: 760px) {
                .posts { height: 500px;  }
                .user-card { height: 460px; }
                .post-card { top: -410px;
                    height: 440px; }
                .profImg {
                    height: 30px;
                    width: 30px; }
                .userPost { padding-top: 8px; }
                .userName {
                    font-size: 20px; }
            }
            @media only screen and (min-width: 900px) {
                .container { padding: 30px; }
                .posts { height: 600px;  }
                .user-card { height: 550px; }
                .post-card { top: -500px;
                    height: 540px; }
                .profImg { margin-left: 20px; }
            }
            @media only screen and (min-width: 1000px) {
                .posts { height: 650px;  }
                .user-card { height: 600px; }
                .post-card { top: -555px;
                    height: 600px; }
                a {  height: 6%; }
                .postImg {  height: 92%; } 
            }
            @media only screen and (min-width: 1300px) {
                .posts { height: 700px;  }
                .user-card { height: 650px; }
                .post-card { top: -600px;
                    height: 640px; }
            }
            @media only screen and (min-height: 950px) {
                .container { 
                    margin-top: 80px;
                    margin-bottom: 60px; }
            }
            @media only screen and (min-height: 1200px) {
                .container { 
                    margin-top: 100px;
                    margin-bottom: 80px; }   
            }
            `}
      </style>
    </div>
  )
}
