import { IoMdSend } from "react-icons/io";

const Input = ({ input, setInput, sendMessage, loading, handleKeyDown }) => {
  return (
    <div className="border-t border-gray-800 bg-gray-900 px-4 py-4">
      <div className="max-w-3xl mx-auto flex items-end gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Anything..."
          rows={1}
          className="flex-1 resize-none bg-gray-800 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-indigo-500 border border-gray-700 focus:border-indigo-500 transition max-h-40 overflow-y-auto"
          style={{ lineHeight: "1.5" }}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          title={input.length == 0 ? "Ask Anything..." : "Send Message"}
          className="w-11 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 disabled:cursor-not-allowed flex items-center justify-center transition shrink-0"
        >
          <IoMdSend className="text-white text-lg" />
        </button>
      </div>
      <p className="text-center text-xs text-gray-500 mt-2">
        Powered by Groq · Llama-3.1-8b
      </p>
    </div>
  );
};

export default Input;
