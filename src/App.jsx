import { useState } from "react";
import OpenAI from "openai";

import Header from "./components/Header";
import MessageBox from "./components/MessageBox";
import Input from "./components/Input";

const groq = new OpenAI({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
  dangerouslyAllowBrowser: true,
});

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const question = input;
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInput("");
    setLoading(true);

    try {
      const response = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: question }],
      });

      const answer = response.choices[0].message.content;
      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const refreshChat = () => {
    setMessages([]);
    setInput("");
  }

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white">
      <Header onRefresh={refreshChat} />

      <MessageBox messages={messages} loading={loading} />

      <Input
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        loading={loading}
        handleKeyDown={handleKeyDown}
      />
    </div>
  );
}
