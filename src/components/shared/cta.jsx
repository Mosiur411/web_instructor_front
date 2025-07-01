import { Link } from "react-router-dom";

export default function Cta() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                    Ready to Get Started?
                </h2>
                <p className="text-xl text-blue-100 mb-8">
                    Join our community today and start discovering amazing events near
                    you
                </p>
                <Link to="/register">
                    <button className="bg-white text-blue-600 hover:bg-gray-100 rounded-md px-8 py-3 text-lg font-semibold transition">
                        Sign Up Now
                    </button>
                </Link>
            </div>
        </section>

    )
}