import { useState } from "react";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useNotesStore } from "../../store/notesStore";
import { useNotebooksStore } from "../../store/notebooksStore";
import { addNoteToDatabase } from "../../firebase/services";
import { toTimestamp } from "../../utils/toTimestamp";
import Tag from "../components/Tag";

function CreateNoteModal() {
  const { notebooks, setNotebooks } = useNotebooksStore();
  const { notes, setNotes } = useNotesStore();

  const [noteName, setNoteName] = useState("");
  const [selectedNotebook, setSelectedNotebook] = useState("");
  const [tags, setTags] = useState([]);
  const [notebookEmpty, setNotebookEmpty] = useState(false);
  const [creatingNote, setCreatingNote] = useState(false);

  function handleNameInputChange(e) {
    setNoteName(e.target.value);
  }

  function handleSelectChange(e) {
    setSelectedNotebook(e.target.value);
  }

  function handleTagChange(e) {
    if (e.code === "Enter" || e.code === "Space") {
      let tagContent = e.target.value.trim();
      e.target.value = "";
      if (tagContent && tags.length < APP_CONSTANTS.TAG_LIMIT) {
        setTags([...tags, tagContent]);
      }
    }
  }

  function handleCreateButtonClick() {
    if (selectedNotebook == "") {
      setNotebookEmpty(true);
      return;
    }

    setCreatingNote(true);

    addNoteToDatabase(
      noteName == "" ? "Untitled" : noteName,
      selectedNotebook,
      tags
    )
      .then((doc) => {
        const noteObject = {
          id: doc.id,
          name: noteName == "" ? "Untitled" : noteName,
          assignedTo: selectedNotebook,
          content: "",
          pinned: false,
          referencedBy: {},
          references: {},
          tags: tags,
          creationDate: toTimestamp(new Date()),
          lastEditDate: toTimestamp(new Date()),
        };

        setNotes([...notes, noteObject]);
        setCreatingNote(false);
      })
      .catch((error) => {
        setCreatingNote(false);
        alert(error);
      });
  }

  function handleCloseButtonClick() {
    document.getElementById(APP_CONSTANTS.CREATE_NOTE_MODAL).close();
  }

  return (
    <dialog id={APP_CONSTANTS.CREATE_NOTE_MODAL} className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Create a new note</h3>
        <input
          type="text"
          className="input focus:input-primary w-full mt-4"
          placeholder="Note name"
          maxLength={150}
          value={noteName}
          onChange={handleNameInputChange}
        />

        <select
          className={
            !notebookEmpty
              ? "select focus:select-primary w-full mt-2"
              : "select select-error w-full mt-2"
          }
          value={selectedNotebook}
          onChange={handleSelectChange}
        >
          <option value="">Select a notebook</option>
          {notebooks.map((notebook, id) => {
            return (
              <option key={id} value={notebook.id}>
                {notebook.name}
              </option>
            );
          })}
        </select>

        <input
          className="input focus:input-primary w-full mt-2"
          placeholder="Write a tag and press space"
          maxLength={30}
          onKeyDown={handleTagChange}
        ></input>
        <div className="flex gap-2 flex-wrap max-w-full overflow-hidden mt-4">
          {tags.map((tagContent, id) => {
            return (
              <Tag
                id={id}
                tags={tags}
                setTags={setTags}
                onDeleteClick={(tagId) => {
                  const newTags = tags.filter((_, index) => index !== tagId);
                  setTags(newTags);
                }}
                tagText={tagContent}
                showTagIcon={false}
                showDeleteIcon={true}
                darkBackground={true}
              ></Tag>
            );
          })}
        </div>
        <div className="modal-action">
          <button className="btn btn-primary" onClick={handleCreateButtonClick}>
            {!creatingNote ? (
              APP_CONSTANTS.CREATE
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </button>
          <button className="btn" onClick={handleCloseButtonClick}>
            {APP_CONSTANTS.CANCEL}
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default CreateNoteModal;
