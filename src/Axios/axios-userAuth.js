import axios from 'axios'

const instance = axios.create({
    // baseURL: 'http://localhost:8081/api/auth'
    baseURL: 'https://blogappservice758.herokuapp.com/api/auth'
})

instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
instance.defaults.headers.common['Access-Control-Allow-Credentials'] = 'false'
instance.defaults.headers.common['Access-Control-Allow-Headers'] = '*'
instance.defaults.headers.common['Access-Control-Expose-Headers'] = '*'
instance.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS, *'



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