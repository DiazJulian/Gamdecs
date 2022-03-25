import axios from 'axios'
import Router from 'next/router'

const BaseUrl = 'https://gamdecs.herokuapp.com/api'
// Manejadores de Usuario:

export const signIn = async (email, password) => {
  try {
    const res = await axios.post(`${BaseUrl}/user/login`, { email, password })
    const token = res.data

    window.localStorage.setItem('token', token)

    console.log(`Obtenido: ${token}`)
    if (res) {
      console.log('Usuario logueado')
    }
    return res.data
  } catch (error) {
    if (error.response.status === 400) return 'Usuario incorrecto'
    if (error.response.status === 401) return 'Contraseña incorrecta'
    return 'Error desconocido. Intente de nuevo'
  }
}

export const registerUser = async (formData, config) => {
  try {
    const register = await axios.post(`${BaseUrl}/user/register`, formData, config)
    if (register) { return register }
  } catch (error) {
    if (error.response.status === 400) return 'Nombre de usuario existente'
    if (error.response.status === 401) return 'Email existente'
    return 'Error desconocido. Intente de nuevo'
  }
}

export const getUser = async (name) => {
  const user = await axios.get(`${BaseUrl}/user/${name}`)
  console.log(user)

  return user
}

export const getUsers = async () => {
  const users = await axios.get(`${BaseUrl}/user/users`)
  return users
}

export const logOut = async () => {
  const deleteToken = window.localStorage.removeItem('token')

  if (deleteToken) {
    Router.push('/login')
  }
}

// Autenticacion

export const getSession = async () => {
  const token = window.localStorage.getItem('token')
  if (token) {
    const res = await axios.get(`${BaseUrl}/user/auth/${token}`)
    const resUser = res.data
    console.log(resUser)
    // invalid signature
    if (res === null || resUser === 'TokenExpiredError' || resUser === 'invalid token' || resUser === 'JsonWebTokenError' || resUser === 'invalid signature') {
      window.localStorage.removeItem('token')
      console.log('Session eliminada')
      Router.push('/login')
    }

    return (resUser)
  }
  return null
}

// Redirecciona si hay sesion
export const redirectIfAuth = async () => {
  const user = await getSession()
  console.log(user)
  if (user) {
    Router.push('/usuarios')
  }
  return false
}

// Redirecciona si no hay sesion
export const redirectIfNotAuth = async () => {
  const user = await getSession()
  if (!user) {
    console.log('No auth')
    Router.push('/login')
    return true
  }
  return false
}

// Redirecciona si no hay sesion y si el usuario no es Admin
export const redirectIfNotAdmin = async () => {
  const user = await getSession()
  if (!user || user.role !== 'Admin') {
    console.log('No auth')
    Router.push('/')
    return true
  }
  return false
}

// Verificamos si es un usuario Admin
export const userAdmin = async () => {
  const user = await getSession()
  if (!user) {
    return false
  }
  if (user.role === 'Admin') {
    console.log('Usuario Admin')

    return true
  }
  return false
}

// Verificamos si es un usuario Normal
export const userNormal = async () => {
  const user = await getSession()
  if (!user) {
    return false
  }
  if (user.role === 'Normal') {
    console.log('Usuario Normal')

    return true
  }
  return false
}

// Nueva red social
export const newRed = async (user, red) => {
  const redes = await axios.post(`${BaseUrl}/user/newred`, { user, red })
  return redes
}

// Eliminar red social
export const deleteRed = async (id) => {
  const deleted = await axios.delete(`${BaseUrl}/user/deletered/${id}`)
  return deleted
}

// Categorias

export const getCategory = async () => {
  const category = await axios.get(`${BaseUrl}/c/categories`)

  return category
}

export const getRole = async (role) => {
  const user = await axios.get(`${BaseUrl}/c/premium/${role}`)

  return user
}

export const newCategory = async (color1, color2, color3, category) => {
  const nCategory = await axios.post(`${BaseUrl}/c/category/form`, { color1, color2, color3, category })
  if (!nCategory) return ('Hubo un error')
  return ('New Category')
}

// Profesionales

export const getPro = async () => {
  const pros = await axios.get(`${BaseUrl}/c/professional`)

  return pros
}

export const newPro = async (formData, config) => {
  const pros = await axios.post(`${BaseUrl}/c/professional/form`, formData, config)
  if (!pros) return ('Hubo un error')
  return ('New Pro')
}
