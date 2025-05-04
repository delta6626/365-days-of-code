import { Clock, FileEdit, PenSquare, Pin, PinOff, Trash2 } from "lucide-react";
import { dateDistanceFromNow } from "../../utils/dateDistanceFromNow";
import { objectToDate } from "../../utils/objectToDate";
import { formatDateDDMMYY } from "../../utils/formatDateDDMMYY";
import Tag from "./Tag";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";

function GridNote({ noteObject }) {
  return (
    <div className="w-sm bg-base-300 rounded-lg p-4">
      <div className="flex gap-2 items-center justify-between">
        <h3
          className="text-xl font-semibold overflow-hidden whitespace-nowrap truncate"
          title={noteObject.name}
        >
          {noteObject.name}
        </h3>
        <div className="flex gap-2">
          <div
            className="tooltip"
            data-tip={
              noteObject.pinned ? "Unpin from dashboard" : "Pin to dashboard"
            }
          >
            <button className="btn btn-square">
              {noteObject.pinned ? <PinOff></PinOff> : <Pin></Pin>}
            </button>
          </div>

          <div className="tooltip" data-tip="Edit details">
            <button className="btn btn-square">
              <FileEdit></FileEdit>
            </button>
          </div>

          <div className="tooltip tooltip-error" data-tip="Delete note">
            <button className="btn btn-square text-error">
              <Trash2></Trash2>
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-2 text-gray-400">
        <p className="flex gap-2 items-center">
          <Clock />
          {formatDateDDMMYY(objectToDate(noteObject.creationDate))}
        </p>

        <p className="flex gap-2 items-center">
          <PenSquare />
          {dateDistanceFromNow(objectToDate(noteObject.lastEditDate))}
        </p>
      </div>
      <div className="divider"></div>
      <div className="">
        <p className="line-clamp-3">
          {noteObject.content != ""
            ? noteObject.content.slice(0, 200) + ".."
            : APP_CONSTANTS.NOTE_EMPTY}
        </p>
      </div>
      <div className="divider"></div>
      <div className="flex gap-2">
        <div className="flex gap-2 flex-wrap max-w-full overflow-hidden">
          {noteObject.tags.slice(0, 5).map((tag, index) => (
            <Tag key={index} tagText={tag} showTagIcon={true} />
          ))}
          {noteObject.tags.length > 5 && (
            <Tag
              key="more"
              moreTag={true}
              tagText={`${noteObject.tags.length - 5} more`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default GridNote;
