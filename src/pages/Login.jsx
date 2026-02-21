import { useState } from "react";
// import API from "../data/api";
import { useStore } from "../context/StoreContext";
import axios from "axios";
const Login = () => {
  const { setUser, setView, authRequiredView, setAuthRequiredView, addToast } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


const handleLogin = async () => {
  if (loading) return; // prevent double click

  try {
    setLoading(true); // ✅ start loading

    const res = await axios.post(
      "https://jain.bteam11.com/api/auth/login/",
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

  } finally {
    setLoading(false); // ✅ stop loading (always runs)
  }
};



return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

    <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

      {/* Title */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Welcome Back! Please Login to Your Account
      </h2>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Password */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

    {/* Login Button */}
<button
  onClick={handleLogin}
  disabled={loading}
  className={`w-full py-2 rounded-lg font-semibold transition
    ${
      loading
        ? "bg-red-400 cursor-not-allowed text-white"
        : "bg-red-700 hover:bg-red-800 text-white"
    }`}
>
  {loading ? "Logging..." : "Login"}
</button>


      {/* Register */}
      <p
        onClick={() => setView("register")}
        className="text-center text-sm text-gray-600 mt-5 cursor-pointer"
      >
        Don’t have an account?{" "}
        <span className="text-blue-600 font-medium hover:underline">
          Register
        </span>
      </p>

    </div>

  </div>
);

};

export default Login;
