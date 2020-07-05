import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8081'
})

instance.defaults.headers.common['Content-Type'] = 'application/json'
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
instance.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true'
instance.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept'
instance.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'



instance.interceptors.request.use(requestConfig => {
    console.log(requestConfig)
    //edit request config like add headers
    return requestConfig
}, error => {
    //this is for when request sending failss
    console.log(error)
    return Promise.reject(error)
})

instance.interceptors.response.use(responseConfig => {
    console.log(responseConfig)
    return responseConfig
}, error => {
    //this is for when request sending failss
    console.log(error)
    return Promise.reject(error)
    //by this we can catch them locally
})
// Access-Control-Allow-Methods : GET, POST, OPTIONS
// Access-Control-Allow-Headers : Origin, Content-Type, Accept
// headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
// headers.append('Access-Control-Allow-Credentials', 'true');
// axios.defaults.headers.post['Content-Type'] = 'application/json'

export default instance