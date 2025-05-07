import GenericModal from "../components/GenericModal";
import EditNoteModal from "../components/EditNoteModal";
import CreateNotebookModal from "../components/CreateNotebookModal";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useMessageStore } from "../../store/messageStore";
import { useCurrentNotesViewStore } from "../../store/currentNotesViewStore";
import { useNotebooksStore } from "../../store/notebooksStore";
import { useUserVerifiedStore } from "../../store/userVerifiedStore";
import { Search, Table, LayoutGrid, BookPlus } from "lucide-react";
import { useState } from "react";
import GridNotebook from "../components/GridNotebook";
import TableNotebook from "../components/TableNotebook";

function NotebooksArea() {
  const { message } = useMessageStore();
  const { notebooks } = useNotebooksStore();
  const { notesView, setNotesView } = useCurrentNotesViewStore();
  const { userVerified } = useUserVerifiedStore();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotebooks = notebooks.filter((notebook) => {
    const lowerName = notebook.name.toLowerCase();
    const lowerTags = notebook.tags.map((tag) => tag.toLowerCase());
    const searchTerms = searchTerm.toLowerCase().split(/\s+/); // split by space

    return (
      lowerName.includes(searchTerm.toLowerCase()) ||
      searchTerms.some((term) => lowerTags.includes(term))
    );
  });

  function handleSearch(e) {
    setSearchTerm(e.target.value);
  }

  function handleNewNotebookButtonClick() {
    document.getElementById(APP_CONSTANTS.CREATE_NOTEBOOK_MODAL).showModal();
  }

  return (
    <div className="flex-1 h-[100vh] p-4 font-jakarta overflow-y-scroll scroll-smooth scrollbar-thin">
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
      />
      <EditNoteModal />
      <CreateNotebookModal />

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Notebooks</h1>
        <div className="flex">
          <div className="w-2xl input focus-within:input-primary">
            <Search className="text-gray-400" />
            <input
              className=""
              placeholder="Search notebooks"
              type="text"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div
            className={!userVerified ? "tooltip tooltip-right" : ""}
            data-tip={APP_CONSTANTS.VERIFY_EMAIL}
          >
            <div className="tooltip tooltip-bottom" data-tip={"New notebook"}>
              <button
                className="btn btn-primary btn-square ml-2"
                disabled={!userVerified}
                onClick={handleNewNotebookButtonClick}
              >
                <BookPlus />
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
                (notesView === APP_CONSTANTS.VIEW_GRID
                  ? "btn-active"
                  : "btn-ghost")
              }
            >
              <LayoutGrid />
            </button>
          </div>

          <div className="tooltip tooltip-left" data-tip="Table view">
            <button
              onClick={() => setNotesView(APP_CONSTANTS.VIEW_TABLE)}
              className={
                "btn btn-square " +
                (notesView === APP_CONSTANTS.VIEW_TABLE
                  ? "btn-active"
                  : "btn-ghost")
              }
            >
              <Table />
            </button>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <div className="">
        {searchTerm === "" && filteredNotebooks.length !== 0 ? (
          <h3 className="text-xl font-semibold">
            All notebooks ({filteredNotebooks.length})
          </h3>
        ) : searchTerm !== "" && filteredNotebooks.length !== 0 ? (
          <h3 className="text-xl font-semibold">
            Results for “{searchTerm}” — {filteredNotebooks.length} found
          </h3>
        ) : (
          ""
        )}

        {notesView === APP_CONSTANTS.VIEW_GRID ? (
          filteredNotebooks.length > 0 ? (
            <div className="flex gap-5 flex-wrap mt-4">
              {filteredNotebooks.map((notebook, id) => (
                <GridNotebook key={id} notebookObject={notebook} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-[calc(100vh-8rem)] text-gray-400 mt-4 select-none">
              {APP_CONSTANTS.NO_NOTEBOOKS}
            </div>
          )
        ) : notesView === APP_CONSTANTS.VIEW_TABLE ? (
          filteredNotebooks.length > 0 ? (
            <div className="rounded-lg bg-base-300 p-4 mt-4">
              <table className="table">
                <thead>
                  <tr className="text-lg">
                    <th>#</th>
                    <th>Name</th>
                    <th>Tags</th>
                    <th>Created</th>
                    <th>Last edited</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNotebooks.map((notebook, id) => (
                    <TableNotebook key={id} id={id} notebookObject={notebook} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex justify-center items-center h-[calc(100vh-8rem)] text-gray-400 mt-4 select-none">
              {APP_CONSTANTS.NO_NOTEBOOKS}
            </div>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default NotebooksArea;
