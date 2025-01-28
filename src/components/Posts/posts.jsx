import React, { useEffect, useState } from 'react'

import './posts.css'

import { deleteUser, getPost } from '../../api/PostApi'
import Form from '../Form/form'

const Posts = () => {

    // console.log(getPost())

    const [usersData,setUsersData] = useState([])
    // const [activeUser,setActiveUser] = useState({})
    const [updateDataApi, setUpdateDataApi] = useState({});
    const [isEdit,setIsEdit] = useState(false)
    
    const getUsersData = async () => {
        const resp = await getPost()
        // console.log(resp)
        setUsersData(resp.data)
    }

    useEffect(() => {

        getUsersData()

    }, [])

    // delete function

    const deleteButton = async (id) => {
        
       console.log(`click : ${id}`)
       try {
        const resp = await deleteUser(id)
        // console.log(resp.status)
        if(resp.status === 200) {
            const updatedUsers = usersData.filter((user) => {
                return user.id !== id 
            })
            setUsersData(updatedUsers)
        } else {
            console.log("Failed to delete the User: ", resp.status)
        }

    } catch (error) {
        console.log(error)
       }
       
    
    }

    const handleUpdatePost = (data) => setUpdateDataApi(data)

    // // selected user & for post data
    // const selectedUser = (id) => {
    //     console.log(`click to Edit : ${id}`)
    //     const selectedUser = usersData.filter((eachData) => eachData.id === id)
    //     // setActiveUser(selectedUser)
    //     setUpdateDataApi(selectedUser)
    //     setIsEdit(true)
    // }
    // // console.log(activeUser)

  return (
    <div className='main-cont'>
        <h1 className='main-heading'>List of Users</h1>
        <section className='section-form'>
            <Form usersData={usersData} setUsersData={setUsersData}
                  updateDataApi={updateDataApi} setUpdateDataApi={setUpdateDataApi}
                  isEdit = {isEdit} setIsEdit = {setIsEdit}
            />
        </section>
        <ul className='list-cont'>
            <table className='table'>
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>   
            {
            usersData.map((data,i) => (
               
                <tbody key={data.id}>
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{data.name}</td>
                  <td>{data.username}</td>
                  <td>{data.email}</td>
                  <td>
                    <button type='button' 
                            className='btn btn-danger deleteButton'
                            onClick={() => deleteButton(data.id)}
                    >Delete</button>
                    <button type='button' className='btn btn-success'
                            onClick={() => handleUpdatePost(data)}
                    >Edit</button>
                  </td>
                </tr>
              </tbody>
            ))
            }
            </table>
          
        </ul>
        
    </div>
  )
}

export default Posts
