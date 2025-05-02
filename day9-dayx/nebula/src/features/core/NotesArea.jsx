import { Search, LayoutGrid, Rows3, Table, Plus } from "lucide-react";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useCurrentNotesViewStore } from "../../store/currentNotesViewStore";

function NotesArea() {
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
      <div className="divider"></div>
    </div>
  );
}
export default NotesArea;
