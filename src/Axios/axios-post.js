import axios from 'axios'

const instance = axios.create({
    // baseURL: 'http://localhost:8081',
    baseURL: 'https://blogappservice758.herokuapp.com'

})

// const token = localStorage.getItem('token')
// console.log(token)
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
instance.defaults.headers.common['Access-Control-Allow-Credentials'] = 'false'
instance.defaults.headers.common['Access-Control-Allow-Headers'] = '*'
instance.defaults.headers.common['Access-Control-Expose-Headers'] = '*'
instance.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS, *'
// instance.defaults.headers.common['Authorization'] = 'Bearer ' + token


instance.interceptors.request.use(requestConfig => {
    console.log("reqConfig: " + requestConfig)
    //edit request config like add headers
    return requestConfig
}, error => {
    //this is for when request sending failss
    console.log("reqError: " + error)
    return Promise.reject(error)
})

instance.interceptors.response.use(responseConfig => {
    console.log("responseConfig" + responseConfig)
    return responseConfig
}, error => {
    //this is for when request sending failss
    console.log("resError: " + error)
    return Promise.reject(error)
    //by this we can catch them locally
})

export default instance