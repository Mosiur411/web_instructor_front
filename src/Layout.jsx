import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
