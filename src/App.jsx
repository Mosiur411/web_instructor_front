import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { useAuthCheck } from "./hooks/useAuthCheck";
import Profle from "./pages/user";
import AllEvent from "./pages/event/AllEvent";
import MyEvent from "./pages/event/MyEvent";

function App() {
  const authchek = useAuthCheck();

  return !authchek ? (
    <span>Loading</span>
  ) : (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profle/>} />
          <Route path="/events" element={<AllEvent/>}/>
          <Route path="/events/mine" element={<MyEvent/>}/>
        </Routes>
      </Layout>
    </>


  )
}

export default App
