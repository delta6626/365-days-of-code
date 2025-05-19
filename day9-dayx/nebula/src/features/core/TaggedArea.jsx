import { useCurrentNotesViewStore } from "../../store/currentNotesViewStore";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useState } from "react";
import { Search, LayoutGrid, Table } from "lucide-react";
import { useNotesStore } from "../../store/notesStore";
import { useNotebooksStore } from "../../store/notebooksStore";

function TaggedArea() {
  const { notesView, setNotesView } = useCurrentNotesViewStore();
  const [searchTerm, setSearchTerm] = useState();
  const { notes } = useNotesStore();
  const { notebooks } = useNotebooksStore();

  function handleSearch(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <div className="flex-1 bg-base-300 h-[100vh] py-4 font-jakarta overflow-y-scroll scroll-smooth scrollbar-thin">
      {notesView == APP_CONSTANTS.VIEW_NOTE_EDITOR ? (
        <NoteEditor></NoteEditor>
      ) : (
        <>
          <div className="flex items-center justify-between px-8">
            <h1 className="text-3xl font-bold min-w-[200px]">Tagged</h1>
            <div className="flex">
              <div className="w-2xl input focus-within:input-primary">
                <Search className="text-gray-400"></Search>
                <input
                  className=""
                  placeholder="Search tagged items"
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>

            <div className="flex gap-2">
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

          {/* <div className="px-8">
            {searchTerm == "" && filteredItems.length != 0 ? (
              <h3 className="text-xl font-semibold">
                All notes ({filteredItems.length})
              </h3>
            ) : searchTerm != "" && filteredItems.length != 0 ? (
              <h3 className="text-xl font-semibold">
                Results for “{searchTerm}” — {filteredItems.length} found
              </h3>
            ) : (
              ""
            )}

             {notesView === APP_CONSTANTS.VIEW_GRID ? (
              filteredItems.length > 0 ? (
                <div className="flex gap-5 flex-wrap mt-4">
                  {filteredItems.map((note, id) => (
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
              filteredItems.length > 0 ? (
                <div className="rounded-lg bg-base-100 p-4 mt-4">
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
          </div> */}
        </>
      )}
    </div>
  );
}

export default TaggedArea;
