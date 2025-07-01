import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRegisterauthApiMutation } from "../redux/auth/authApi";
import { decodeToken } from "react-jwt";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../redux/auth/authSlice";

export default function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [userregister] = useRegisterauthApiMutation()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        photoURL: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await userregister(formData)
        if (result?.data) {
            const token = result?.data?.accessToken
            localStorage.setItem("accessToken", token);
            const decoded = decodeToken(token);
            dispatch(userLoggedIn({ ...decoded, token }));
            navigate("/");
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
                            <img
                                src="https://web.programming-hero.com/home/home2/icons/ph-logo.svg"
                                alt="Logo"
                                className="mx-auto"
                            />
                        </div>

                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
                            <p className="text-gray-500 mt-2">Sign up to get started</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="photoURL"
                                placeholder="Photo URL"
                                value={formData.photoURL}
                                onChange={handleChange}
                                className="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition"
                            >
                                Register
                            </button>
                        </form>

                        <p className="mt-6 text-center text-gray-600">
                            Already have an account?
                            <Link to="/login" className="font-semibold text-blue-600 hover:underline"> Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
