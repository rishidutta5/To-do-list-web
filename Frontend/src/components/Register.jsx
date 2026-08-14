import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitData = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await axios.post("https://todo-backend-s277.onrender.com/api/auth/register", { 
        name: name, 
        email: email, 
        password: password 
      });

      alert("Registration Successful");
      navigate("/login");
    } catch (error) {
      // FIXED: 'respond' to 'response'
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="app-title">Taskify</h1>

      <div className="auth-container">
        <div>
          <h1> Create Account</h1>
          <form onSubmit={submitData}>
            <input 
              type="text" 
              placeholder="Enter Your Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
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
            <button type="submit">{loading ? "Registering..." : "Register"}</button>
          </form>

          <p>Already have an account? {" "} <Link to="/login"> Login </Link></p>
        </div>
      </div>
    </>
  );
}

export default Register;