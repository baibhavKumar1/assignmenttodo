import axios from 'axios';
import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS } from './actionTypes';

const userURL = import.meta.env.VITE_BACKEND_URL

export const Signup = (userData,navigate) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST })
    await axios.post(`${userURL}/user/register`, userData)
        .then((res) => {
            dispatch({ type: REGISTER_SUCCESS,payload:res })
            localStorage.setItem('token',(res.data.token))
            navigate('/')
        })
        .catch((err) => {
            dispatch({ type: REGISTER_ERROR })
            console.log(err)
        })
}
export const Signin=(userData,navigate)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST}) 
    await axios.post(`${userURL}/user/login`,userData)
    .then((res)=>{
        dispatch({type:LOGIN_SUCCESS,payload:res})
        localStorage.setItem('token',(res.data.token))
        navigate('/')
    })
    .catch((err)=>{
        dispatch({type:LOGIN_ERROR})
        console.log("err",err)
    })
} 