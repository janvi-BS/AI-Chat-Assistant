import { RiRobot2Line } from "react-icons/ri";
import { FiRefreshCw } from "react-icons/fi";

const Header = ({ onRefresh }) => {
  return (
    <div className="relative flex items-center justify-center gap-2 py-4 border-b border-gray-800 bg-gray-900">
      <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
        <RiRobot2Line className="text-white text-base" />
      </div>
      <h1 className="text-lg font-semibold tracking-wide">AI Chat Assistant</h1>
      <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/30">
        Llama 3.1
      </span>
      <button
        onClick={onRefresh}
        title="Refresh Chat"
        className="absolute right-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-indigo-500/30 transition cursor-pointer"
      >
        <FiRefreshCw className="text-xl" />
      </button>
    </div>
  );
};

export default Header;
