import { useEffect, useState } from 'react'
import { newPro, redirectIfNotAdmin } from '../../services/user'
import Layout from '../../components/Layout'

export default function FormCs () {
  const [pro, setPro] = useState('')
  const [professional, setProfessional] = useState('')

  useEffect(() => {
    redirectIfNotAdmin()
  }, [])

  const handleFondoChange = (e) => {
    setPro(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('pro', pro)
    formData.append('professional', professional)

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    const newP = await newPro(formData, config)
    console.log(newP)
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <input type='file' name='pro' id='input' onChange={handleFondoChange} />
        <label htmlFor='input'>Buscar</label>
        <input
          type='text' name='professional' placeholder='Professional'
          onChange={(e) => setProfessional(e.target.value)}
        />
        <button type='submit'>Enviar</button>
      </form>

      <style jsx>{`
                    form {
                        display: grid;
                        top: 20%;
                        position: relative;
                    }
                    label{
                        width: 100%;
                        margin-top: 1rem;
                        display: flex;
                        justify-content: center;
                        margin: auto;
                        width: 160px;
                        height: 30px;
                        color: white;
                        border-radius: 10px;
                        background-color: indigo;
                        text-align: center;
                        cursor: pointer;
                        line-height: 30px;
                    }
                    input {
                        padding: 15px 25px;
                        color: white;
                        background: #382cf3;
                        font-size: 18px;
                        text-align: center;
                    }
                    #input[type="file"] {
                        display: none;
                    }
                    button {
                        width: 100px;
                        margin-left: 40%;
                        font-size: 15px;
                        color: white;
                        background: indigo;
                        border: none;
                    }
                `}
      </style>
    </Layout>
  )
}
