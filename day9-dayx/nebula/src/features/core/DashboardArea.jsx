import { useNotesStore } from "../../store/notesStore";
import { useMessageStore } from "../../store/messageStore";
import GridNote from "../components/GridNote";
import GenericModal from "../components/GenericModal";
import EditNoteModal from "../components/EditNoteModal";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";

function DashboardArea() {
  const { notes, setNotes } = useNotesStore();
  const { message, setMessage } = useMessageStore();

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
      </div>
      <div className="divider"></div>
      <div className="flex gap-5 flex-wrap">
        {notes.map((note, id) => {
          if (note.pinned == true) {
            return <GridNote key={id} noteObject={note}></GridNote>;
          }
        })}
      </div>
    </div>
  );
}
export default DashboardArea;
