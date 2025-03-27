import { useState } from "react";
import axios from "axios";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("https://ton-api.com/api/chatbot", {
        message: input,
      });

      const botMessage = { sender: "bot", text: response.data.response };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error("Erreur chatbot :", error);
    }

    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 bg-white shadow-lg p-4 rounded-lg w-72">
      <div className="h-64 overflow-y-auto border-b mb-3">
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender === "user" ? "text-right" : ""}>
            <span
              className={`inline-block p-2 my-1 rounded-lg ${
                msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pose ta question..."
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-r"
          onClick={sendMessage}
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
