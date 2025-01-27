import axios from 'axios'

const api = axios.create({
    baseURL : "https://jsonplaceholder.typicode.com"
})

export const getPost = () => {
    return api.get("/users")
}


// delete method

export const deleteUser = (id) => {
    return api.delete(`/users/${id}`)
} 

// post method 

export const postData = (post) => {
    return api.post("/users",post)
}

export const updateData= (id,post) => {
    return api.put(`/users/${id}`, post)
}
