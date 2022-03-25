import { useEffect, useState } from 'react'
import { newCategory, redirectIfNotAdmin } from '../../services/user'

export default function FormPrem () {
  const [color1, setColor1] = useState('')
  const [color2, setColor2] = useState('')
  const [color3, setColor3] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    redirectIfNotAdmin()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newCat = await newCategory(color1, color2, color3, category)
    console.log(newCat)
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <input
          type='text' name='color1' placeholder='Background1'
          onChange={(e) => setColor1(e.target.value)}
        />
        <input type='text' name='color2' placeholder='Background2' onChange={(e) => setColor2(e.target.value)} />
        <input type='text' name='color3' placeholder='Background3' onChange={(e) => setColor3(e.target.value)} />
        <input type='text' name='category' placeholder='Category' onChange={(e) => setCategory(e.target.value)} />
        <button type='submit'>Enviar</button>
      </form>

      <style jsx>{`
                .container {
                    margin: 10px;
                    height: 100vh;
                    background: orange;
                    justify-content: center;
                }
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
    </div>

  )
}
