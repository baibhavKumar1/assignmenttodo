import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Signup } from "../redux/AuthReducer/action";
import {useDispatch} from 'react-redux'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(Signup(formData,navigate))
  }
  return (
    <div className="flex flex-col h-screen dark:bg-black dark:text-white">
    
    <div className="flex-1 flex items-center m-auto">
      <div className="border h-max w-[500px] flex flex-col p-6 px-10 space-y-6 rounded shadow">
        <h1 className="text-center font-semibold text-2xl">Sign Up</h1>
        <div className="flex flex-col gap-2">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" required onChange={handleChange} type="text" className="outline-none bg-gray-200 rounded border border-black p-1 text-black" />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" required onChange={handleChange} type="text" className="outline-none bg-gray-200 rounded border border-black p-1 text-black" />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" onChange={handleChange} type="password" className="outline-none bg-gray-200 rounded border border-black p-1 text-black" />
          </div>
        <div className="flex justify-between">
          <button className="border rounded hover:border-blue-400 hover:text-blue-400 h-8 text-sm px-4" onClick={handleSubmit}>Submit</button>
        </div>
        <p>Already Registered? <Link to="/login"><u>Login</u></Link></p>
      </div>
      </div>
    </div>
  )
}

export default Register