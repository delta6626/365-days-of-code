import { Search, LayoutGrid, Table } from "lucide-react";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useNotesStore } from "../../store/notesStore";
import { useCurrentNotesViewStore } from "../../store/currentNotesViewStore";
import { useUserVerifiedStore } from "../../store/userVerifiedStore";
import GridNote from "../components/GridNote";
import TableNote from "../components/TableNote";
import CreateNoteModal from "../components/CreateNoteModal";

function NotesArea() {
  const { notes, setNotes } = useNotesStore();
  const { notesView, setNotesView } = useCurrentNotesViewStore();
  const { userVerified, setUserVerified } = useUserVerifiedStore();

  function handleNewNoteButtonClick() {
    document.getElementById(APP_CONSTANTS.CREATE_NOTE_MODAL).showModal();
  }

  return (
    <div className="flex-1 h-[100vh] p-4 font-jakarta overflow-y-scroll scroll-smooth scrollbar-thin">
      <CreateNoteModal></CreateNoteModal>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Notes</h1>
        <div className="flex">
          <div className="w-2xl input focus-within:input-primary">
            <Search className="text-gray-400"></Search>
            <input className="" placeholder="Search for notes" type="text" />
          </div>
          <div
            className={!userVerified ? "tooltip tooltip-right" : ""}
            data-tip={APP_CONSTANTS.VERIFY_EMAIL}
          >
            <button
              className="btn btn-primary ml-2"
              disabled={!userVerified}
              onClick={handleNewNoteButtonClick}
            >
              New note
            </button>
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

      {notesView === APP_CONSTANTS.VIEW_GRID ? (
        notes.length > 0 ? (
          <div className="flex gap-5 flex-wrap">
            {notes.map((note, id) => (
              <>
                <GridNote key={id} noteObject={note} />
              </>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[calc(100vh-8rem)] text-gray-400 mt-4 select-none">
            {APP_CONSTANTS.NO_NOTES}
          </div>
        )
      ) : notesView === APP_CONSTANTS.VIEW_TABLE ? (
        notes.length > 0 ? (
          <div className="rounded-lg bg-base-300">
            <table className="table">
              <thead>
                <tr className="text-lg">
                  <th>#</th>
                  <th>Name</th>
                  <th>Content</th>
                  <th>Tags</th>
                  <th>Created</th>
                  <th>Last edited</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {notes.map((note, id) => (
                  <TableNote key={id} id={id} noteObject={note} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center items-center h-[calc(100vh-8rem)] text-gray-400 mt-4 select-none">
            {APP_CONSTANTS.NO_NOTES}
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
}
export default NotesArea;
