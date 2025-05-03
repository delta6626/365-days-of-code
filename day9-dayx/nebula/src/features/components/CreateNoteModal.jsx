import { useState } from "react";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useNotebooksStore } from "../../store/notebooksStore";

function CreateNoteModal() {
  const { notebooks, setNotebooks } = useNotebooksStore();

  const [noteName, setNoteName] = useState();
  const [selectedNotebook, setSelectedNotebook] = useState();
  const [tags, setTags] = useState([]);

  function handleNameInputChange(e) {
    setNoteName(e.target.value);
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
        <select className="select focus:select-primary w-full mt-2">
          {notebooks.map((notebook, id) => {
            return (
              <option key={id} value={notebook.name}>
                {notebook.id}
              </option>
            );
          })}
        </select>
        <div className="modal-action">
          <button className="btn btn-primary">Create</button>
        </div>
      </div>
    </dialog>
  );
}

export default CreateNoteModal;
