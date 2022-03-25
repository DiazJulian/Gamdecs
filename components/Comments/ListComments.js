import CommentUI from './CommentUI';

export default function ListComment(props) {

    const {comment,userSession,userPost,admin,deleteComment} = props

    console.log(comment, userSession, userPost, admin);
    return  (
        <>
            <div className="comments-container">
                <ul className="comments-list">
                    { comment &&
                        comment.map(item =>(
                        <CommentUI key={item._id} userSession={userSession} userPost={userPost} admin={admin} {...item} deleteComment={deleteComment} />
                        ))
                    }
                </ul>
            </div>

        <style jsx>{`
            a {
                text-decoration: none;
            }
            ul {
                list-style-type: none;
            }
            button {
                background: none;
                border: transparent;
            }
            body {
                font-family: Arial, Helvetica, sans-serif;
                background: #dee1e3;
            }
            
            /* Lista de comentarios */
            
            .comments-container {
                width: 100%;
                // margin-bottom: 5px;
            }
            .comments-list {
                margin-top: 10px;
                position: relative;
            }
            .comments-list li {
                margin-bottom: 5px;
                display: block;
                position: relative;
            }
            .comments-list li:after {
                content: '';
                display: block;
                clear: both;
                height: 0;
                width: 0;
            }
            
            /* Avatar */
            
            .comments-list .comment-avatar {
                width: 18px;
                height: 20px;
                position: relative;
                float: left;
                border: 2px solid orange;
                border-radius: 10px;
                overflow: hidden;
                z-index: 1;
            }
            .comments-list .comment-avatar img {
                width: 100%;
                height: 100%;
            }
            
            .comment-main-level {
                margin-left: -35px;
                overflow: hidden;
            }
            
            /* Caja del comentario */
            
            .comments-list .comment-box {
                width: 91%;
                float: right;
                position: relative;
            }
            .comment-box .comment-head {
                height: 40px;
                background: #4d00a2;
                padding: 0 10px;
                // border-bottom: 1px solid #e5e5e5;
                overflow: hidden;
                border-radius: 4px 4px 0 0;
            }
            .comment-box .comment-head span {
                float: right;
                position: relative;
                display: flex;
                // top: 10px;
            }
            .comment-box .comment-head span p {
                color: white;
                font-size: 10px;

            }
            .comment-box .comment-head span i {
                position: relative;
                top: 2px;
                color: #a6a6a6;
                cursor: pointer;
            }
            .comment-box .comment-head span i:hover {
                color: red;
            }
            .comment-box .comment-name {
                color: orange;
                font-size: 12px;
                font-weight: 700;
                float: left;
                margin-right: 10px;
            }
            .comment-box .comment-name a {
                color: #283035;
            }
            .comment-box .comment-content {
                background: #4d00a2;
                border-radius: 0 0 4px 4px;
                padding: 5px;
            }
            .comment-box .comment-content p {
                color: white;
                font-size: 12px;

            }
            
            @media only screen and (min-width: 400px) {
                .comments-list .comment-box { width: 93%; },
            }
            @media only screen and (min-width: 500px) {
                .comments-list .comment-avatar { height: 25px; width: 25px; },
                .comment-box .comment-name { font-size: 15px; },
                .comment-box .comment-head span p { font-size: 14px; },
                .comment-box .comment-content p { font-size: 18px;  }
            }
            @media only screen and (min-width: 600px) {
                .comments-list .comment-box { width: 95%; },
            }
            @media only screen and (min-width: 900px) {
                .comments-list .comment-avatar { height: 30px; width: 30px; },
            }
            @media only screen and (min-width: 1000px) {
                .comments-list .comment-box { width: 96%; },
            }
            @media only screen and (min-width: 1300px) {
                .comments-list .comment-box { width: 97%; },
            }
        `}</style>
        </>
    )
}