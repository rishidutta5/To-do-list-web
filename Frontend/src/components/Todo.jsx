import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Todo() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [todos, setTodos] = useState([]);

    const [editId, setEditID] = useState(null);
    const [editTitle, setEditTitle] = useState("");

    const token = localStorage.getItem("token");

    // FIXED: Updated all URLs to match your correct backend (s277)
    const API_URL = "https://todo-backend-s277.onrender.com/api/todos";

    const getTodo = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
            setTodos(response.data);
        } catch (error) {
            alert(error.response?.data?.message || "failed to view a task");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTodo();
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const addTodo = async (e) => {
        // FIXED: Corrected spelling of preventDefault
        e.preventDefault();

        if (!title.trim()) {
            alert("Please enter a task");
            return;
        }

        try {
            await axios.post(API_URL, { title: title }, { headers: { Authorization: `Bearer ${token}` } });
            setTitle("");
            getTodo();
        } catch (error) {
            alert(error.response?.data?.message || "failed to add a task");
        }
    };

    const updateTask = async (id) => {
        try {
            await axios.put(`${API_URL}/${id}`, { title: editTitle }, { headers: { Authorization: `Bearer ${token}` } });
            setEditID(null);
            setEditTitle("");
            getTodo();
        } catch (error) {
            console.log(error);
        }
    };

    const toogleTodo = async (todo) => {
        try {
            await axios.put(`${API_URL}/${todo._id}`, { completed: !todo.completed }, { headers: { Authorization: `Bearer ${token}` } });
            getTodo();
        } catch (error) {
            console.log(error);
        }
    };

    const startEdit = (todo) => {
        setEditID(todo._id);
        // FIXED: Changed setTitle to setEditTitle so the edit box populates correctly
        setEditTitle(todo.title);
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            getTodo();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="todo-container">
            <div className="todo-header">
                <h1>Todo List</h1>
                <button onClick={logout} className="logout-btn"> Logout</button>
            </div>
            <form onSubmit={addTodo}>
                <input type="text" placeholder="Enter a new task" value={title} onChange={(e) => setTitle(e.target.value)} />
                <button type="submit">Add</button>
            </form>

            {loading && (<p className="loading"> Loading todos....</p>)}

            {error && (<p className="error">{error}</p>)}

            {/* FIXED: Wrapped conditional rendering in curly braces */}
            {!loading && todos.length === 0 && (
                <p> No Todo yet. Add your First Task in it </p>
            )}

            <div>
                {/* FIXED: Changed curly braces to parenthesis so the map function actually returns the JSX elements */}
                {todos.map((todo) => (
                    <div className="todo-item" key={todo._id}>
                        {editId === todo._id ? (
                            <>
                                {/* FIXED: e.value.target to e.target.value */}
                                <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />

                                <button onClick={() => updateTask(todo._id)}> Save</button>

                                <button onClick={() => { setEditID(null); setEditTitle("") }}> Cancel</button>
                            </>
                        ) : (
                            <>
                                {/* FIXED: Added arrow function to onChange to prevent infinite loop */}
                                <input type="checkbox" checked={todo.completed} onChange={() => toogleTodo(todo)} />
                                <span className={todo.completed ? "completed" : ""}> {todo.title}</span>

                                {/* FIXED: Added arrow function */}
                                <button onClick={() => startEdit(todo)}> Edit</button>

                                {/* FIXED: Added arrow function */}
                                <button onClick={() => deleteTodo(todo._id)}> Delete</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Todo;