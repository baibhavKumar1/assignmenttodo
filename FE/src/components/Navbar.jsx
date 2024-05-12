import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
const Navbar = () => {
  const { isAuth,name } = useSelector((state)=>state.AuthReducer)
    const navigate = useNavigate();
  return (
    <div className="flex justify-between p-1 bg-black border-b text-white">
        <p>TODOO</p>
        {isAuth == false ? <button onClick={()=>navigate('/login')}>Login</button> : <p>{name}</p>}
    </div>
  )
}

export default Navbar