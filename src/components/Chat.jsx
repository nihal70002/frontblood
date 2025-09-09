import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";

export default function Chat({ user }) {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const conn = new HubConnectionBuilder()
      .withUrl("https://localhost:7181/chathub") // Backend URL
      .withAutomaticReconnect()
      .build();

    conn.start()
      .then(() => console.log("Connected to SignalR"))
      .catch(err => console.error(err));

    conn.on("ReceiveMessage", (sender, message) => {
      setMessages(prev => [...prev, { user: sender, message }]);
    });

    setConnection(conn);

    return () => conn.stop();
  }, []);

  const sendMessage = async () => {
    if (connection && input) {
      await connection.send("SendMessage", user.name, input);
      setInput("");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-lg p-4">
      <div className="max-h-60 overflow-y-auto mb-2 border-b pb-2">
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.user}:</b> {m.message}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 border rounded px-2"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-red-600 text-white px-4 rounded hover:bg-red-700">
          Send
        </button>
      </div>
    </div>
  );
}
