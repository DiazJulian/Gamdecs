import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faStar, faEye, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { deletePost, postFav, postLike } from '../../services/post';
import Router from 'next/router';
import { useSession } from '../../hooks/useSession';


export default function Button (props) {

    const { post } = props
    const { userSession, isAdmin } = useSession()
    const [likes, setLikes] = useState(props.post.likes)
    const [favs, setFavs] = useState(props.post.favs)
    const [liked, setLiked] = useState(false)
    const [faved, setFaved] = useState(false)

    const handleFav = async (props) => {
        const post = await postFav(props.imagePath)
        if(post){
            setFavs(favs +1)
            setFaved(true)
        }
    }

    const handleLike = async (props) => {
        const post = await postLike(props.imagePath)
        if(post){
            setLikes(likes +1)
            setLiked(true)
        }
    }

    const handleDelete = async (props) => {
        const postDeleted = await deletePost(props._id)
        if(postDeleted){
            Router.push(`/${props.user}`)
        }
    }

        return(
            <span>
            { !faved ?
                <button className="iconStar" onClick={()=> handleFav(post)}>
                <i>
                    <FontAwesomeIcon icon={faStar} /> {favs}
                </i>
                </button>
                :
                <i className="faved" >
                    <FontAwesomeIcon icon={faStar} /> {favs}
                </i>
            }
            {   !liked ?
                <button className="iconLike" onClick={()=> handleLike(post)}>
                <i>
                    <FontAwesomeIcon icon={faThumbsUp} /> {likes}
                </i>
                </button>
                :
                <i className="liked">
                    <FontAwesomeIcon icon={faThumbsUp} /> {likes}
                </i>
            }
            <i>
                <FontAwesomeIcon icon={faEye} /> {post.views}
            </i>
            {
                (userSession === post.user || isAdmin ) &&
                <button className="iconDelete" onClick={()=> handleDelete(post)}>
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
            `}</style>

        </span>
    )
}