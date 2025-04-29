import { ArrowLeft, File, LayoutGrid, Notebook, Settings } from "lucide-react";

function DashboardPage() {
  return (
    <div className="">
      <div className="sideBar w-60 h-[100vh] bg-base-300 p-4 flex flex-col">
        <div className="logo flex items-center justify-between">
          <h1 className="text-xl font-jakarta font-bold text-center">Nebula</h1>
          <button className="btn">
            <ArrowLeft></ArrowLeft>
          </button>
        </div>
        <div className="divider"></div>
        <div className="mainButtons flex-1">
          <button className="btn btn-wide justify-start">
            <LayoutGrid></LayoutGrid>
            <p>Dashboard</p>
          </button>

          <button className="btn btn-wide justify-start mt-2">
            <File></File>
            <p>Notes</p>
          </button>

          <button className="btn btn-wide justify-start mt-2">
            <Notebook></Notebook>
            <p>Notebook</p>
          </button>
        </div>
        <div className="bottomButtons">
          <button className="btn btn-wide justify-start mt-2">
            <Settings></Settings>
            <p>Settings</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
