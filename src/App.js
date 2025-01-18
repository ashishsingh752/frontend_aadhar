import "./App.css";
import {
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Profile from "./pages/Profile.jsx";
import { gettoken } from "./Localstorage/Store.jsx";
import UserRegistration from "./pages/Register/UserRegistration.jsx";
import ClientInfo from "./pages/ClientTable.jsx";

function App() {
  const tokenvalue = gettoken();
  
  return (
    <div className="App">
      <Routes >
        <Route path="/" element={tokenvalue ? <Home /> : <Login />} />
        <Route path="/home" element={<Home/>} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={tokenvalue ? <Profile /> : <Login />} />
        <Route path="/client-registration" element = {<UserRegistration />} />
        <Route path="/client-info" element = {<ClientInfo />} />
          </Routes>
    </div>
  )
}
export default App;
