/* eslint-disable no-unused-vars */
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
    const isAuth = useSelector((state) => state.AuthReducer.isAuth)

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
    const [status, setStatus] = useState("pending")
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
                    content:
                        `
\`\`\`markdown
${data.title}

Summary: ${completedTodos.length} / ${todos.length} todos completed.

Pending Todos
${pendingTodos.map(todo => `- [ ] ${todo.description}`).join('\n')}

Completed Todos
${completedTodos.map(todo => `- [x] ${todo.description}`).join('\n')}
\`\`\`
`
                }

            },
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        console.log(response.data.url);
        localStorage.setItem('gist', response.data.url)
    }
    const handlechange = (id,status) => {
        console.log(status);
        const newStatus = status === "pending" ? "completed" : "pending"; 
    setStatus(newStatus);
        dispatch(UpdateTodo(project_id, id, { status:newStatus }, token))
    }

    const handleDelete = (id) => {
        dispatch(DeleteTodo(project_id,token, id))
    }
    // const handleEdit = (id,data)=>{
    //     dispatch(UpdateTodo(id,data,token))
    // }
    return ( 
        <>
        {isAuth == true ? (<div className='bg-black min-h-screen text-white '>
            <p className="text-center font-mono text-3xl p-4">Project {data?.title}</p>
            <div className="flex justify-between px-5 pb-4">
                <p className="font-mono text-xl">Todos: </p>
                <button className="border rounded hover:border-blue-400 hover:text-blue-400 h-8 text-sm px-4" onClick={handleOpen}>Add Todo</button>
                <Modal isOpen={isOpen} setIsOpen={setIsOpen} createTodo={CreateTodo} project_id={project_id} />
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
                                {todos?.filter((item) => item.status === "pending").map((item) => { return (<div key={item._id} className="flex gap-10 items-center"><li>{item.description}</li><div className="flex gap-2 *:border *:rounded *:p-1"><button onClick={() => handlechange(item._id,item.status)}>Complete</button><button>Edit</button><button onClick={()=>handleDelete(item._id)}>Delete</button></div></div>) })}
                            </div>
                        </ol>
                        <p></p>
                        <ol className="list-decimal list-inside">Completed:
                            <div className="border rounded p-1 my-1">
                                {todos?.filter((item) => item.status === "completed").map((item) => { return (<div key={item._id} className="flex gap-10 items-center"><li>{item.description}</li><div className="flex gap-2 *:border *:rounded *:p-1"><button onClick={() => handlechange(item._id,item.status)}>Incomplete</button><button>Edit</button><button onClick={()=>handleDelete(item._id)}>Delete</button></div></div>) })}
                            </div>
                        </ol>
                    </div>
                    <button className="border rounded hover:border-green-400 hover:text-green-400 h-8 text-sm px-4 w-full" onClick={handleClick}>Export</button>
                </div>
            </div>
        </div>):<div>Please Log In</div>}
        </>
    )
}

export default Project