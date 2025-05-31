import { DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

function Donation() {
  return (
    <div className="bg-transparent border-1 border-base-100 mt-4 w-sm mx-auto rounded-lg p-4">
      <div className="flex justify-between text-gray-400">
        <h1 className="flex items-center gap-2 font-semibold">
          <DollarSign />
          Support Nebula
        </h1>
      </div>
      <div className="mt-4">
        <p className="">
          Nebula is free and open source but running it isn’t. Support if you
          can. ❤️
        </p>
        <Link
          className="btn mt-2"
          target="_blank"
          to={"https://ko-fi.com/hasan04"}
        >
          Donate
        </Link>
      </div>
    </div>
  );
}

export default Donation;
