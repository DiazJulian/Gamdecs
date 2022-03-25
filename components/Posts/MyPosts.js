import Link from 'next/link'
import Image from 'next/image'

export default function MyPosts ({ post }) {
  return (
    <div className='container'>
      {post &&
            [post].map(post => (
              <div key={post._id} className='posts'>
                <Link as={`/images/${post.imagePath}`} href={`/images/${post.imagePath}`}>
                  <div className='postImg'>
                    <Image src={post.imagePath} layout='fill' />
                  </div>
                </Link>
              </div>
            ))}

      <style jsx>{`
                .container {
                    width: 100%;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    margin-top: 10px;
                    margin-bottom: 40px;
                    }
                    
                .posts {
                    // display: inline-block;
                    width: 100%;
                    height: 170px;
                }
                a {
                    display: flex;
                    height: 5%;
                }
                .profImg {
                    height: 15px;
                    width: 15px;
                }
                .userName {
                    font-size: 10px;
                    color: white;
                }
                .description {
                    font-size: 8px;
                    color: white;
                    height: 8%;
                    overflow: scroll;
                }
                .description::-webkit-scrollbar {
                    display: none;
                }
                .postImg {
                    height: 100%;
                    width: 98%;
                    border-radius: 10px;
                    position: relative;
                    cursor: pointer;
                }

                @media only screen and (min-width: 360px) {
                    .posts { height: 220px;  }
                }
                @media only screen and (min-width: 460px) {
                    .posts { height: 270px;  }
                }
                @media only screen and (min-width: 560px) {
                    .posts { height: 340px;  }
                }
                @media only screen and (min-width: 660px) {
                    .posts { height: 400px;  }
                }
                @media only screen and (min-width: 760px) {
                    .posts { height: 450px;  }
                }
                @media only screen and (min-width: 900px) {
                    .posts { height: 560px;  }
                }
                @media only screen and (min-width: 1000px) {
                    .posts { height: 650px;  }
                }
                @media only screen and (min-width: 1300px) {
                    .posts { height: 700px;  }
                }
                    `}
      </style>
    </div>
  )
}
