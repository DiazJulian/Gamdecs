import React, { useEffect, useState } from 'react'
import { newImageComment, newVideoComment, getVideoPost, getUserPost, deleteComment, filter } from '../../services/post'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import ListComment from './ListComments'
import { useSession } from '../../hooks/useSession'

export default function CommentForm (props) {
  const { site, path } = props
  
  const [userPost, setUserPost] = useState('')
  const [comment, setComment] = useState('')
  const [allComment, setAllComment] = useState([])
  const { userSession, profileImage, isAdmin } = useSession()
  
  useEffect(() => {
    handleNewComment()
  }, [])

  const handleNewComment = async () => {
    const res = site === 'Image'
      ? await getUserPost(path)
      : await getVideoPost(path)
    setAllComment(res.data.comment)
    setUserPost(res.data.post.user)
  }

  const handleComment = (e) => {
    const valor = e.target.value
    const newValor = filter(valor)

    setComment(newValor)
  }

  const handleDeleteComment = async (props) => {
    const commentDeleted = await deleteComment(props._id)
    if (commentDeleted) {
      handleNewComment()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newCom = site === 'Image'
      ? await newImageComment(path, comment, profileImage, userSession)
      : await newVideoComment(path, comment, profileImage, userSession)
    if (newCom) {
      handleNewComment()
      Array.from(document.querySelectorAll('input')).forEach(
        input => (input.value = '')
      )
    }
  }

  return (
    <>
      <p>Comentarios: {allComment.length}</p>
      <ListComment comment={allComment} userSession={userSession} userPost={userPost} admin={isAdmin} deleteComment={handleDeleteComment} />
      <form onSubmit={handleSubmit}>
        <div className='newComment'>
          <img src={profileImage} alt='user' />
          <input
            name='comment' placeholder='Agrega un comentario...'
            onChange={handleComment} defaultValue={comment}
          />
          {
                        comment.length > 0 &&
                          <button type='submit'>
                            <i className='icon'>
                              <FontAwesomeIcon icon={faPaperPlane} />
                            </i>
                          </button>
                    }
        </div>
      </form>

      <style jsx>{`
                p {
                    margin-top: 20px;
                    margin-bottom: 0;
                    color: white;
                }
                form {
                    margin-bottom: 40px;
                    width: 100%;
                    margin-top: 1px;
                }
                .newComment {
                    display: flex;
                    padding: 5px;
                    width: 100%;
                }
                .newComment img {
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    border: 2px solid indigo;
                }
                input {
                    background: #4d00a2;
                    color: white;
                    border-radius: 5px;
                    width: 70%;
                    padding: 7px 15px;
                    border: transparent;
                }
                button {
                    background: none;
                    border: transparent;
                }
                .icon {
                    color: white;
                }
                .delIcon {
                    height: 5px;
                }
                
                @media only screen and (min-width: 500px) {
                    form {  
                        margin-left: 60px;
                        margin-top: 30px;
                        margin-bottom: 80px;  }
                    }
                @media only screen and (min-width: 500px) and (orientation: landscape) {
                    form {  
                        margin-left: 60px;
                        margin-top: 30px;  }
                    }
                    // @media only screen and (orientation: landscape) {
                    //     .comment-box .comment-head {
                    //         height: 40px;
                    //     }
                    // }
                
            `}
      </style>
    </>
  )
}
