import { Feather } from "lucide-react";

function Quote() {
  return (
    <div className="bg-transparent border-1 border-base-200 mt-4 w-sm mx-auto rounded-lg p-4">
      <h1 className="flex items-center gap-2 font-semibold">
        <Feather />
        Motivation
      </h1>
      <div className="text-gray-400"></div>
    </div>
  );
}

export default Quote;
