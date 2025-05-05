import { useNotesStore } from "../../store/notesStore";
import GridNote from "../components/GridNote";

function DashboardArea() {
  const { notes, setNotes } = useNotesStore();

  return (
    <div className="flex-1 h-[100vh] p-4 font-jakarta overflow-y-scroll scroll-smooth scrollbar-thin">
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
