import YouTube from 'react-youtube';
import Link from 'next/link';

export default function IntructorPosts (props) {

    const video = props.data;
    console.log(video);
    const opts = {
        height: '220',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
            showinfo: 0,
        }
    }
    return (
        <>
            {(!video.length > 0) ? <section></section>
                :
                <div className="row">
                    {video.map(video => (
                        <div>
                            <div className="posts">
                                <YouTube videoId={video.videoId} opts={opts} />
                            </div>
                            <div className="video">
                                <Link href={`/video/${video.videoId}`}>
                                    <button>VER</button>
                                </Link>
                            </div>
                        </div>
                    ))
                    }
                </div>
            }

            <style jsx>{`
                    .row {
                        height: 250px;
                        width: 100%;
                        margin-top: -100px;
                        display: inline-flex;
                        position: relative;
                        overflow-x: auto;
                        overflow-y: hidden;
                    }
                    .row::-webkit-scrollbar {
                        display: none;
                    }
                    .posts {
                        width: 240px;
                        height: 220px;
                        background: #acb6e5;  /* fallback for old browsers */
                        background: -webkit-linear-gradient(to right, #86fde8, #acb6e5);  /* Chrome 10-25, Safari 5.1-6 */
                        background: linear-gradient(to right, #86fde8, #acb6e5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                        padding: 10px;
                        margin: 5px;
                        border-radius: 20px;
                    }
                    .video {
                        height: 210px;
                        width: 260px;
                        text-align: center;
                        line-height: 12;
                        position: relative;
                        top: -220px;
                        left: 5px;
                    }
                    button {
                        width: 80%;
                        height: 50px;
                        cursor: pointer;
                        font-size: 20px;
                        font-weight: 700;
                        border: transparent;
                        color: #8a006f;
                        background: #c7c1c2;
                        border-radius: 10px;
                        box-shadow: 5px 5px 30px 10px #f0f,
                                    0 -2px 15px -10px #f0f;
                    }
                    section {
                        margin-top: -80px;
                    }

                    @media screen and (min-width: 350px) {
                        .posts {
                            width: 300px;
                        }
                        .video {
                            left: 35px;
                        }
                    }
                    @media screen and (min-width: 400px) {
                        .posts {
                            width: 350px;
                        }
                        .video {
                            left: 50px;
                        }
                    }
                    @media screen and (min-width: 530px) {
                        .posts {
                            width: 450px;
                        }
                        .video {
                            left: 100px;
                        }
                        button {
                            font-size: 30px;
                            width: 90%;
                            height: 80px;
                        }    
                    }
                    
                `}</style>
        </>

    )
}