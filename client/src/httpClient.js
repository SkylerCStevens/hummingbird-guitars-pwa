import axios from 'axios'
import jwtDecode from 'jwt-decode'

const httpClient = axios.create()

httpClient.getToken = () => {
    return localStorage.getItem('token')
}

httpClient.setToken = (token) => {
    localStorage.setItem('token', token)
    return token
}

httpClient.getCurrentUser = () => {
    const token = httpClient.getToken()

    if(token) return jwtDecode(token)

    return null
}

httpClient.logIn = (credentials) => {
    return httpClient({method: 'post', url: '/api/users/authenticate', data: credentials})
    .then((serverResponse) => {
        const token = serverResponse.data.token
        if(token) {
            httpClient.defaults.headers.common.token = httpClient.setToken(token)
            return jwtDecode(token)
         } else {
             return false
         }
    })
}

httpClient.signUp = (userInfo) => {
    return httpClient({method: 'post', url: '/api/users', data: userInfo})
    .then((serverResponse) => {
        const token = serverResponse.data.token
        if(token){
            httpClient.defaults.headers.common.token = httpClient.setToken(token)
            return jwtDecode(token)
        }else {
            return false
        }
    })
}

httpClient.logOut = () => {
    localStorage.removeItem('token')
    delete httpClient.defaults.headers.common.token
    return true
}

httpClient.defaults.headers.common.tokens = httpClient.getToken()

export default httpClient;