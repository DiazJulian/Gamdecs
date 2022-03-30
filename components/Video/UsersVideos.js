import { useEffect, useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { getVideos } from '../../services/post'
import YouTube from 'react-youtube'
import LoaderPost from '../Loaders/LoaderPost'

export default function UsersVideos () {
  const [Videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const isMounted = useRef(true)

  const updateVideos = useCallback(async () => {
    const res = await getVideos()
    if (isMounted.current) {
      setVideos(res.data)
    }
  }, [Videos])

  useEffect(() => {
    updateVideos()

    return () => {
      isMounted.current = false
    }
  }, [Videos, updateVideos])

  const opts = {
    height: '150',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      showinfo: 0
    }
  }

  return (
    <div className='container-video'>
      {Videos &&
            Videos.reverse().map(video => (
              <div key={video._id} className='posts'>
                {!loading
                  ? <>
                    <div className='user-card'>
                      <Link as={`/video/${video.videoId}`} href={`/video/${video.videoId}`}>
                        <a className='ver-video'>VER</a>
                      </Link>
                      <Link as={`/${video.user}`} href={`/${video.user}`}>
                        <a className='userPost'>
                          <img src={video.profileImage} className='profImg' />
                          <h2 className='userName'>{video.user}</h2>
                        </a>
                      </Link>
                    </div>
                    <div className='video-card'>
                      <Link as={`/post/${video.videoId}`} href={`/post/${video.videoId}`}>
                        <a className='postImg' onClick={() => setLoading(true)}>
                          <YouTube videoId={video.videoId} opts={opts} />
                        </a>
                      </Link>
                    </div>
                    </>
                  : <LoaderPost />}
              </div>
            ))}

      <style jsx>{`
            .container-video {
                width: 100%;
                display: inline-flex;
                margin-top: 70px;
                margin-bottom: 40px;
                overflow-x: auto;
                overflow-y: hidden;
                padding: 5px;
            }
            .container-video::-webkit-scrollbar {
                height: 5px;
            }
            .container-video::-webkit-scrollbar-thumb {
                border-radius: 4px;
                background: orange;
            }
            .container-video::-webkit-scrollbar-track {
                border-radius: 4px;
            }
            .posts {
                display: inline-block;
                width: 250px;
                height: 210px;
                margin-right: 5px;
            }
            .user-card {
                width: 240px;
                height: 170px;
                background: #4239d2;
                border-radius: 5%;
                display: flex;
                justify-content: space-around;
                margin-top: 30px;
                padding-bottom: 5px;
                margin-left: 10px;
            }
            .userPost {
                display: flex;
                height: 10%;
                text-decoration: none;
                position: relative;
                top: 90%;
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
            .video-card {
                height: 155px;
                width: 220px;
                padding: 10px;
                top: -200px;
                border-radius: 5%;
                background: #000;
                position: relative;
            }
            .ver-video{
                color: white;
                position: relative;
                top: 90%;
                text-decoration: none;
                height: 0;
            }

            @media only screen and (min-width: 360px) {
                .posts { width: 290px;  }
                .user-card { width: 280px; }
                .video-card { width: 260px; }
                }
            @media only screen and (min-width: 400px) {
                .posts { width: 360px;  }
                .user-card { width: 350px; }
                .video-card { width: 325px; }
            }
            @media only screen and (min-width: 540px) {
                .posts { width: 510px; 
                         height: 280px }
                .user-card { width: 480px;
                             height: 230px; }
                .video-card { width: 430px;
                             height: 180px;
                             top: -260px;
                             padding: 20px; }
                .profImg {
                    height: 20px;
                    width: 20px; }
                .userName { font-size: 15px; }
                .postImg {  height: 90%; }
                .ver-video { font-size: 20px; }
            }
            // @media only screen and (min-width: 660px) {
            //     .posts { height: 400px;  }
            //     .user-card { height: 375px; }
            //     .video-card { top: -350px;
            //         height: 370px; }
            // }
            // @media only screen and (min-width: 760px) {
            //     .posts { height: 500px;  }
            //     .user-card { height: 460px; }
            //     .video-card { top: -410px;
            //         height: 440px; }
            //     .profImg {
            //         height: 30px;
            //         width: 30px; }
            //     .userPost { padding-top: 8px; }
            //     .userName {
            //         font-size: 20px; }
            // }
            // @media only screen and (min-width: 900px) {
            //     .container-video { padding: 30px; }
            //     .posts { height: 600px;  }
            //     .user-card { height: 550px; }
            //     .video-card { top: -500px;
            //         height: 540px; }
            //     .profImg { margin-left: 20px; }
            // }
            // @media only screen and (min-width: 1000px) {
            //     .posts { height: 650px;  }
            //     .user-card { height: 600px; }
            //     .video-card { top: -555px;
            //         height: 600px; }
            //     a {  height: 6%; }
            //     .postImg {  height: 92%; } 
            // }
            // @media only screen and (min-width: 1300px) {
            //     .posts { height: 700px;  }
            //     .user-card { height: 650px; }
            //     .video-card { top: -600px;
            //         height: 640px; }
            // }
            // @media only screen and (min-height: 950px) {
            //     .container-video { 
            //         margin-top: 80px;
            //         margin-bottom: 60px; }
            // }
            // @media only screen and (min-height: 1200px) {
            //     .container-video { 
            //         margin-top: 100px;
            //         margin-bottom: 80px; }   
            // }
            `}
      </style>
    </div>
  )
}
