import { useNotesStore } from "../../store/notesStore";
import { useMessageStore } from "../../store/messageStore";
import GridNote from "../components/GridNote";
import GenericModal from "../components/GenericModal";
import EditNoteModal from "../components/EditNoteModal";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useState } from "react";
import { Search } from "lucide-react";

function DashboardArea() {
  const { notes, setNotes } = useNotesStore();
  const { message, setMessage } = useMessageStore();

  const [searchTerm, setSearchTerm] = useState("");

  const pinnedNotes = notes.filter((note) => note.pinned === true);
  const taggedNotes = notes.filter((note) => note.tags.length > 0);
  const untaggedNotes = notes.filter((note) => note.tags.length == 0);

  function handleSearch() {}

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
      ></GenericModal>
      <EditNoteModal></EditNoteModal>
      <div className="flex items-center justify-between">
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
          <button className="btn btn-primary ml-2">Create</button>
        </div>
        <div className="">
          <h1></h1>
        </div>
      </div>
      <div className="divider"></div>
      <div className="">
        {pinnedNotes.length != 0 ? (
          <h3 className="text-xl font-semibold">
            Pinned notes ({pinnedNotes.length})
          </h3>
        ) : (
          ""
        )}
        <div className="flex gap-5 flex-wrap mt-4">
          {pinnedNotes.map((note, id) => (
            <GridNote key={id} noteObject={note} />
          ))}
        </div>
      </div>
      <div className="mt-4">
        {taggedNotes.length != 0 ? (
          <h3 className="text-xl font-semibold">
            Tagged ({taggedNotes.length})
          </h3>
        ) : (
          ""
        )}
        <div className="flex gap-5 flex-wrap mt-4">
          {taggedNotes.map((note, id) => (
            <GridNote key={id} noteObject={note} />
          ))}
        </div>
      </div>
      <div className="mt-4">
        {untaggedNotes.length != 0 ? (
          <h3 className="text-xl font-semibold">
            Untagged ({untaggedNotes.length})
          </h3>
        ) : (
          ""
        )}
        <div className="flex gap-5 flex-wrap mt-4">
          {untaggedNotes.map((note, id) => (
            <GridNote key={id} noteObject={note} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default DashboardArea;
