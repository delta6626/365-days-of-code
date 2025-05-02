import { Search, LayoutGrid, Rows3, Table, Plus } from "lucide-react";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useNotesStore } from "../../store/notesStore";
import { useCurrentNotesViewStore } from "../../store/currentNotesViewStore";
import GridNote from "../components/GridNote";

function NotesArea() {
  const { notes, setNotes } = useNotesStore();
  const { notesView, setNotesView } = useCurrentNotesViewStore();

  return (
    <div className="flex-1 h-[100vh] p-4 font-jakarta overflow-y-scroll scroll-smooth scrollbar-thin">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Notes</h1>

        <div className="">
          <div className="w-2xl input focus-within:input-primary">
            <Search className="text-gray-400"></Search>
            <input className="" placeholder="Search for notes" type="text" />
          </div>
          <button className="btn btn-primary ml-2">New note</button>
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

          <div className="tooltip tooltip-left" data-tip="List view">
            <button
              onClick={() => setNotesView(APP_CONSTANTS.VIEW_LIST)}
              className={
                "btn btn-square " +
                (notesView == APP_CONSTANTS.VIEW_LIST
                  ? "btn-active"
                  : "btn-ghost")
              }
            >
              <Rows3></Rows3>
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

      {notesView == APP_CONSTANTS.VIEW_GRID ? (
        <div className="">
          {notes.map((note, id) => {
            return <GridNote key={id} noteObject={note}></GridNote>;
          })}
        </div>
      ) : notesView == APP_CONSTANTS.VIEW_LIST ? (
        <p>LIST view</p>
      ) : notesView == APP_CONSTANTS.VIEW_TABLE ? (
        <p>Table view</p>
      ) : (
        ""
      )}
    </div>
  );
}
export default NotesArea;
