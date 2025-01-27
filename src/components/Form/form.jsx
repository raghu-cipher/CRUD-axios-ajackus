import React, { useEffect, useState } from 'react'

import './form.css'
import { postData, updateData } from '../../api/PostApi';

const Form = ({usersData,setUsersData,updateDataApi,setUpdateDataApi }) => {

    const [formData, setFormData] = useState({ name: '', username: '', email: '' });

    let isEmpty = Object.keys(updateDataApi).length === 0;


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

    //   get the udpated Data and add into input field
  useEffect(() => {
    updateDataApi &&
      setFormData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
  }, [updateDataApi]);

    // console.log(isEdit)

    const addPostData =async () => {
        const res = await postData(formData)

        const {name,username,email} = formData
        if(!name || !username || !email) {
            alert("All Fields are required")
            return ; 
        }

        if(res.status === 201) {
            setUsersData([...usersData,res.data])
            setFormData({name : "",username: "",email : ""})
        }
    } 

    //put method
    const updatePostData = async () => {
        try {
          const res = await updateData(updateDataApi.id, formData);
          console.log(res);
    
          if (res.status === 200) {
            setData((prev) => {
              return prev.map((curElem) => {
                return curElem.id === res.data.id ? res.data : curElem;
              });
            });
    
            setFormData({ name: "", username: "",email : "" });
            setUpdateDataApi({});
          }
        } catch ({ error }) {
          console.log(error);
        }
      };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const action = e.nativeEvent.submitter.value;
        if (action === "Add") {
          addPostData();
        } else if (action === "Edit") {
          updatePostData();
        }
      }

  return (
    <form onSubmit={handleFormSubmit}>
        <div className='feilds-cont'>
          <label htmlFor='user' className='label'>Name  </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className='inputValue'
        />
       </div>

       <div  className='feilds-cont'>
          <label htmlFor='userName' className='label'>Username  </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className='inputValue'
        />
       </div>

       <div  className='feilds-cont'>
          <label htmlFor='email' className='label'>Email  </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className='inputValue'
        />
       </div>

       <button type="submit" value={isEmpty ? "Add" : "Edit"} 
                className={`btn ${isEmpty ? "btn-primary" : "btn-success"} addButton`}
        >
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
    
  )
}

export default Form
