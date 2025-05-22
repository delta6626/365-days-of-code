import { BookPlus, Clock, FilePlus } from "lucide-react";
import { useActiveTabStore } from "../../store/activeTabStore";
import { useUserVerifiedStore } from "../../store/userVerifiedStore";

function QuickActions() {
  const { activeTab, setActiveTab } = useActiveTabStore();
  const { userVerified, setUserVerified } = useUserVerifiedStore();

  return (
    <div className="flex gap-4 mt-4 w-full">
      <button
        className="btn w-xs h-[10rem] flex flex-col bg-transparent"
        disabled={!userVerified}
      >
        <FilePlus size={40} />
        New note
      </button>

      <button
        className="btn w-[20rem] h-[10rem] flex flex-col bg-transparent"
        disabled={!userVerified}
      >
        <BookPlus size={40} />
        New notebook
      </button>

      <button
        className="btn w-[20rem] h-[10rem] flex flex-col bg-transparent"
        disabled={!userVerified}
      >
        <Clock size={40} />
        Recent
      </button>
    </div>
  );
}

export default QuickActions;
