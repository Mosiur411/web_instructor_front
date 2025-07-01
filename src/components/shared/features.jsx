
export default function Features() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Why Choose EventHub?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Everything you need to discover, create, and manage events in one
                        place
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[{
                        title: "Easy Event Discovery",
                        description:
                            "Find events that match your interests with our powerful search and filter system",
                        // icon: <Calendar className="h-6 w-6 text-blue-600" />,
                        bgColor: "bg-blue-100"
                    }, {
                        title: "Community Driven",
                        description:
                            "Connect with like-minded people and build lasting relationships through shared experiences",
                        // icon: <Users className="h-6 w-6 text-purple-600" />,
                        bgColor: "bg-purple-100"
                    }, {
                        title: "Simple Event Creation",
                        description:
                            "Create and manage your events effortlessly with our intuitive event management tools",
                        //icon: <Sparkles className="h-6 w-6 text-green-600" />,
                        bgColor: "bg-green-100"
                    }].map(({ title, description, icon, bgColor }) => (
                        <article
                            key={title}
                            className="text-center p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
                        >
                            <div
                                className={`mx-auto w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center mb-4`}
                            >
                                {icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{title}</h3>
                            <p className="text-gray-600">{description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}