import axios from 'axios'

const BaseUrl = 'https://gamdecs.herokuapp.com/api'
// Filtrar palabras

export const filter = (valor) => {
  let newValor = valor
  const a = valor.replace(/PIBI+/gi, 'pibe')
  const b = a.replace(/ELLE+/gi, 'ello')
  const c = b.replace(/TODE+/gi, 'todo')
  const d = c.replace(/TEDE+/gi, 'todo')
  const e = d.replace(/CHIQUE+/gi, 'chico')
  const f = e.replace(/NOSOTRE+/gi, 'nosotro')
  newValor = f.replace(/NESETRE+/gi, 'nosotro')
  return newValor
}

// Manejadores de Publicaciones:

export const getPost = async (name) => {
  const postUser = await axios.get(`${BaseUrl}/post/p/${name}`)
  console.log('User Posts: ', postUser)

  return postUser
}

export const getPosts = async () => {
  const posts = await axios.get(`${BaseUrl}/post/posts`)
  if (!posts) {
    return null
  }
  return posts
}

export const getUserPost = async (path) => {
  const postUser = await axios.get(`${BaseUrl}/post/${path}`)
  console.log('User Posts: ', postUser)

  return postUser
}

export const newPost = async (formData, config) => {
  const newPost = await axios.post(`${BaseUrl}/post/upload`, formData, config)

  return newPost
}

export const deletePost = async (id) => {
  const postDeleted = await axios.delete(`${BaseUrl}/post/${id}`)

  return postDeleted
}

// Manejadores de videos

export const getVideos = async () => {
  const videos = await axios.get(`${BaseUrl}/video/videos`)
  console.log('Videos: ', videos)

  return videos
}

export const getUserVideo = async (name) => {
  const postUser = await axios.get(`${BaseUrl}/video/v/${name}`)
  console.log('User Videos: ', postUser)

  return postUser
}

export const getVideoPost = async (path) => {
  const postUser = await axios.get(`${BaseUrl}/video/${path}`)
  console.log('Video: ', postUser)

  return postUser
}

export const newVideoPost = async (videoId, description, profileImage, user) => {
  const newPost = await axios.post(`${BaseUrl}/video/newvideo`, { videoId, description, profileImage, user })

  return newPost
}

export const deleteVideo = async (id) => {
  const postDeleted = await axios.delete(`${BaseUrl}/video/deletevideo/${id}`)

  return postDeleted
}

// Comentarios

export const newImageComment = async (path, comment, profileImage, user) => {
  const newCom = await axios.post(`${BaseUrl}/post/comment`, { imageId: path, comment, profileImage, user })

  return newCom
}

export const newVideoComment = async (path, comment, profileImage, user) => {
  const newCom = await axios.post(`${BaseUrl}/video/comment`, { videoId: path, comment, profileImage, user })

  return newCom
}

export const deleteComment = async (id) => {
  const commentDeleted = await axios.delete(`${BaseUrl}/post/delcom/${id}`)

  return commentDeleted
}

// Images Favs - Likes

export const postFav = async (path) => {
  const fav = await axios.post(`${BaseUrl}/post/fav/${path}`)
  console.log('User Posts: ', fav)

  return fav
}

export const postLike = async (path) => {
  const like = await axios.post(`${BaseUrl}/post/like/${path}`)
  console.log('User Posts: ', like)

  return like
}

// Video Like - Fav
export const videoFav = async (path) => {
  const fav = await axios.post(`${BaseUrl}/video/fav/${path}`)
  console.log('User Posts: ', fav)

  return fav
}

export const videoLike = async (path) => {
  const like = await axios.post(`${BaseUrl}/video/like/${path}`)
  console.log('User Posts: ', like)

  return like
}
