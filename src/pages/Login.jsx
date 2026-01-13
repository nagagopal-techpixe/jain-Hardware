import { useState } from "react";
// import API from "../data/api";
import { useStore } from "../context/StoreContext";
import axios from "axios";
const Login = () => {
  const { setUser, setView, authRequiredView, setAuthRequiredView, addToast } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async () => {
  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/auth/login/",
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    if (res.data.success) {
      const { user, tokens } = res.data.data;

      localStorage.setItem("access", tokens.access);
      localStorage.setItem("refresh", tokens.refresh);

      setUser({ ...user, isLoggedIn: true });
      addToast("Login successful");

      setView(authRequiredView || "home");
      setAuthRequiredView(null);
    } else {
      addToast(res.data.message || "Login failed", "error");
    }
  } catch (err) {
    console.error(err.response?.data || err);
    addToast("Invalid email or password", "error");
  }
};


  return (
    <div className="max-w-md mx-auto mt-20">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
      <p onClick={() => setView("register")} className="cursor-pointer text-blue-500">
        New user? Register
      </p>
    </div>
  );
};

export default Login;
