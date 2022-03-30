import Link from 'next/link'
import Profile from './Profile'
import Logo from '../public/Logo3.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useSession } from '../hooks/useSession'

export default function Navigation () {
  const {session} = useSession()

  return (
    <nav className='navigation'>
      <div className='logo'>
        <Link href='/'><a><Logo /></a></Link>
      </div>
      {
        !session
          ? <nav>
            <Link href='/login'>
              <a>Iniciar Sesion</a>
            </Link>
            <Link href='/register'>
              <a>Crear Cuenta</a>
            </Link>
            </nav>
          : <nav className='nav-icon'>
            <Link href='/update/image'>
              <i className='icon'>
                <FontAwesomeIcon icon={faPlus} />
              </i>
            </Link>
            <Profile />
          </nav>

      }

      <style jsx>{`
            .navigation{ 
                position: fixed;
                width: 89%;
                height: 5%;
                border-radius: 10px;
                padding: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                z-index: 2;
            }
            .navigation .logo {
                background: transparent;
            }
            
            .navigation .logo img {
                width: 35px;
                vertical-align: top;
                margin-right: 5px;
            }
            
            .navigation .logo a {
                font-size: 15px;
                text-decoration: none;
                color: white;
            }
            
            nav {
                background: transparent;
                display: flex;
            }
            
            nav a {
                padding: 3px;
                font-size: 10px;
                background: transparent;
                color: lightcyan;
                text-decoration: none;
            }
            .nav-icon {
                width: 75px;
                display: flex;
                justify-content: space-between;
            }
            .icon {
                background: #ff00cc;  /* fallback for old browsers */
                background: -webkit-linear-gradient(to right, #333399, #ff00cc);  /* Chrome 10-25, Safari 5.1-6 */
                background: linear-gradient(to right, #333399, #ff00cc); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                width: 20px;
                height: 20px;
                border-radius: 50%;
                padding-left: 6px;
                padding-top: 4px;
                cursor: pointer;
                color: #00dfff;
            }

            @media screen and (min-width: 400px) {
                .navigation {
                    width: 90%
                } 
            }
            @media screen and (min-width: 500px) {
                .navigation {
                    width: 92%;
                }
            }
            @media screen and (min-width: 600px) {
                .navigation {
                    width: 93%;
                }
            }
            @media screen and (min-width: 520px) and (orientation: landscape) {
                .navigation {  width: 94% }            
            }
            @media screen and (min-width: 700px) {
                .navigation {
                    width: 95%;
                }
            }
            @media screen and (min-width: 800px) {
                .navigation {
                    width: 96%;
                }
            }
            @media screen and (min-width: 1100px) {
                .navigation {
                    width: 97%;
                }
            }


            `}
      </style>

    </nav>
  )
}
