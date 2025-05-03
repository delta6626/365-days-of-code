import { dateDistanceFromNow } from "../../utils/dateDistanceFromNow";
import { objectToDate } from "../../utils/objectToDate";
import { formatDateDDMMYY } from "../../utils/formatDateDDMMYY";
import Tag from "./Tag";
import { PinOff, Pin, FileEdit, Trash2 } from "lucide-react";

function TableNote({ id, noteObject }) {
  return (
    <tr className="hover:bg-base-200 cursor-pointer">
      <th className="text-lg">{id + 1}</th>
      <td className="text-lg" title={noteObject.name}>
        {noteObject.name}
      </td>
      <td className="s">{noteObject.content.slice(0, 100) + ".."}</td>
      <td className="flex gap-2">
        {noteObject.tags.slice(0, 3).map((tag, index) => (
          <Tag key={index} tagText={tag} showTagIcon={false} />
        ))}
        {noteObject.tags.length > 3 && (
          <Tag
            key="more"
            moreTag={true}
            tagText={`${noteObject.tags.length - 3} more`}
          />
        )}
      </td>
      <td>{formatDateDDMMYY(objectToDate(noteObject.creationDate))}</td>
      <td>{dateDistanceFromNow(objectToDate(noteObject.lastEditDate))}</td>
      <td>
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
      </td>
    </tr>
  );
}

export default TableNote;
