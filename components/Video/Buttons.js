import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faStar, faEye, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { getSession, userAdmin } from '../../services/user'
import { deleteVideo, videoFav, videoLike } from '../../services/post'
import Router from 'next/router'

export default function Button (props) {
  const [post] = useState(props.post)
  const [user, setUser] = useState(null)
  const [isAdmin, setAdmin] = useState(false)
  const [likes, setLikes] = useState(props.post.likes)
  const [favs, setFavs] = useState(props.post.favs)
  const [liked, setLiked] = useState(false)
  const [faved, setFaved] = useState(false)

  useEffect(async () => {
    const res = await getSession()
    if (res) {
      setUser(res.name)
    }
    const admin = await userAdmin()
    if (admin) {
      setAdmin(true)
    }
  }, [])

  const handleFav = async (props) => {
    const post = await videoFav(props.videoId)
    if (post) {
      setFavs(favs + 1)
      setFaved(true)
    }
  }

  const handleLike = async (props) => {
    const post = await videoLike(props.videoId)
    if (post) {
      setLikes(likes + 1)
      setLiked(true)
    }
  }

  const handleDelete = async (props) => {
    const postDeleted = await deleteVideo(props._id)
    if (postDeleted) {
      Router.push(`/${props.user}`)
    }

    console.log(postDeleted)
  }

  console.log(user)
  return (
    <span>
      {!faved
        ? <button className='iconStar' onClick={() => handleFav(post)}>
          <i>
            <FontAwesomeIcon icon={faStar} /> {favs}
          </i>
          </button>
        : <i className='faved'>
          <FontAwesomeIcon icon={faStar} /> {favs}
          </i>}
      {!liked
        ? <button className='iconLike' onClick={() => handleLike(post)}>
          <i>
            <FontAwesomeIcon icon={faThumbsUp} /> {likes}
          </i>
          </button>
        : <i className='liked'>
          <FontAwesomeIcon icon={faThumbsUp} /> {likes}
          </i>}
      <i>
        <FontAwesomeIcon icon={faEye} /> {post.views}
      </i>
      {
                (user === post.user || isAdmin) &&
                  <button className='iconDelete' onClick={() => handleDelete(post)}>
                    <i>
                      <FontAwesomeIcon icon={faTrash} />
                    </i>
                  </button>
            }

      <style jsx>{`
             span {
                 width: 100%;
                 display: flex;
                 justify-content: space-between;
                 margin-top: 5px;
                 padding: 0 5%;
                }
                .iconStar {
                    background: none;
                    border: transparent;
                    cursor: pointer;
                }
                .iconLike {
                    background: none;
                    border: transparent;
                    cursor: pointer;
                }
                .iconDelete {
                    background: none;
                    border: transparent;
                    height: 100%;
                    cursor: pointer;
                }
                i {
                    color: white;
                }
                .iconStar i:hover {
                    color: yellow;
                }
                .iconLike i:hover {
                    color: orange;
                }
                .iconDelete i:hover {
                    color: red;
                }
                .faved {
                    color: yellow;
                }
                .liked {
                    color: orange;
                }
            `}
      </style>

    </span>
  )
}
