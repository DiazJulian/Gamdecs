import React from 'react'
import Layout from '../components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Terminos () {
  return (
    <Layout>
      <div>
        <h2>Gamdecs es solo un proyecto personal de desarrollo web.</h2>
        <p>
          <br/> <br/> <hr/> <br/> <br/>
          IMPORTANTE: <br/>
          El registro es totalmente gratuito, por lo tanto el sitio no te solicitara que abones
          algun monto de dinero para poder usarlo. 
          El modo de registro debe ser con datos ficticios (ejemplo: juan@email.com).
          El equipo de Gamdecs en ningun momento solicitara datos reales, ya que solo es un proyecto de prueba.
        </p>
        <article className="contacto">
          <br/> <br/> <hr/> <br/> <br/>
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
                    padding: 10px;
                    color: white;
                }
                h2 {
                    font-size: 18px;

                }
                p {
                    font-size: 14px;
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
            `}
      </style>
    </Layout>
  )
}
