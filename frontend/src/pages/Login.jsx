import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { ShieldCheckIcon, TruckIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!role || !email || !password) {
      setMessage("Please select role and enter credentials");
      return;
    }

    try {
      setLoading(true);

      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
        role: role === "Admin" ? "admin" : "delivery",
      });

      const { token, role: userRole } = res.data;

      // Store auth data
      localStorage.setItem("token", token);
      localStorage.setItem("role", userRole);

      // Redirect
      if (userRole === "admin") navigate("/");
      if (userRole === "delivery") navigate("/delivery_agent");


    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6">

        <h2 className="text-3xl font-bold text-center text-purple-700">
          Login Portal
        </h2>

        {/* Role Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => setRole("Admin")}
            className={`w-full flex items-center justify-center gap-3 p-4 rounded-xl border-2
              ${role === "Admin" ? "border-purple-600 bg-purple-50" : "border-gray-200"}
            `}
          >
            <ShieldCheckIcon className="h-7 w-7 text-purple-600" />
            Login as Admin
          </button>

          <button
            onClick={() => setRole("Delivery Agent")}
            className={`w-full flex items-center justify-center gap-3 p-4 rounded-xl border-2
              ${role === "Delivery Agent" ? "border-blue-600 bg-blue-50" : "border-gray-200"}
            `}
          >
            <TruckIcon className="h-7 w-7 text-blue-600" />
            Login as Delivery Agent
          </button>
        </div>

        {role && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {message && (
              <div className="text-sm text-center text-red-600">
                {message}
              </div>
            )}

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg"
            >
              {loading ? "Logging in..." : `Login as ${role}`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
