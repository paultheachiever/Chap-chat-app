import { useEffect, useState } from "react";
import { getRooms } from "../services/api";
import ChatRoom from "../components/chatRoom";
import { socket } from "../services/api";

export default function Home({ user }) {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);

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
    socket.emit("join room", { username: user.username, roomId: room._id }); // fixed event name
    setCurrentRoom(room);
  };

  return (
    <div className="flex h-screen">
      <aside className="w-1/3 bg-gray-600 text-white p-4">
        <h1 className="text-lg mb-2">CHAP-CHAT</h1>
        <h2 className="text-lg mb-2">Rooms</h2>
        <ul>
          {rooms.map((room) => (
            <li key={room._id} className="mb-2">
              <button
                onClick={() => handleJoinRoom(room)}
                className="w-full bg-gray-700 p-3 rounded hover:bg-gray-400"
              >
                {room.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-4">
        {currentRoom ? (
          <ChatRoom
            room={currentRoom}
            user={user}
            socket={socket}
          />
        ) : (
          <p>Select a room to join</p>
        )}
      </main>
    </div>
  );
}
