import { LayoutGrid, Table } from "lucide-react";
import { useCurrentNotesViewStore } from "../../store/currentNotesViewStore";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";

function ViewSwitcher() {
  const { notesView, setNotesView } = useCurrentNotesViewStore();

  return (
    <div className="flex gap-2">
      <div className="tooltip tooltip-left" data-tip="Grid view">
        <button
          onClick={() => setNotesView(APP_CONSTANTS.VIEW_GRID)}
          className={
            "btn btn-square " +
            (notesView == APP_CONSTANTS.VIEW_GRID ? "btn-active" : "btn-ghost")
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
            (notesView == APP_CONSTANTS.VIEW_TABLE ? "btn-active" : "btn-ghost")
          }
        >
          <Table></Table>
        </button>
      </div>
    </div>
  );
}

export default ViewSwitcher;
