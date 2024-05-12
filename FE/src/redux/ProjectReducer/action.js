import axios from "axios";
import { CREATE_PROJECT_ERROR, CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, CREATE_TODO_ERROR, CREATE_TODO_REQUEST, CREATE_TODO_SUCCESS, DELETE_PROJECT_ERROR, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, DELETE_TODO_ERROR, DELETE_TODO_REQUEST, EDIT_PROJECT_ERROR, EDIT_PROJECT_REQUEST, EDIT_PROJECT_SUCCESS, GET_PROJECT_ERROR, GET_PROJECT_REQUEST, GET_PROJECT_SUCCESS, GET_SINGLE_PROJECT_ERROR, GET_SINGLE_PROJECT_REQUEST, GET_SINGLE_PROJECT_SUCCESS, GET_TODO_ERROR, GET_TODO_REQUEST, GET_TODO_SUCCESS, UPDATE_TODO_ERROR, UPDATE_TODO_REQUEST, UPDATE_TODO_SUCCESS } from "./actionTypes";

const userURL = import.meta.env.VITE_BACKEND_URL
export const CreateProject = (title,token) => async (dispatch) => {
   dispatch({type:CREATE_PROJECT_REQUEST})
   console.log(title);
   await axios.post(`${userURL}/project/` , {title}, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
   .then((res)=>{
      dispatch({type:CREATE_PROJECT_SUCCESS,payload:res})
      dispatch(GetProject(token))
      console.log(res);
   })
   .catch((err)=>{
      dispatch({type:CREATE_PROJECT_ERROR})
      console.log(err);
   })
}

export const GetProject = (token) => async (dispatch) => {
   dispatch({ type: GET_PROJECT_REQUEST })
   await axios.get(`${userURL}/project/`, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
      .then((res) => {
         dispatch({ type: GET_PROJECT_SUCCESS, payload: res })
         console.log(res);
      })
      .catch((err) => {
         dispatch({ type: GET_PROJECT_ERROR })
         console.log("err", err)
      })
}
export const GetSingleProject = (project_id,token) => async (dispatch) => {
   dispatch({ type: GET_SINGLE_PROJECT_REQUEST })
   await axios.get(`${userURL}/project/${project_id}`, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
      .then((res) => {
         dispatch({ type: GET_SINGLE_PROJECT_SUCCESS, payload: res })
         console.log(res);
      })
      .catch((err) => {
         dispatch({ type: GET_SINGLE_PROJECT_ERROR })
         console.log("err", err)
      })
}
export const EditProject = (project_id,title,token) => async (dispatch) => { 
   dispatch({ type: EDIT_PROJECT_REQUEST })
   await axios.delete(`${userURL}/project/${project_id}`,title, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
      .then((res) => {
         dispatch({ type: EDIT_PROJECT_SUCCESS, payload: res })
         console.log(res);
      })
      .catch((err) => {
         dispatch({ type: EDIT_PROJECT_ERROR })
         console.log("err", err)
      })
}
export const DeleteProject = (project_id,token) => async (dispatch) => {
   dispatch({ type: DELETE_PROJECT_REQUEST })
   await axios.delete(`${userURL}/project/${project_id}`, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
      .then((res) => {
         dispatch({ type: DELETE_PROJECT_SUCCESS, payload: res })
         console.log(res);
      })
      .catch((err) => {
         dispatch({ type: DELETE_PROJECT_ERROR })
         console.log("err", err)
      })
}

export const GetTodos= (project_id,token)=>async(dispatch)=>{
   dispatch({ type: GET_TODO_REQUEST })
   await axios.get(`${userURL}/todo/${project_id}`, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
      .then((res) => {
         dispatch({ type: GET_TODO_SUCCESS, payload: res })
         console.log(res);
      })
      .catch((err) => {
         dispatch({ type: GET_TODO_ERROR })
         console.log("err", err)
      })
}
export const CreateTodo = (project_id,description,token) => async (dispatch) => {
   dispatch({type:CREATE_TODO_REQUEST})
   await axios.post(`${userURL}/todo/${project_id}` ,{description}, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
   .then((res)=>{
      dispatch({type:CREATE_TODO_SUCCESS,payload:res})
      dispatch(GetTodos(project_id,token))
      console.log(res);
   })
   .catch((err)=>{
      dispatch({type:CREATE_TODO_ERROR})
      console.log(err);
   })
}
export const UpdateTodo = (project_id,id,{status},token) => async (dispatch) => {
   dispatch({type:UPDATE_TODO_REQUEST})
   await axios.patch(`${userURL}/todo/${id}` ,{project_id,status}, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  })
   .then((res)=>{
      dispatch({type:UPDATE_TODO_SUCCESS,payload:res})
      dispatch(GetTodos(project_id,token))
      console.log(res);
   })
   .catch((err)=>{
      dispatch({type:UPDATE_TODO_ERROR})
      console.log(err);
   })
}
export const DeleteTodo = (project_id,token,id) => async (dispatch) => {
   dispatch({type:DELETE_TODO_REQUEST})
   await axios.delete(`${userURL}/todo/${project_id}/${id}`, {project_id}, {
      headers: {
          Authorization: `Bearer ${token}`
      } ,
      data: {
         project_id: project_id
      }
  })
   .then((res)=>{
      dispatch({type:DELETE_PROJECT_SUCCESS,payload:res})
      dispatch(GetTodos(project_id, token))
      console.log(res);
   })
   .catch((err)=>{
      dispatch({type:DELETE_TODO_ERROR})
      console.log(err);
   })
}