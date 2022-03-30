import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';


export default function About() {
    return(
        <>
            <div>
                <article className="Gamdecs">
                    <img src="https://res.cloudinary.com/dhehnqygp/image/upload/v1611868434/Logo-G_hai54z.png" alt="imagen" /> Gamdecs
                    <h2>Proyecto personal de desarrollo web</h2>
                    <Link href="/terminos" >
                        <h4>Terminos y condiciones de uso</h4>
                    </Link>
                </article>
                <article className="contacto">
                    <h3>Contactos</h3>
                    <a rel="noopener noreferrer" href="https://www.instagram.com/diazjulian8" target="_blank">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a rel="noopener noreferrer" href="https://www.linkedin.com/in/diazjulian8" target="_blank">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a rel="noopener noreferrer" href="https://www.github.com/diazjulian" target="_blank">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                </article>
            </div>

            <style jsx>{`
                div {
                    height: 100px;
                    width: 100%;
                    background: #03091e;
                    display: flex;
                }
                .Gamdecs {
                    width: 65%;
                    padding: 15px;
                    color: white;
                }
                img {
                    height: 20px;
                    width: 20px;
                }
                h2 {
                    color: white;
                    font-size: 12px;
                }
                h4 {
                    font-size: 8px;
                    margin: 0;
                    cursor: pointer;
                }
                h4:hover {
                    color: orange;
                }
                .contacto {
                    text-align: center;
                    width: 35%;
                }
                h3 {
                    color: white;
                    font-size: 12px;
                }
                a {
                    color: white;
                    text-decoration: none;
                    margin: 5px;
                }
                p{
                    font-size: 12px;
                    color: white;
                    background: #03091e;
                    width: 100%;    
                    margin: 0;
                    text-align: center;
                    padding: 5px 0;
                }

                @media only screen and (orientation: landscape) {
                    .Gamdecs { width: 80%; }
                    .contacto { width: 20%; }
                    h2 { font-size: 16px; }
                    h4 { font-size: 11px;
                         width: 200px;}
                    a { margin: 10px; }                    
                }

            `}</style>
        </>
    )
}