import { Clock, FileEdit, PenSquare, Pin, PinOff, Trash2 } from "lucide-react";
import { dateDistanceFromNow } from "../../utils/dateDistanceFromNow";
import { objectToDate } from "../../utils/objectToDate";
import { formatDateDDMMYY } from "../../utils/formatDateDDMMYY";
import Tag from "./Tag";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useNotesStore } from "../../store/notesStore";
import { hardDeleteNote, updatePinStatus } from "../../firebase/services";
import { useMessageStore } from "../../store/messageStore";
import { useEditTargetNoteStore } from "../../store/editTargetNoteStore";
import { useState } from "react";

function GridNote({ noteObject }) {
  const { notes, setNotes } = useNotesStore();
  const { message, setMessage } = useMessageStore();
  const { editTargetNote, setEditTargetNote } = useEditTargetNoteStore();

  const [updatingPin, setUpdatingPin] = useState(false);
  const [deletingNote, setDeletingNote] = useState(false);

  function handleNotePinAndUnpin(noteId) {
    setUpdatingPin(true);

    updatePinStatus(noteObject.id, noteObject.pinned)
      .then(() => {
        setNotes(
          notes.map((note) =>
            note.id == noteId ? { ...note, pinned: !note.pinned } : note
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

  function handleNoteEditButtonClick() {
    setEditTargetNote(noteObject);
    document.getElementById(APP_CONSTANTS.EDIT_NOTE_MODAL).showModal();
  }

  function deleteCurrentNote() {
    hardDeleteNote(noteObject.id)
      .then(() => {
        setDeletingNote(false);
        setNotes(notes.filter((note) => note.id !== noteObject.id));
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
        setDeletingNote(false);
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

  function handleDeleteButtonClick() {
    setMessage({
      title: APP_CONSTANTS.DELETE_NOTE_MODAL_TITLE,
      textContent: APP_CONSTANTS.DELETE_NOTE_MODAL_TEXT_CONTENT,
      firstButtonClassName: "btn btn-error",
      secondButtonClassName: "btn",
      firstButtonText: APP_CONSTANTS.DELETE,
      secondButtonText: APP_CONSTANTS.CANCEL,
      firstButtonOnClick: function () {
        deleteCurrentNote();
        setDeletingNote(true);
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
      },
      secondButtonOnClick: function () {
        document.getElementById(APP_CONSTANTS.GENERIC_MODAL).close();
      },
    });
    document.getElementById(APP_CONSTANTS.GENERIC_MODAL).showModal();
  }

  return (
    <div className="w-sm bg-base-300 rounded-lg p-4 select-none">
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
            <button
              className="btn btn-square"
              onClick={() => {
                handleNotePinAndUnpin(noteObject.id);
              }}
            >
              {updatingPin ? (
                <span className="loading loading-spinner"></span>
              ) : noteObject.pinned ? (
                <PinOff size={20}></PinOff>
              ) : (
                <Pin size={20}></Pin>
              )}
            </button>
          </div>

          <div className="tooltip" data-tip="Edit details">
            <button
              className="btn btn-square"
              onClick={handleNoteEditButtonClick}
            >
              <FileEdit size={20}></FileEdit>
            </button>
          </div>

          <div className="tooltip tooltip-error" data-tip="Delete note">
            <button
              className="btn btn-square text-error"
              onClick={handleDeleteButtonClick}
            >
              {deletingNote ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <Trash2 size={20}></Trash2>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-2 text-gray-400 text-sm">
        <p className="flex gap-2 items-center">
          <Clock size={20} />
          {formatDateDDMMYY(objectToDate(noteObject.creationDate))}
        </p>

        <p className="flex gap-2 items-center">
          <PenSquare size={20} />
          {dateDistanceFromNow(objectToDate(noteObject.lastEditDate))}
        </p>
      </div>
      <div className="divider"></div>
      <div className="">
        <p
          className={
            noteObject.tags.length != 0 ? "line-clamp-3" : "line-clamp-3 mb-4"
          }
        >
          {noteObject.content != ""
            ? noteObject.content.slice(0, 200) + ".."
            : APP_CONSTANTS.NOTE_EMPTY}
        </p>
      </div>
      {noteObject.tags.length != 0 ? <div className="divider"></div> : ""}
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
