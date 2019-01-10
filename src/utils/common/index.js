const tokenString = 'token'

export const setTitle = (title) => {
  window.document.title = title || 'boot-atom'
}

export const checkLogin = () => {
  if (window.$cookies.get(tokenString)) {
    return true
  } else {
    return false
  }
}

export const setToken = (token) => {
  window.$cookies.set(tokenString, token, '0')
}
