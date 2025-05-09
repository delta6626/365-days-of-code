import { Search, LayoutGrid, Table, FilePlus, Divide } from "lucide-react";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useNotesStore } from "../../store/notesStore";
import { useCurrentNotesViewStore } from "../../store/currentNotesViewStore";
import { useUserVerifiedStore } from "../../store/userVerifiedStore";
import { useMessageStore } from "../../store/messageStore";
import GridNote from "../components/GridNote";
import TableNote from "../components/TableNote";
import CreateNoteModal from "../components/CreateNoteModal";
import GenericModal from "../components/GenericModal";
import { useState } from "react";
import EditNoteModal from "../components/EditNoteModal";
import NoteEditor from "../components/NoteEditor";

function NotesArea() {
  const { notes, setNotes } = useNotesStore();
  const { notesView, setNotesView } = useCurrentNotesViewStore();
  const { userVerified, setUserVerified } = useUserVerifiedStore();
  const { message, setMessage } = useMessageStore();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotes = notes.filter((note) => {
    const lowerName = note.name.toLowerCase();
    const lowerTags = note.tags.map((tag) => tag.toLowerCase());
    const searchTerms = searchTerm.toLowerCase().split(/\s+/); // split by space

    return (
      lowerName.includes(searchTerm.toLowerCase()) ||
      searchTerms.some((term) => lowerTags.includes(term))
    );
  });

  function handleSearch(e) {
    setSearchTerm(e.target.value);
  }

  function handleNewNoteButtonClick() {
    document.getElementById(APP_CONSTANTS.CREATE_NOTE_MODAL).showModal();
  }

  return (
    <div className="flex-1 h-[100vh] p-4 font-jakarta overflow-y-scroll scroll-smooth scrollbar-thin">
      <CreateNoteModal></CreateNoteModal>
      <GenericModal
        id={APP_CONSTANTS.GENERIC_MODAL}
        title={message.title}
        textContent={message.textContent}
        firstButtonClassName={message.firstButtonClassName}
        secondButtonClassName={message.secondButtonClassName}
        firstButtonOnClick={message.firstButtonOnClick}
        secondButtonOnClick={message.secondButtonOnClick}
        firstButtonText={message.firstButtonText}
        secondButtonText={message.secondButtonText}
      ></GenericModal>
      <EditNoteModal></EditNoteModal>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Notes</h1>
        <div className="flex">
          <div className="w-2xl input focus-within:input-primary">
            <Search className="text-gray-400"></Search>
            <input
              className=""
              placeholder="Search notes"
              type="text"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div
            className={!userVerified ? "tooltip tooltip-right" : ""}
            data-tip={APP_CONSTANTS.VERIFY_EMAIL}
          >
            <div className="tooltip tooltip-bottom" data-tip={"New note"}>
              <button
                className="btn btn-primary btn-square ml-2"
                disabled={!userVerified}
                onClick={handleNewNoteButtonClick}
              >
                <FilePlus></FilePlus>
              </button>
            </div>
          </div>
        </div>

        <div className="">
          <div className="tooltip tooltip-left" data-tip="Grid view">
            <button
              onClick={() => setNotesView(APP_CONSTANTS.VIEW_GRID)}
              className={
                "btn btn-square " +
                (notesView == APP_CONSTANTS.VIEW_GRID
                  ? "btn-active"
                  : "btn-ghost")
              }
            >
              <LayoutGrid></LayoutGrid>
            </button>
          </div>

          <div className="tooltip tooltip-left" data-tip="Table view">
            <button
              onClick={() => setNotesView(APP_CONSTANTS.VIEW_TABLE)}
              className={
                "btn btn-square " +
                (notesView == APP_CONSTANTS.VIEW_TABLE
                  ? "btn-active"
                  : "btn-ghost")
              }
            >
              <Table></Table>
            </button>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {notesView === APP_CONSTANTS.VIEW_NOTE_EDITOR ? (
        <div className="">
          <NoteEditor></NoteEditor>
        </div>
      ) : (
        <div className="">
          {searchTerm == "" && filteredNotes.length != 0 ? (
            <h3 className="text-xl font-semibold">
              All notes ({filteredNotes.length})
            </h3>
          ) : searchTerm != "" && filteredNotes.length != 0 ? (
            <h3 className="text-xl font-semibold">
              Results for “{searchTerm}” — {filteredNotes.length} found
            </h3>
          ) : (
            ""
          )}

          {notesView === APP_CONSTANTS.VIEW_GRID ? (
            filteredNotes.length > 0 ? (
              <div className="flex gap-5 flex-wrap mt-4">
                {filteredNotes.map((note, id) => (
                  <GridNote key={id} noteObject={note} />
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-[calc(100vh-8rem)] text-gray-400 mt-4 select-none">
                <p className="whitespace-pre-line text-center">
                  {APP_CONSTANTS.NO_NOTES}
                </p>
              </div>
            )
          ) : notesView === APP_CONSTANTS.VIEW_TABLE ? (
            filteredNotes.length > 0 ? (
              <div className="rounded-lg bg-base-300 p-4 mt-4">
                <table className="table">
                  <thead>
                    <tr className="text-lg">
                      <th>#</th>
                      <th>Name</th>
                      <th>Content</th>
                      <th>Notebook</th>
                      <th>Tags</th>
                      <th>Created</th>
                      <th>Last edited</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNotes.map((note, id) => (
                      <TableNote key={id} id={id} noteObject={note} />
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex justify-center items-center h-[calc(100vh-8rem)] text-gray-400 mt-4 select-none">
                <p className="whitespace-pre-line text-center">
                  {APP_CONSTANTS.NO_NOTES}
                </p>
              </div>
            )
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}
export default NotesArea;
