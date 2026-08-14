import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState("");

  const submitData = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post("https://todo-backend-s277.onrender.com/api/auth/login", { 
        email: email, 
        password: password 
      });

      alert("Login Successful");

      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/todo");

    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h1> Login Account</h1>
        <form onSubmit={submitData}>
          <input 
            type="email" 
            placeholder="Enter Your Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Enter Your Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />

          {error && (
            <p className="error">{error}</p>
          )}
          
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p>Don't have an account ? {" "} <Link to="/register"> Register </Link></p>
      </div>
    </div>
  );
}

export default Login;