import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { useAuthCheck } from "./hooks/useAuthCheck";
import Profle from "./pages/user";
import AddEvent from "./pages/event/AddEvent";
import AllEvent from "./pages/event/AllEvent";
import MyEvent from "./pages/event/MyEvent";
import Loading from "./components/shared/loading";

function App() {
  const authchek = useAuthCheck();

  return !authchek ? (
    <Loading style={'h-screen'} />
  ) : (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profle />} />
          <Route path="/events/add" element={<AddEvent />} />
          <Route path="/events" element={<AllEvent />} />
          <Route path="/events/mine" element={<MyEvent />} />
        </Routes>
      </Layout>
    </>


  )
}

export default App
