import { Route, Routes } from "react-router-dom"
import Login from "../pages/Login"
import Home from "../pages/Home"
import Register from "../pages/Register"
import Project from "../pages/Project"

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/project/:project_id" element={<Project/>}/>
        </Routes>
    )
}

export default AllRoutes