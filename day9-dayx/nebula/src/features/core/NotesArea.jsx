import { Search, LayoutGrid, Rows3, Table, Plus } from "lucide-react";

function NotesArea() {
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
          <button className="btn btn-square btn-ghost">
            <LayoutGrid></LayoutGrid>
          </button>
          <button className="btn btn-square btn-ghost">
            <Rows3></Rows3>
          </button>
          <button className="btn btn-square btn-ghost">
            <Table></Table>
          </button>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
}
export default NotesArea;
