import { useNotesStore } from "../../store/notesStore";
import { useNotebooksStore } from "../../store/notebooksStore";
import { ActivitySquare } from "lucide-react";

function UserStatistics() {
  const { notes } = useNotesStore();
  const { notebooks } = useNotebooksStore();

  return (
    <div className="bg-transparent border-1 border-base-200 mt-4 w-sm mx-auto rounded-lg p-4">
      <h1 className="flex items-center gap-2 font-semibold text-gray-400">
        <ActivitySquare />
        Your stats
      </h1>
      <div className="">
        <h1 className="flex items-center gap-2 mt-4">
          <span>•</span>{" "}
          {notebooks.length === 1
            ? "1 notebook in total"
            : `${notebooks.length} notebooks in total`}
        </h1>
        <h1 className="flex items-center gap-2 mt-2">
          <span>•</span>{" "}
          {notes.length === 1
            ? "1 note in total"
            : `${notes.length} notes in total`}
        </h1>
      </div>
    </div>
  );
}

export default UserStatistics;
