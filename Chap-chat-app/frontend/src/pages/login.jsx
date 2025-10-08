import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import Iridescence from '../components/components/Iridescence';
import Header from '../components/components/header';
import Main from "../components/components/descriptions";
import M from "../components/components/descriptions";



export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await registerUser(username);
    setUser(res.data);
    navigate("/");
  };

  return (
    <div className="relative h-screen flex items-center justify-center bg-gray-200 overflow-hidden">
      {/* Iridescent animated background */}
      <Iridescence
        className="absolute inset-0 z-0"
        color={[1, 1, 1]}
        mouseReact={false}
        amplitude={0.1}
        speed={1.0}
      />

      <div className="absolute top-0 left-0 w-full p-4 z-0">
        <Header />
        
        <Main />
        <div className="flex items-center justify-center ">
            <div className="relative z-10 p-6 bg-white  rounded shadow-md w-96">
        <h1 className="text-xl font-bold mb-4 text-center">Join Chat</h1>

        <input
          className="w-full p-2 border rounded mb-4"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-orange-500 text-white p-2 rounded"
        >
          Enter
        </button>
      </div>
        </div>
        
      </div>
      
      

     
      
    </div>
  );
}
