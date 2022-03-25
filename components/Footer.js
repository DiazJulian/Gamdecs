import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faPlus, faBan, faLaptopCode, faGamepad } from '@fortawesome/free-solid-svg-icons'

export default function Footer () {
  return (
    <footer>
      <Link href='/tech'>
        <i className='icon'>
          <FontAwesomeIcon style={{ height: '100%', width: '100%' }} icon={faLaptopCode} />
        </i>
      </Link>
      <Link href='/cs'>
        <i className='icon'>
          <FontAwesomeIcon style={{ height: '100%', width: '100%' }} icon={faGamepad} />
        </i>
      </Link>
      <Link href='/update/video'>
        <i className='plus'>
          <FontAwesomeIcon style={{ height: '100%', width: '100%' }} icon={faPlus} />
        </i>
      </Link>
      <Link href='/usuarios'>
        <i className='icon'>
          <FontAwesomeIcon style={{ height: '100%', width: '100%' }} icon={faUsers} />
        </i>
      </Link>
      <Link href='/logout'>
        <i className='icon'>
          <FontAwesomeIcon style={{ height: '100%', width: '100%' }} icon={faBan} />
        </i>
      </Link>

      <style jsx>{`
            footer {
                position: fixed; 
                bottom: 0;
                border-radius: 10px;
                height: 50px;
                display: flex;
                justify-content: space-around;
                width: 90%;
                z-index: 2;
                text-align: center;           }
            .icon {
                color: white;
                position: relative;
                cursor: pointer;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                padding: 5px;
                background: #c31432;
                box-shadow: 5px 5px 10px 0 rgba(0,0,0,0.50),
                                    0 -2px 15px -7px rgba(255,255,255,0.8);
            }
            .plus {
                color: white;
                position: relative;
                cursor: pointer;
                width: 30px;
                height: 30px;
                top: -5px;
                border-radius: 50%;
                padding: 5px;
                background: #ff00cc;
                background: -webkit-linear-gradient(to top,#333399,#ff00cc);
                background: linear-gradient(to top,#333399,#ff00cc);
                box-shadow: 5px 5px 10px 0 rgba(0,0,0,0.50),
                                    0 -2px 15px -7px rgba(255,255,255,0.8);
            }
            
            @media screen and (min-width: 700px) {
                footer {
                    width: 97%; }
            }
            @media screen and (min-width: 1100px) {
                footer {
                    width: 98%; }
            }
            @media only screen and (max-height: 400px) and (orientation: landscape) {
                footer { margin-bottom: 10px;
                    height: 35px; }
                .icon { width: 25px;
                    height: 25px;}
            }
            
            `}
      </style>

    </footer>
  )
}
