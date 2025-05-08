import { dateDistanceFromNow } from "../../utils/dateDistanceFromNow";
import { objectToDate } from "../../utils/objectToDate";
import { formatDateDDMMYY } from "../../utils/formatDateDDMMYY";
import Tag from "./Tag";
import { PinOff, Pin, FileEdit, Trash2 } from "lucide-react";
import { useState } from "react";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useNotesStore } from "../../store/notesStore";
import { useNotebooksStore } from "../../store/notebooksStore";
import { useMessageStore } from "../../store/messageStore";
import {
  hardDeleteNotebookAndLinkedNotes,
  updateNotebookPinStatus,
} from "../../firebase/services";

function TableNotebook({ id, notebookObject }) {
  const { notes, setNotes } = useNotesStore();
  const { notebooks, setNotebooks } = useNotebooksStore();
  const { message, setMessage } = useMessageStore();

  const [updatingPin, setUpdatingPin] = useState(false);
  const [deletingNotebook, setDeletingNotebook] = useState(false);

  function handleNotebookPinAndUnpin() {
    setUpdatingPin(true);

    updateNotebookPinStatus(notebookObject.id, notebookObject.pinned)
      .then(() => {
        setNotebooks(
          notebooks.map((notebook) =>
            notebook.id == notebookObject.id
              ? { ...notebook, pinned: !notebook.pinned }
              : notebook
          )
        );
        setUpdatingPin(false);
      })
      .catch((error) => {
        setUpdatingPin(false);
        setMessage({
          title: APP_CONSTANTS.ERROR_MODAL_TITLE,
          textContent: APP_CONSTANTS.ERROR_MODAL_TEXT_CONTENT + "\n" + error,
          firstButtonClassName: "btn btn-error",
          secondButtonClassName: "hidden",
          firstButtonText: APP_CONSTANTS.OK,
          secondButtonText: "",
          firstButtonOnClick: function () {
            document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
          },
          secondButtonOnClick: function () {},
        });
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
      });
  }

  function deleteCurrentNotebook() {
    hardDeleteNotebookAndLinkedNotes(notebookObject.id, notebookObject.name)
      .then(() => {
        setDeletingNotebook(false);
        setNotes(
          notes.filter(
            (note) =>
              note.assignedTo == [notebookObject.id, notebookObject.name]
          )
        );
        setNotebooks(
          notebooks.filter((notebook) => notebook.id !== notebookObject.id)
        );

        setMessage({
          title: APP_CONSTANTS.SUCCESS_MODAL_TITLE,
          textContent: APP_CONSTANTS.SUCCESS_MODAL_TEXT_CONTENT,
          firstButtonClassName: "btn btn-primary",
          secondButtonClassName: "hidden",
          firstButtonText: APP_CONSTANTS.OK,
          secondButtonText: "",
          firstButtonOnClick: function () {
            document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
          },
          secondButtonOnClick: function () {},
        });
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
      })
      .catch((error) => {
        setDeletingNotebook(false);
        setMessage({
          title: APP_CONSTANTS.ERROR_MODAL_TITLE,
          textContent: APP_CONSTANTS.ERROR_MODAL_TEXT_CONTENT + "\n" + error,
          firstButtonClassName: "btn btn-error",
          secondButtonClassName: "hidden",
          firstButtonText: APP_CONSTANTS.OK,
          secondButtonText: "",
          firstButtonOnClick: function () {
            document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
          },
          secondButtonOnClick: function () {},
        });
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
      });
  }

  function handleNotebookEditButtonClick() {}

  function handleDeleteButtonClick() {
    setMessage({
      title: APP_CONSTANTS.DELETE_NOTEBOOK_MODAL_TITLE,
      textContent: APP_CONSTANTS.DELETE_NOTEBOOK_MODAL_TEXT_CONTENT,
      firstButtonClassName: "btn btn-error",
      secondButtonClassName: "btn",
      firstButtonText: APP_CONSTANTS.DELETE,
      secondButtonText: APP_CONSTANTS.CANCEL,
      firstButtonOnClick: function () {
        deleteCurrentNotebook();
        setDeletingNotebook(true);
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
      },
      secondButtonOnClick: function () {
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
      },
    });
    document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
  }

  return (
    <tr className="hover:bg-base-200 cursor-pointer">
      <th className="font-normal">{id + 1}</th>
      <td className="text-lg break-all" title={notebookObject.name}>
        {notebookObject.name}
      </td>
      <td className="flex flex-wrap items-center gap-2">
        {notebookObject.tags.length == 0 ? (
          <p className="text-gray-400">{APP_CONSTANTS.NO_TAGS}</p>
        ) : (
          ""
        )}
        {notebookObject.tags.slice(0, 10).map((tag, index) => (
          <Tag key={index} tagText={tag} showTagIcon={false} />
        ))}
        {notebookObject.tags.length > 10 && (
          <Tag
            key="more"
            moreTag={true}
            tagText={`${notebookObject.tags.length - 10} more`}
          />
        )}
      </td>

      <td className="text-gray-400 whitespace-nowrap">
        {formatDateDDMMYY(objectToDate(notebookObject.creationDate))}
      </td>

      <td className="text-gray-400 whitespace-nowrap">
        {dateDistanceFromNow(objectToDate(notebookObject.lastEditDate))}
      </td>

      <td>
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
              onClick={() => handleNotebookPinAndUnpin(notebookObject.id)}
            >
              {updatingPin ? (
                <span className="loading loading-spinner"></span>
              ) : notebookObject.pinned ? (
                <PinOff size={20} />
              ) : (
                <Pin size={20} />
              )}
            </button>
          </div>

          <div className="tooltip" data-tip="Edit details">
            <button
              className="btn btn-square"
              onClick={handleNotebookEditButtonClick}
            >
              <FileEdit size={20} />
            </button>
          </div>

          <div className="tooltip tooltip-error" data-tip="Delete notebook">
            <button
              className="btn btn-square text-error"
              onClick={handleDeleteButtonClick}
            >
              {deletingNotebook ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <Trash2 size={20} />
              )}
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default TableNotebook;
