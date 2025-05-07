import { Pin, PinOff, FileEdit, Trash2 } from "lucide-react";
import Tag from "./Tag";
import { formatDateDDMMYY } from "../../utils/formatDateDDMMYY";
import { dateDistanceFromNow } from "../../utils/dateDistanceFromNow";
import { objectToDate } from "../../utils/objectToDate";
import { useState } from "react";
import { Clock, PenSquare } from "lucide-react";

function GridNotebook({ notebookObject }) {
  const [updatingPin, setUpdatingPin] = useState(false);
  const [deletingNotebook, setDeletingNotebook] = useState(false);

  function handleNotebookPinAndUnpin() {}
  function handleNotebookEditButtonClick() {}
  function handleDeleteButtonClick() {}

  return (
    <div className="w-sm bg-base-300 rounded-lg p-4 select-none">
      <div className="flex gap-2 items-center justify-between">
        <h3
          className="text-xl font-semibold overflow-hidden whitespace-nowrap truncate"
          title={notebookObject.name}
        >
          {notebookObject.name}
        </h3>
        <div className="flex gap-2">
          <div
            className="tooltip"
            data-tip={
              notebookObject.pinned
                ? "Unpin from dashboard"
                : "Pin to dashboard"
            }
          >
            <button
              className="btn btn-square"
              onClick={() => {
                handleNotebookPinAndUnpin(notebookObject.id);
              }}
            >
              {updatingPin ? (
                <span className="loading loading-spinner"></span>
              ) : notebookObject.pinned ? (
                <PinOff size={20}></PinOff>
              ) : (
                <Pin size={20}></Pin>
              )}
            </button>
          </div>

          <div className="tooltip" data-tip="Edit details">
            <button
              className="btn btn-square"
              onClick={handleNotebookEditButtonClick}
            >
              <FileEdit size={20}></FileEdit>
            </button>
          </div>

          <div className="tooltip tooltip-error" data-tip="Delete note">
            <button
              className="btn btn-square text-error"
              onClick={handleDeleteButtonClick}
            >
              {deletingNotebook ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <Trash2 size={20}></Trash2>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-4 text-gray-400 text-sm">
        <p className="flex gap-2 items-center">
          <Clock size={20} />
          {formatDateDDMMYY(objectToDate(notebookObject.creationDate))}
        </p>

        <p className="flex gap-2 items-center">
          <PenSquare size={20} />
          {dateDistanceFromNow(objectToDate(notebookObject.lastEditDate))}
        </p>
      </div>
      {notebookObject.tags.length != 0 ? <div className="divider"></div> : ""}
      <div className="flex gap-2">
        <div className="flex gap-2 flex-wrap max-w-full overflow-hidden">
          {notebookObject.tags.slice(0, 5).map((tag, index) => (
            <Tag key={index} tagText={tag} showTagIcon={true} />
          ))}
          {notebookObject.tags.length > 5 && (
            <Tag
              key="more"
              moreTag={true}
              tagText={`${notebookObject.tags.length - 5} more`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default GridNotebook;
