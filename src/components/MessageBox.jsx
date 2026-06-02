import { useEffect, useRef, useState } from "react";
import { BiMessageDetail } from "react-icons/bi";
import { FaCheck, FaUserAlt } from "react-icons/fa";
import { RiFileCopyLine, RiRobot2Line } from "react-icons/ri";

const MessageBox = ({ messages, loading }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const bottomRef = useRef(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full gap-3">
          <div className="w-18 h-18 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-4xl">
            <BiMessageDetail />
          </div>
          <p className="text-sm text-gray-500">
            Send a message to start the conversation
          </p>
        </div>
      )}

      {messages?.map((msg, index) => (
        <div
          key={index}
          className={`flex items-start gap-3 max-w-3xl mx-auto w-full ${
            msg.role === "user" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          {/* Avatar */}
          <div
            className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
              msg.role === "user"
                ? "bg-indigo-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            {msg.role === "user" ? (
              <FaUserAlt className="text-white text-sm" />
            ) : (
              <RiRobot2Line className="text-gray-300 text-lg" />
            )}
          </div>

          {/* Bubble */}
          <div className="flex flex-col gap-1 max-w-[80%]">
            <div
              className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white rounded-tr-sm"
                  : "bg-gray-800 text-gray-100 rounded-tl-sm"
              }`}
            >
              {msg.content}
            </div>
            <button
              onClick={() => copyToClipboard(msg.content, index)}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300 transition w-fit px-1 cursor-pointer"
            >
              {copiedIndex === index ? (
                <>
                  <FaCheck className="text-green-400 text-xs" />
                  <span className="text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <RiFileCopyLine className="text-sm" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      ))}

      {/* Typing indicator */}
      {loading && (
        <div className="flex items-start gap-3 max-w-3xl mx-auto w-full">
          <div className="w-8 h-8 rounded-full bg-gray-700 shrink-0 flex items-center justify-center">
            <RiRobot2Line className="text-gray-300 text-sm" />
          </div>
          <div className="bg-gray-800 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessageBox;
