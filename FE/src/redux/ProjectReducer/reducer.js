import { CREATE_PROJECT_ERROR, CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, CREATE_TODO_ERROR, CREATE_TODO_REQUEST, CREATE_TODO_SUCCESS, DELETE_PROJECT_ERROR, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, DELETE_TODO_ERROR, DELETE_TODO_REQUEST, DELETE_TODO_SUCCESS, EDIT_PROJECT_ERROR, EDIT_PROJECT_REQUEST, EDIT_PROJECT_SUCCESS, GET_PROJECT_ERROR, GET_PROJECT_REQUEST, GET_PROJECT_SUCCESS, GET_SINGLE_PROJECT_ERROR, GET_SINGLE_PROJECT_REQUEST, GET_SINGLE_PROJECT_SUCCESS, GET_TODO_ERROR, GET_TODO_REQUEST, GET_TODO_SUCCESS, UPDATE_TODO_ERROR, UPDATE_TODO_REQUEST, UPDATE_TODO_SUCCESS } from "./actionTypes"

const init = {
  isLoading:false,
  isError:false,
  projects:[],
  data:{},
  todos:[]
}
const reducer = (state=init,{type,payload})=>{
  switch(type){
    case CREATE_PROJECT_REQUEST: return {...state, isLoading:true}
    case CREATE_PROJECT_SUCCESS: return {...state, data:payload.data.new_project}
    case CREATE_PROJECT_ERROR: return {...state, isLoading:false,isError:true}

    case GET_PROJECT_REQUEST: return {...state, isLoading:true}
    case GET_PROJECT_SUCCESS: return {...state, projects:payload.data.project}
    case GET_PROJECT_ERROR: return {...state, isLoading:false,isError:true}

    case EDIT_PROJECT_REQUEST: return {...state, isLoading:true}
    case EDIT_PROJECT_SUCCESS: return {...state, data:payload.data.project}
    case EDIT_PROJECT_ERROR: return {...state, isLoading:false,isError:true}

    case DELETE_PROJECT_REQUEST: return {...state, isLoading:true}
    case DELETE_PROJECT_SUCCESS: return {...state, projects:payload.data.project}
    case DELETE_PROJECT_ERROR: return {...state, isLoading:false,isError:true}

    case GET_SINGLE_PROJECT_REQUEST: return {...state, isLoading:true}
    case GET_SINGLE_PROJECT_SUCCESS: return {...state, data:payload.data.project}
    case GET_SINGLE_PROJECT_ERROR: return {...state, isLoading:false,isError:true}

    case GET_TODO_REQUEST: return {...state, isLoading:true}
    case GET_TODO_SUCCESS: return {...state, isLoading:false,todos:payload.data.project.todos}
    case GET_TODO_ERROR: return {...state, isLoading:false,isError:true}

    case UPDATE_TODO_REQUEST: return {...state, isLoading:true}
    case UPDATE_TODO_SUCCESS: return {...state, isLoading:false}
    case UPDATE_TODO_ERROR: return {...state, isLoading:false,isError:true}

    case DELETE_TODO_REQUEST: return {...state, isLoading:true}
    case DELETE_TODO_SUCCESS: return {...state, isLoading:false,todos:payload.data.project.todos}
    case DELETE_TODO_ERROR: return {...state, isLoading:false,isError:true}

    case CREATE_TODO_REQUEST: return {...state, isLoading:true}
    case CREATE_TODO_SUCCESS: return {...state, isLoading:false,todos:payload.data.project.todos}
    case CREATE_TODO_ERROR: return {...state, isLoading:false,isError:true}
    
    default: return state
  }
}

export {reducer}