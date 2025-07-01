import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginauthApiMutation } from "../redux/auth/authApi";
import { decodeToken } from "react-jwt";
import { userLoggedIn } from "../redux/auth/authSlice";
import { useDispatch } from "react-redux";

export default function Login() {
    const dispatch=useDispatch()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [addLogin, { isLoading }] = useLoginauthApiMutation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await addLogin({ email, password }).unwrap();
            const token = res.accessToken;
            localStorage.setItem("accessToken", token);
            const decoded = decodeToken(token);
            dispatch(userLoggedIn({ ...decoded, token }));

            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <section className="min-h-screen font-sans bg-gray-100 flex items-center justify-center">
            <div className="relative w-full h-full">
                <div className="absolute inset-0">
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-full h-full"></div>
                </div>

                <div className="relative flex justify-center items-center min-h-screen px-4">
                    <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-8 lg:p-12">
                        <div className="mb-8 text-center">
                            <img src="https://web.programming-hero.com/home/home2/icons/ph-logo.svg" alt="Logo" className="mx-auto" />
                        </div>

                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
                            <p className="text-gray-500 mt-2">Please login to your account</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <div className="text-right">
                                <Link to="/" className="text-blue-600 hover:underline text-sm">Forgot Password?</Link>
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition"
                            >
                                {isLoading ? "Logging in..." : "Login"}
                            </button>
                        </form>

                        
                        <p className="mt-6 text-center text-gray-600">
                            Don’t have an account?
                            <Link to="/register" className="font-semibold text-blue-600 hover:underline"> Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
