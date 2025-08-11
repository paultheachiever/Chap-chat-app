import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { registerUser } from "../services/api";


export default function login ({ setUser}){
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const hundleLogin =async () => {
        const res = await registerUser(username);
        setUser(res.data);
        navigate("/")
    };
    return(
        <div className="h-screen flex items-center justify-center bg-gray-250">
            <div className="p-6 bg=white rounded shadow-md w-96">
                <h1 className="text-xl font-bold md-4">join chat</h1>
                <input
                className="w-full p-2 border rounded md-4" 
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />

                <button onClick={hundleLogin} className="w-full bg-orange-500 text-white p2 rounded gap-2">
                    Enter

                </button>

            </div>

        </div>
    )

}
