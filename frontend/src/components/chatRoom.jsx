import { useEffect, useRef, useState } from "react";
import { getMessages } from "../services/api";

export default function ChatRoom({ room, user, socket }) {
  const [chat, setChat] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const [messages, setMessages] = useState([]);
  const msgRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Load messages when room changes
  useEffect(() => {
    if (room?._id) {
      getMessages(room._id)
        .then((res) => setMessages(res.data))
        .catch((err) => console.error("Error fetching messages:", err));
    }
  }, [room]);

  // Listen for socket events
  useEffect(() => {
    const handleNewMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    const handleTyping = (username) => {
      setTypingUser(username);
    };

    const handleStopTyping = () => {
      setTypingUser("");
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
    };
  }, [socket]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight;
    }
  }, [messages]);

  // Typing event handler with debounce
  const handleTyping = () => {
    socket.emit("typing", user.username);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping");
    }, 1000);
  };

  // Send message handler
  const handleSend = () => {
    if (!chat.trim()) return;
    socket.emit("sendMessage", { content: chat, roomId: room._id });
    setChat("");
    socket.emit("stopTyping");
  };

  // Send message on Enter key or trigger typing
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevent newline in input
      handleSend();
    } else {
      handleTyping();
    }
  };

  return (
    <div  className="h-screen flex flex-col p-4">
      <h2 className="text-2xl mb-2 ">{room?.name}</h2>

      <div
  ref={msgRef}
  className=" overflow-y-auto border p-2 rounded bg-gray-50 mb-2 flex flex-col gap-2"
  style={{
    backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtdCytysZOnsqailSIWXVrCEGTlsTTX65239V8a93U5bsxaftFlHH6BnE&s')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  }}
>
  {messages.map((msg) => {
    const isOwn = msg.sender.username === user.username;
    return (
      <div
        key={msg._id}
        className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
      >
        <p
          className={`max-w-xs p-2 rounded ${
            isOwn ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          <strong>{msg.sender.username}:</strong> {msg.content}
        </p>
      </div>
    );
  })}
</div>

      <div className="min-h-[1.5rem] text-gray-600">
        {typingUser && <em>{typingUser} is typing...</em>}
      </div>

      <div className="flex gap-2 mt-4">
        <input
          className="flex-1 p-2 border rounded"
          value={chat}
          onChange={(e) => setChat(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          autoComplete="off"
        />
        <button
          className="bg-blue-500 text-white px-4 rounded"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}
