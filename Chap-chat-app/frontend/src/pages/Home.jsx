import { useEffect, useState } from "react";
import { getRooms } from "../services/api";
import ChatRoom from "../components/chatRoom";
import { socket } from "../services/api";
import { Menu, X } from "lucide-react"; // npm install lucide-react

export default function Home({ user }) {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // sidebar toggle

  useEffect(() => {
    fetchRooms();
    socket.connect();
    return () => socket.disconnect();
  }, []);

  const fetchRooms = async () => {
    const res = await getRooms();
    setRooms(res.data);
  };

  const handleJoinRoom = (room) => {
    socket.emit("join room", { username: user.username, roomId: room._id });
    setCurrentRoom(room);
  };

  return (
    <div className="flex h-screen overflow-hidden">
     
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute top-4 right-4 z-20 bg-gray-700 text-white p-2  items-end rounded-md md:hidden hover:bg-gray-500 transition"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={`fixed md:relative top-0 left-0 h-full bg-gray-600 text-white p-4 transform transition-transform duration-300 ease-in-out z-10
          ${isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"}
          md:translate-x-0 md:w-1/5`}
      >
        <h1 className="text-xl font-bold mb-4">CHAP-CHAT</h1>
        <h2 className="text-lg mb-2">Rooms</h2>
        <ul className="overflow-y-auto max-h-[80vh]">
          {rooms.map((room) => (
            <li key={room._id} className="mb-2">
              <button
                onClick={() => handleJoinRoom(room)}
                className="w-full bg-gray-700 p-3 rounded hover:bg-gray-400 transition"
              >
                {room.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 p-4 md:ml-0 ml-0 md:relative">
        {currentRoom ? (
          <ChatRoom room={currentRoom} user={user} socket={socket} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-600">
            <p>Select a room to join</p>
          </div>
        )}
      </main>
    </div>
  );
}
