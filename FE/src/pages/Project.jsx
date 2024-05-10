import { useParams } from "react-router-dom"
import { Octokit } from '@octokit/rest'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { CreateTodo, DeleteTodo, GetSingleProject, GetTodos, UpdateTodo } from "../redux/ProjectReducer/action"
import Modal from "../components/Modal"
const Project = () => {
    const { project_id } = useParams()
    const [isOpen, setIsOpen] = useState(false)
    const token = useSelector((state) => state.AuthReducer.token) || localStorage.getItem('token')
    const dispatch = useDispatch()
    //const navigate = useNavigate()
    useEffect(() => {
        dispatch(GetTodos(project_id, token))
    }, [project_id, token, dispatch])
    useEffect(() => {
        dispatch(GetSingleProject(project_id, token))
    }, [project_id, token, dispatch])
    const handleOpen = () => {
        setIsOpen(!isOpen)
    }
    const [status,setStatus] = useState("pending")
    const { todos, data } = useSelector((state) => state.ProjectReducer)
    const pendingTodos = todos?.filter((item) => item.status === "pending")
    const completedTodos = todos?.filter((item) => item.status === "completed")
    const accesstoken = import.meta.env.VITE_TOKEN
    const octokit = new Octokit({ auth: accesstoken });
    const handleClick = async () => {
        const response = await octokit.request('POST /gists', {
            description: `${data.title}`,
            'public': false,
            files: {
                [`${data.title}.md`]: {
                    content: `
                    ${data.title}\n\n+
                    ## Summary: ${pendingTodos.length}/${todos.length}\n\n` +
                        'Pending Todos:\n' +
                        pendingTodos.map(todo => `- ${todo.description}\n`).join('') +
                        'Completed Todos:\n' +
                        completedTodos.map(todo => `- ${todo.description}\n`).join('')
                }
            },
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        localStorage.setItem('gist',response.data.url)
    }
    const handlechange=(id)=>{
        setStatus(prevStatus => ({
            status: prevStatus === "pending" ? "completed" : "pending"
          }));
         dispatch(UpdateTodo(id,{status},token))
    }
    
    const handleDelete=(id)=>{
        dispatch(DeleteTodo(token,id))
    }
    // const handleEdit = (id,data)=>{
    //     dispatch(UpdateTodo(id,data,token))
    // }
    return (
        <div className='bg-black min-h-screen text-white '>
            <p className="text-center font-mono text-3xl p-4">Project {data?.title}</p>
            <div className="flex justify-between px-5 pb-4">
                <p className="font-mono text-xl">Todos: </p>
                <button className="border rounded hover:border-blue-400 hover:text-blue-400 h-8 text-sm px-4" onClick={handleOpen}>Add Todo</button>
                <Modal isOpen={isOpen} setIsOpen={setIsOpen} createTodo={CreateTodo} />
            </div>
            <div className="*:h-max *:border *:w-max flex flex-wrap gap-5 justify-center *:rounded">
                <div className="border p-2 space-y-2">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <p className="rounded-full border px-3">{data?.title}</p>
                            <button className="border rounded hover:border-blue-400 hover:text-blue-400 h-8 text-sm px-4">Edit</button>
                        </div>
                        <p>Summary</p>
                        <ol className="list-decimal list-inside">Pending:
                            <div className="border rounded p-1 my-1">
                                {todos?.filter((item) => item.status === "pending").map((item) => { return (<div key={item._id} className="flex gap-10"><li>{item.description}</li><div><button onClick={()=>handlechange(item.id)}>Complete</button><button>Edit</button><button onClick={handleDelete}>Delete</button></div></div>) })}
                            </div>
                        </ol>
                        <p></p>
                        <ol className="list-decimal list-inside">Completed:
                            <div className="border rounded p-1 my-1">
                                {todos?.filter((item) => item.status === "completed").map((item) => { return (<div key={item._id}  className="flex gap-10"><li>{item.description}</li><div><button onClick={()=>handlechange(item.id)}>Incomplete</button><button>Edit</button><button onClick={handleDelete}>Delete</button></div></div>) })}
                            </div>
                        </ol>
                    </div>
                    <div className="flex justify-between">
                        <button className="border rounded hover:border-blue-400 hover:text-blue-400 h-8 text-sm px-4" onClick={handleClick}>Export</button>
                        <button className="hover:border-red-600 border border-black rounded h-8 text-sm px-4 bg-red-600 text-white">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Project