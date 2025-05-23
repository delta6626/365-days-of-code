import { ArrowBigUp, BookPlus, Clock, FilePlus, Plus } from "lucide-react";
import { useActiveTabStore } from "../../store/activeTabStore";
import { useUserVerifiedStore } from "../../store/userVerifiedStore";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";

function QuickActions() {
  const { activeTab, setActiveTab } = useActiveTabStore();
  const { userVerified, setUserVerified } = useUserVerifiedStore();

  function handleNewNoteClick() {
    document.getElementById(APP_CONSTANTS.CREATE_NOTE_MODAL).showModal();
  }

  function handleNewNotebookClick() {
    document.getElementById(APP_CONSTANTS.CREATE_NOTEBOOK_MODAL).showModal();
  }

  function handleRecentClick() {
    setActiveTab(APP_CONSTANTS.RECENT_ITEMS);
  }

  return (
    <div className="flex gap-5 mt-4 w-full">
      <button
        className="btn w-sm h-[10rem] flex flex-col"
        disabled={!userVerified}
        onClick={handleNewNoteClick}
      >
        <FilePlus size={30} />
        <p className="text-xl">New note</p>
        <div className="flex flex-row items-center text-gray-400">
          Shift + N
        </div>
      </button>

      <button
        className="btn w-sm h-[10rem] flex flex-col"
        disabled={!userVerified}
        onClick={handleNewNotebookClick}
      >
        <BookPlus size={30} />
        <p className="text-xl">New notebook</p>
        <div className="flex flex-row items-center text-gray-400">
          Shift + B
        </div>
      </button>

      <button
        className="btn w-sm h-[10rem] flex flex-col"
        disabled={!userVerified}
        onClick={handleRecentClick}
      >
        <Clock size={30} />
        <p className="text-xl">Recent</p>
        <div className="flex flex-row items-center text-gray-400">
          Shift + R
        </div>
      </button>
    </div>
  );
}

export default QuickActions;
