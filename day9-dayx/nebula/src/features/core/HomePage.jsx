import { useEffect } from "react";
import NavBar from "../components/NavBar";
import { ArrowRight } from "lucide-react";

function HomePage() {
  return (
    <div className="font-jakarta">
      <NavBar></NavBar>
      <div className="px-80">
        <div className="mt-20">
          <h1 className="text-5xl font-bold">
            Bring clarity to your <br /> thoughts.
          </h1>
          <p className="mt-10 text-xl">
            Craft and organize your thoughts in a space
            <br />
            built for clarity, speed, and creativity.
            <br />
            Fast. Feature-packed. Fully yours.
          </p>
          <div className="mt-10 flex gap-4">
            <button className="btn btn-primary">
              Start taking notes <ArrowRight size={20} />
            </button>
            <button className="btn">Explore features</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
