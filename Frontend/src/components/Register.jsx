import axios from "axios";
import { useState } from "react";
import {useNavigate, Link} from "react-router-dom";


function Register(){
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");

    const submitData = async(e)=>{
        e.preventDefault();

        setError("");
        setLoading(true);

        try{
            await axios.post("https://todo-backend-s277.onrender.com/api/auth/register",{ name:name, email:email, password:password})

            alert("Registartion Successful");
            navigate("/login");
        }catch(error){
            setError(error.respond?.data?.message || "Registeration failed");
        }finally{
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className ="auth-box">
                <h1> Create Account</h1>
                <form onSubmit={submitData}>
                    <input type="text" placeholder="Enter Your Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                    <input type="email" placeholder="Enter Your Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" placeholder="Enter Your Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

                    {error && (
                        <p className="error">{error}</p>
                    )}
                    <button type="submit">{loading ? "registering" : "register"}</button>
                </form>
                
                <p>Already have an account ? {""} <Link to="/login"> Login </Link></p>
                {/* <a href=""></a> */}
            </div>
        </div>
    )
}
export default Register;