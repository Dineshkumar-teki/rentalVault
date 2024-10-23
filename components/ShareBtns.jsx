import { FaShare } from "react-icons/fa";

const ShareBtns = () => {
  return (
    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center shadow-md shadow-orange-400">
      <FaShare className="mr-2" /> Share Property
    </button>
  );
};

export default ShareBtns;
