import { useNavigate } from "react-router-dom"
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import { CreateProject, DeleteProject, GetProject } from "../redux/ProjectReducer/action";
import { useDispatch, useSelector } from "react-redux";
const Home = () => {
  const [isOpen, setIsOpen] = useState(false)
  const token = useSelector((state) => state.AuthReducer.token) || localStorage.getItem('token')
  const {isAuth} = useSelector((state)=>state.AuthReducer)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetProject(token))
  }, [token, dispatch])
  const {projects} = useSelector((state) => state.ProjectReducer)

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }
  const handleDelete = (id)=>{
    dispatch(DeleteProject(id,token))
  }

  const navigate = useNavigate()
  return (
    <div className='bg-black min-h-screen text-white '>
      {isAuth == true ? (<div><div className="flex justify-between p-5">
        <p className="font-mono text-2xl">Projects: </p>
        <button className="border rounded hover:border-blue-400 hover:text-blue-400 h-8 text-sm px-4" onClick={handleOpen}>Create Project</button>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} createProject={CreateProject} />
      </div>
      <div className="*:h-40 *:border *:w-60 flex flex-wrap gap-5 justify-center *:rounded">
        {projects?.map((item) => (
          <div key={item._id} className="border p-2 flex flex-col justify-between" >
          <div onClick={() => navigate(`/project/${item._id}`)}>
            <p>{item.title ? item.title : "No title found"}</p>
            <p>{item.createdAt}</p>
            <p>Total Todos: {item.todos.length}</p>
            </div>
            <div className="flex justify-between border p-1 rounded">
              <button>Edit</button>
              <button onClick={()=>handleDelete(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div></div>): (<div className="text-center">Please Log In</div>)}
    </div>
  )
}

export default Home