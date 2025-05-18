import { Book } from "lucide-react";
import { memo } from "react";

const MemoizedBook = memo(Book);

function NotebookChip({ bookIcon, notebookName }) {
  return (
    <div className="btn bg-base-100 text-gray-400 flex gap-2 items-center max-w-full">
      {bookIcon ? (
        <MemoizedBook size={20} className="flex-shrink-0"></MemoizedBook>
      ) : (
        ""
      )}
      <span className="overflow-hidden whitespace-nowrap text-ellipsis block w-full">
        {notebookName}
      </span>
    </div>
  );
}

export default NotebookChip;
