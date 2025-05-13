import { useCurrentNotesViewStore } from "../../store/currentNotesViewStore";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { Save, X, Book, FileWarning, Check, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { objectToDate } from "../../utils/objectToDate";
import { dateDistanceFromNow } from "../../utils/dateDistanceFromNow";
import { useEditTargetNoteStore } from "../../store/editTargetNoteStore";
import { useNotesStore } from "../../store/notesStore";
import { useCurrentEditor } from "@tiptap/react";
import { updateNoteFromEditor } from "../../firebase/services";
import { toTimestamp } from "../../utils/toTimestamp";
import debounce from "lodash.debounce";

function EditorMenuTopBar() {
  const { editTargetNote, setEditTargetNote } = useEditTargetNoteStore();
  const { notesView, setNotesView } = useCurrentNotesViewStore();
  const { notes, setNotes } = useNotesStore();
  const { editor } = useCurrentEditor();

  const [noteName, setNoteName] = useState();
  const [noteContentDelta, setnoteContentDelta] = useState(false);
  const [noteNameDelta, setNoteNameDelta] = useState(false);
  const [saving, setSaving] = useState(false);

  function handleNoteNameChange(e) {
    setNoteName(e.target.value);
    if (e.target.value !== editTargetNote.name) {
      setNoteNameDelta(true);
    } else {
      setNoteNameDelta(false);
    }
  }

  function handleSaveButtonClick() {
    if (!noteContentDelta && !noteNameDelta) return; // Nothing to save

    setSaving(true);
    const date = new Date();

    // Build the object to update Firestore
    const updatedNotePropertiesObject = {
      lastEditDate: date,
    };

    if (noteNameDelta) {
      updatedNotePropertiesObject.name = noteName;
    }

    if (noteContentDelta) {
      updatedNotePropertiesObject.content = editor.getHTML();
    }

    updateNoteFromEditor(editTargetNote.id, updatedNotePropertiesObject)
      .then(() => {
        // Build the updated local note object
        const updatedNote = {
          ...editTargetNote,
          lastEditDate: toTimestamp(date),
        };

        if (noteNameDelta) {
          updatedNote.name = noteName;
        }

        if (noteContentDelta) {
          updatedNote.content = editor.getHTML();
        }

        setEditTargetNote(updatedNote);
        setNotes(
          notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
        );
        setNoteNameDelta(false);
        setnoteContentDelta(false);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setSaving(false);
      });
  }

  function handleCloseButtonClick() {
    setNotesView(APP_CONSTANTS.VIEW_GRID);
  }

  function updateFunction({ editor }) {
    console.log("executed");
    if (editor.getHTML() === "<p></p>" && editTargetNote.content === "") {
      setnoteContentDelta(false);
      return;
    }
    if (editor.getHTML() != editTargetNote.content) {
      setnoteContentDelta(true);
    } else {
      setnoteContentDelta(false);
    }
  }

  editor.on("update", debounce(updateFunction, 300)); // Make sure the update function runs 300ms after the user stops typing

  useEffect(() => {
    setNoteName(editTargetNote.name);
  }, []);

  return (
    <div className="">
      <div className="flex justify-between">
        <div className="flex-grow">
          <input
            type="text"
            className="input shadow-none border-none w-full text-2xl font-bold pl-0 focus:outline-none focus:shadow-none"
            placeholder="Untitled note"
            value={noteName}
            maxLength={150}
            onChange={handleNoteNameChange}
          />
        </div>
        <div className="flex gap-2">
          <div className="tooltip tooltip-bottom ml-2">
            <button className="btn btn-square" onClick={handleSaveButtonClick}>
              {saving ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <Save></Save>
              )}
            </button>
          </div>
          <div className="tooltip tooltip-bottom" data-tip={"Close"}>
            <button className="btn btn-square" onClick={handleCloseButtonClick}>
              <X></X>
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-gray-400 flex items-center gap-4">
          <div className="btn bg-base-100 text-gray-400 flex gap-2 items-center max-w-full">
            <Book size={20} className="flex-shrink-0" />
            <span className="overflow-hidden whitespace-nowrap text-ellipsis block w-full">
              {editTargetNote.assignedTo[1]}
            </span>
          </div>

          <p> • </p>

          <p className="">
            {"Last edited " +
              dateDistanceFromNow(objectToDate(editTargetNote.lastEditDate))}
          </p>

          <p> • </p>

          <div className="">
            {!noteContentDelta && !noteNameDelta ? (
              <p className="flex items-center gap-2">
                Up to date{" "}
                <CheckCircle2 className="text-primary"></CheckCircle2>
              </p>
            ) : (
              <p className="flex items-center gap-2">
                Unsaved changes{" "}
                <FileWarning className="animate-pulse text-warning"></FileWarning>
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
}

export default EditorMenuTopBar;
