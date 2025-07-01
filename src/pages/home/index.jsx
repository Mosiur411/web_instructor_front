import Hero from "../../components/shared/hero";
import Features from "../../components/shared/features";
import Cta from "../../components/shared/cta";
import Stats from "../../components/shared/stats";

export default function Home() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <Hero />
                <Features />
                <Cta />
                <Stats/>
            </div>
        </>
    );
}
