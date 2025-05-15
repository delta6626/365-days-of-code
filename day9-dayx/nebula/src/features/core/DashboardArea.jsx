import { useNotesStore } from "../../store/notesStore";
import { useMessageStore } from "../../store/messageStore";
import { useCurrentNotesViewStore } from "../../store/currentNotesViewStore";
import { useUserVerifiedStore } from "../../store/userVerifiedStore";
import GridNote from "../components/GridNote";
import TableNote from "../components/TableNote";
import GenericModal from "../components/GenericModal";
import EditNoteModal from "../components/EditNoteModal";
import CreateNoteModal from "../components/CreateNoteModal";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useEffect, useState } from "react";
import { Search, Table, LayoutGrid, BookPlus, FilePlus } from "lucide-react";
import { objectToDate } from "../../utils/objectToDate";
import CreateNotebookModal from "../components/CreateNotebookModal";
import { useNotebooksStore } from "../../store/notebooksStore";
import GridNotebook from "../components/GridNotebook";
import TableNotebook from "../components/TableNotebook";
import EditNotebookModal from "../components/EditNotebookModal";
import NoteEditor from "../components/NoteEditor";

function DashboardArea() {
  const { notes } = useNotesStore();
  const { notebooks } = useNotebooksStore();
  const { message } = useMessageStore();
  const { notesView, setNotesView } = useCurrentNotesViewStore();
  const { userVerified, setUserVerified } = useUserVerifiedStore();

  const [searchTerm, setSearchTerm] = useState("");

  const pinnedNotes = notes.filter((note) => note.pinned === true);
  const pinnedNotebooks = notebooks.filter(
    (notebook) => notebook.pinned === true
  );
  const taggedNotes = notes.filter((note) => note.tags.length > 0);
  const untaggedNotes = notes.filter((note) => note.tags.length === 0);
  const recentNotes = notes
    .filter((note) => {
      return (
        new Date().getTime() - objectToDate(note.lastEditDate).getTime() <=
        592200000 // 7 day time window
      );
    })
    .slice(0, APP_CONSTANTS.RECENT_LIMIT);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  function handleNewNoteButtonClick() {
    document.getElementById(APP_CONSTANTS.CREATE_NOTE_MODAL).showModal();
  }

  function handleNewNotebookButtonClick() {
    document.getElementById(APP_CONSTANTS.CREATE_NOTEBOOK_MODAL).showModal();
  }

  const renderNoteSection = (title, noteList) => {
    if (noteList.length === 0) {
      return;
    }

    return (
      <div className="px-8">
        <div className="collapse collapse-arrow mt-4">
          <input type="checkbox"></input>
          <div className="collapse-title text-xl font-semibold">
            {title} ({noteList.length})
          </div>
          {notesView === APP_CONSTANTS.VIEW_GRID ? (
            <div className="collapse-content flex gap-5 flex-wrap mt-4">
              {noteList.map((note, id) => (
                <GridNote key={id} noteObject={note} />
              ))}
            </div>
          ) : (
            <div className="collapse-content rounded-lg bg-base-300 p-4 mt-4 overflow-hidden">
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
                  {noteList.map((note, id) => (
                    <TableNote key={id} id={id} noteObject={note} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderNotebookSection = (title, notebookList) => {
    if (notebookList.length === 0) {
      return;
    }

    return (
      <div className="px-8">
        <div className="collapse collapse-arrow mt-4">
          <input type="checkbox"></input>
          <div className="collapse-title text-xl font-semibold">
            {title} ({notebookList.length})
          </div>
          {notesView === APP_CONSTANTS.VIEW_GRID ? (
            <div className="collapse-content flex gap-5 flex-wrap mt-4">
              {notebookList.map((notebook, id) => (
                <GridNotebook key={id} notebookObject={notebook} />
              ))}
            </div>
          ) : (
            <div className="collapse-content rounded-lg bg-base-300 p-4 mt-4 overflow-hidden">
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
                  {notebookList.map((notebook, id) => (
                    <TableNotebook key={id} id={id} notebookObject={notebook} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    setNotesView(APP_CONSTANTS.VIEW_GRID);
  }, []);

  return (
    <div className="flex-1 h-[100vh] font-jakarta overflow-y-scroll scroll-smooth scrollbar-thin">
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
      <EditNotebookModal></EditNotebookModal>
      <CreateNoteModal></CreateNoteModal>
      <CreateNotebookModal></CreateNotebookModal>

      {notesView === APP_CONSTANTS.VIEW_NOTE_EDITOR ? (
        <NoteEditor></NoteEditor>
      ) : (
        <div className="py-4">
          <div className="flex items-center justify-between px-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="flex">
              <div className="w-2xl input focus-within:input-primary">
                <Search className="text-gray-400"></Search>
                <input
                  className=""
                  placeholder="Search anything"
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
                <div
                  className="tooltip tooltip-bottom"
                  data-tip={"New notebook"}
                >
                  <button
                    className="btn btn-primary btn-square ml-2"
                    disabled={!userVerified}
                    onClick={handleNewNotebookButtonClick}
                  >
                    <BookPlus></BookPlus>
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

          <div className="divider" />

          {renderNoteSection("Pinned notes", pinnedNotes)}
          {renderNotebookSection("Pinned notebooks", pinnedNotebooks)}
          {renderNoteSection("Recent notes", recentNotes)}
          {renderNoteSection("Tagged notes", taggedNotes)}
          {renderNoteSection("Untagged notes", untaggedNotes)}
        </div>
      )}
    </div>
  );
}

export default DashboardArea;
