import React from 'react'
import Layout from '../components/Layout'

export default function Terminos () {
  return (
    <Layout>
      <div>
        <h2>Qué se trata en estos términos</h2>
        <p>
          Sabemos que es tentador saltarse estos Términos del Servicio, pero es importante determinar qué puedes esperar de nosotros al usar los servicios de Gamdecs y qué esperamos nosotros de ti.
          Estos Términos del Servicio reflejan la forma de trabajar de Gamdecs como empresa, las leyes por las que nos regimos y determinados aspectos que siempre hemos creído que son ciertos.
          Por ello, estos Términos del Servicio ayudan a definir la relación que tiene Gamdecs contigo cuando interactúas con nuestros servicios. Por ejemplo, estos términos incluyen las siguientes secciones:
        </p>
      </div>

      <style jsx>{`
                div {
                    padding: 10px;
                    color: white;
                }
                h2 {
                    font-size: 15px;

                }
                p {
                    font-size: 10px;
                }
            `}
      </style>
    </Layout>
  )
}
