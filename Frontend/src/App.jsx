import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Todo from "./components/Todo";

function SafeRouting({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route 
          path="/todo" 
          element={
            <SafeRouting> 
              <Todo />
            </SafeRouting>
          } 
        />
        
        
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;