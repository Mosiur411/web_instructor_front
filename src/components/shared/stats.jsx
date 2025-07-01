
export default function Stats() {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { value: "10K+", label: "Events Created", color: "text-blue-600" },
                        { value: "50K+", label: "Active Users", color: "text-purple-600" },
                        { value: "100+", label: "Cities", color: "text-green-600" },
                        { value: "99%", label: "Satisfaction", color: "text-orange-600" },
                    ].map(({ value, label, color }) => (
                        <div key={label}>
                            <div className={`text-3xl font-bold mb-2 ${color}`}>{value}</div>
                            <div className="text-gray-600">{label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}