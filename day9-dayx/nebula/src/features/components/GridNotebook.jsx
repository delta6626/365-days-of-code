import { Pin, PinOff, FileEdit, Trash2 } from "lucide-react";
import Tag from "./Tag";
import { formatDateDDMMYY } from "../../utils/formatDateDDMMYY";
import { dateDistanceFromNow } from "../../utils/dateDistanceFromNow";
import { objectToDate } from "../../utils/objectToDate";
import { useState } from "react";
import { Clock, PenSquare } from "lucide-react";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import {
  hardDeleteNotebookAndLinkedNotes,
  updateNotebookPinStatus,
} from "../../firebase/services";
import { useNotebooksStore } from "../../store/notebooksStore";
import { useNotesStore } from "../../store/notesStore";
import { useMessageStore } from "../../store/messageStore";
import { useEditTargetNotebookStore } from "../../store/editTargetNotebookStore";
import { useActiveTabStore } from "../../store/activeTabStore";
import { useNoteSearchTermStore } from "../../store/noteSearchTermStore";

function GridNotebook({ notebookObject }) {
  const { notes, setNotes } = useNotesStore();
  const { notebooks, setNotebooks } = useNotebooksStore();
  const { message, setMessage } = useMessageStore();
  const { editTargetNotebook, setEditTargetNotebook } =
    useEditTargetNotebookStore();
  const { setActiveTab } = useActiveTabStore();
  const { setNoteSearchTerm } = useNoteSearchTermStore();

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

  function handleNotebookEditButtonClick(e) {
    e.stopPropagation();
    setEditTargetNotebook(notebookObject);
    document.getElementById(APP_CONSTANTS.EDIT_NOTEBOOK_MODAL).showModal();
  }

  function handleDeleteButtonClick(e) {
    e.stopPropagation();
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

  function handleNotebookClick() {
    setNoteSearchTerm("book: " + notebookObject.name);
    setActiveTab(APP_CONSTANTS.NOTES_PAGE);
  }

  return (
    <div
      className="w-sm bg-base-300 rounded-lg p-4 select-none cursor-pointer"
      onClick={handleNotebookClick}
    >
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
              disabled={updatingPin}
              onClick={(e) => {
                e.stopPropagation();
                handleNotebookPinAndUnpin();
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
              disabled={deletingNotebook}
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
      {notebookObject.tags.length != 0 ? (
        <div className="divider"></div>
      ) : (
        <div className="">
          <div className="divider"></div>
          <p className="text-gray-400">{APP_CONSTANTS.NO_TAGS}</p>
        </div>
      )}
      <div className="flex gap-2">
        <div className="flex gap-2 flex-wrap max-w-full overflow-hidden">
          {notebookObject.tags.slice(0, 3).map((tag, index) => (
            <Tag
              key={index}
              tagText={tag}
              showTagIcon={true}
              source={APP_CONSTANTS.SOURCE_NOTEBOOK}
            />
          ))}
          {notebookObject.tags.length > 3 && (
            <Tag
              key="more"
              moreTag={true}
              tagText={`${notebookObject.tags.length - 3} more`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default GridNotebook;
