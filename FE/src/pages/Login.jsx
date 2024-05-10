import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Signin } from "../redux/AuthReducer/action";
import { useDispatch } from "react-redux";
const Login = () => {
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(Signin(formData,navigate))
  }
  return (
    <div className="flex flex-col h-screen dark:bg-black dark:text-white">
    
    <div className="flex-1 flex items-center m-auto">
      <div className="border h-max w-[500px] flex flex-col p-6 px-10 space-y-6 rounded shadow-xl">
        <h1 className="text-center font-semibold text-2xl">Sign In</h1>
        <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" onChange={handleChange} type="text" className="outline-none bg-gray-200 p-1 text-black rounded" />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" onChange={handleChange} type="password" className="outline-none bg-gray-200 p-1 text-black rounded"/>
          </div>
        <div className="flex justify-between">        
        <button className="border rounded hover:border-blue-400 hover:text-blue-400 h-8 text-sm px-4" onClick={handleSubmit}>Submit</button>
        <button className="border rounded hover:border-blue-400 hover:text-blue-400 h-8 text-sm px-4" >Forgot Your Password</button>
        </div>
        <p>Not Registered? <Link to="/register"><u>Register</u></Link></p>
      </div>
      </div>
    </div>
  )
}

export default Login