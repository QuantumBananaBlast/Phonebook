import axios from "axios";

const baseURL = 'api/persons'

const getAll = () => {
 const request = axios.get(baseURL)
 return request.then( response => response.data)
}

const create = newObject => {
    const request = axios.post(baseURL, newObject)
    return request.then( response => (response.data))
}

const deletePerson = id => {  
    const reqeust = axios.delete(`${baseURL}/${id}`)
    return reqeust.then(reqeust.data)
}

const update =  newObject => {
    return axios.put(`${baseURL}/${newObject.id}`, newObject)
        .then(response => response.data)
        .catch(()=> undefined)
}


export default {getAll,create, deletePerson, update}