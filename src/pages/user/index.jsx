import React, { useState, useEffect } from "react";
import { useProfileuserApiQuery, useUpdateuserApiMutation } from "../../redux/user/userApi";

export default function Profile() {
    const { data } = useProfileuserApiQuery();
    const [profileUpdate, { isLoading }] = useUpdateuserApiMutation()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photoURL, setPhotoURL] = useState("");

    useEffect(() => {
        if (data?.user) {
            setName(data.user.name || "");
            setEmail(data.user.email || "");
            setPhotoURL(data.user.photoURL || "");
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedProfile = { name, email, photoURL };
        await profileUpdate(updatedProfile)

    };

    return (
        <>
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
                                <h1 className="text-3xl font-bold text-gray-900">Update Profile</h1>
                            </div>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <input
                                    type="text"
                                    name="photoURL"
                                    placeholder="Photo URL"
                                    value={photoURL}
                                    onChange={(e) => setPhotoURL(e.target.value)}
                                    className="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition"
                                >

                                    {isLoading ? "Loading.." : "Update"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
