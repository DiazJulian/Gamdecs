import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { deleteRed, newRed } from '../services/user'
import Router from 'next/router'
import { useSession } from '../hooks/useSession'

export default function Avatar ({ data }) {
  const [input1, setInput1] = useState('https://')
  const [input2, setInput2] = useState('https://')
  const [input3, setInput3] = useState('https://')
  const {userSession, isAdmin} = useSession()

  const SubmitUno = async (e) => {
    e.preventDefault()
    const newR = await newRed(userSession, input1)
    if (newR) {
      Router.push(`/${userSession}`)
    }
  }

  const SubmitDos = async (e) => {
    e.preventDefault()
    const newR = await newRed(userSession, input2)
    if (newR) {
      Router.push(`/${userSession}`)
    }
  }

  const SubmitTres = async (e) => {
    e.preventDefault()
    const newR = await newRed(userSession, input3)
    if (newR) {
      Router.push(`/${userSession}`)
    }
  }

  const dltRed = async (id) => {
    const red = await deleteRed(id)
    if (red) {
      Router.push(`/${userSession}`)
    }
  }

  return (
    <>
      <div className='container'>
        {(data.user === null)
          ? <h1 className='no-user'>Usuario incorrecto</h1>
          : <>
            <div className='avatar-container'>
              <img src={data.user.profileImage} />
              <h1>{data.user.name}</h1>
            </div>
            {data.redes &&
              <>
                <div className='card-red'>
                  <article>
                    {(data.redes[0])
                      ? <a key={data.redes[0]._id} href={data.redes[0].red} target='_blank' rel='noreferrer'>{data.redes[0].red}</a>
                      : <>
                        {(userSession === data.user.name) &&
                          <form onSubmit={SubmitUno}>
                            <input
                              name='input1' className='red-input' defaultValue={input1}
                              onChange={(e) => setInput1(e.target.value)}
                            />
                            {(input1.length > 20) &&
                              <button className='check-button' type='submit'>
                                <i className='check-icon'>
                                  <FontAwesomeIcon icon={faCheckCircle} />
                                </i>
                              </button>}
                          </form>}
                        </>}
                  </article>
                  {((userSession === data.user.name && data.redes[0]) || isAdmin) &&
                    <button onClick={() => dltRed(data.redes[0]._id)}>
                      <i className='trash-icon'>
                        <FontAwesomeIcon icon={faTrash} />
                      </i>
                    </button>}

                </div>

                <div className='card-red'>
                  <article>
                    {(data.redes[1])
                      ? <a key={data.redes[1]._id} href={data.redes[1].red} target='_blank' rel='noreferrer'>{data.redes[1].red}</a>
                      : <>
                        {(userSession === data.user.name) &&
                          <form onSubmit={SubmitDos}>
                            <input
                              name='input2' className='red-input' defaultValue={input1}
                              onChange={(e) => setInput2(e.target.value)}
                            />
                            {(input2.length > 20) &&
                              <button className='check-button' type='submit'>
                                <i className='check-icon'>
                                  <FontAwesomeIcon icon={faCheckCircle} />
                                </i>
                              </button>}
                          </form>}
                      </>}
                  </article>
                  {((userSession === data.user.name && data.redes[1]) || isAdmin) &&
                    <button onClick={() => dltRed(data.redes[1]._id)}>
                      <i className='trash-icon'>
                        <FontAwesomeIcon icon={faTrash} />
                      </i>
                    </button>}
                </div>

                <div className='card-red'>
                  <article>
                    {(data.redes[2])
                      ? <a key={data.redes[2]._id} href={data.redes[2].red} target='_blank' rel='noreferrer'>{data.redes[2].red}</a>
                      : <>
                        {(userSession === data.user.name) &&
                          <form onSubmit={SubmitTres}>
                            <input
                              name='input3' className='red-input' defaultValue={input1}
                              onChange={(e) => setInput3(e.target.value)}
                            />
                            {(input3.length > 20) &&
                              <button className='check-button' type='submit'>
                                <i className='check-icon'>
                                  <FontAwesomeIcon icon={faCheckCircle} />
                                </i>
                              </button>}
                          </form>}
                      </>}
                  </article>
                  {((userSession == data.user.name && data.redes[2]) || isAdmin) &&
                    <button onClick={() => dltRed(data.redes[2]._id)}>
                      <i className='trash-icon'>
                        <FontAwesomeIcon icon={faTrash} />
                      </i>
                    </button>}

                </div>
              </>}
        </>}
      </div>
      <div className='design' />
      <div className='design2' />

      <style jsx>{`
                .no-user {
                    color: white;
                    line-height: 8;        
                }
                .container {
                    height: 250px;
                    width: 100%;
                    padding-top: 20px;
                    background: black;   
                    text-align: center;
                    border-radius: 0 0 70px 0px;
                }
                .avatar-container {
                    text-align: center;
                    margin-top: 50px;
                    height: 150px;
                }
                img {
                    height: 90px;
                    width: 90px;
                    border-radius: 10px;
                }
                h1 {
                    font-size: 20px;
                    color: white;
                }
                .card-red {
                    width: 100%;
                    display: flex;
                }
                article {
                    text-align: center;
                    width: 60%;
                    height: 20px;
                    margin-left: 10px;
                    margin-right: 5px;
                    overflow: auto;
                    background: #ff00cc;  /* fallback for old browsers */
                    background: -webkit-linear-gradient(to right, #333399, #ff00cc);  /* Chrome 10-25, Safari 5.1-6 */
                    background: linear-gradient(to right, #333399, #ff00cc); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                    position: relative;
                    background-color: rgba(0,0,0,0.01);
                    border-radius: 8px;  
                    padding: 5px;
                    box-shadow: 5px 5px 10px 0 rgba(0,0,0,0.50),
                                    0 -2px 15px -10px rgba(255,255,255,0.8);

                }
                article::-webkit-scrollbar {
                    display: none;
                }
                form {
                    display: flex;
                }
                button {
                    padding: 0;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                }
                a{
                    color: white;
                    font-size: 10px;
                    text-decoration: none;
                }
                .red-input {
                    width: 95%;
                    font-size: 9px;
                    background: transparent;
                    text-align: center;
                    color: white;
                }
                .check-icon {
                    color: lime;
                    margin-left: 2px;
                }
                .trash-icon {
                    color: red;
                }
                .design {
                    width: 100%;
                    height: 70px;
                    background: black;
                    position: relative;
                    border: transparent;
                    z-index: -100;
                }
                .design2 {
                    width: 100%;
                    height: 70px;
                    background: #c31432;
                    z-index: -99;
                    position: relative;
                    top: -70px;
                    border: transparent;
                    border-radius: 100px 0 0 0;
                }
                @media screen and (min-width: 500px) {
                    .container { height: 270px; }
                    a { font-size: 15px; }
                    .red-input { font-size: 15px; }
                }
                @media screen and (min-width: 800px) {
                    .container { height: 300px; }
                }
                @media screen and (min-width: 1000px) {
                    .container { height: 320px; }
                    article { width: 40%;
                        height: 30px;}
                }
                @media only screen and (min-height: 800px) {
                    .container { padding-top: 40px;  }
                }
                @media only screen and (min-height: 960px) {
                    .container { padding-top: 50px;  }
                }
                @media only screen and (min-height: 1200px) {
                    .container { height: 500px; padding-top: 60px;  }
                    .avatar-container {
                        margin-top: 60px;
                        height: 200px; }
                    h1 { font-size: 30px; }
                }
            
            `}
      </style>
    </>
  )
}
