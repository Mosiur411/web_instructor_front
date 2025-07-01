import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <section className="relative py-60 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 mb-6">
                    Discover Amazing{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                        Events
                    </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                    Connect with your community, discover exciting events, and create
                    unforgettable experiences. Join thousands of event enthusiasts on
                    EventHub.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/events">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-8 py-3 text-lg font-semibold transition">
                            Explore Events
                        </button>
                    </Link>
                    <Link to="/add-event">
                        <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-md px-8 py-3 text-lg font-semibold transition">
                            Create Event
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}