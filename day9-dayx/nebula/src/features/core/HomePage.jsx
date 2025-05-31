import NavBar from "../components/NavBar";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";

function HomePage() {
  return (
    <div className="font-jakarta">
      <NavBar></NavBar>
      <div className="px-80">
        <div className="mt-40 flex flex-col">
          <h1 className="text-6xl font-bold">
            Bring clarity to your <br />
            thoughts.
          </h1>
          <p className="mt-10 text-xl">
            Craft and organize your thoughts in a space
            <br />
            built for clarity, speed, and creativity.
            <br />
            Free. Feature-packed. Fully yours.
          </p>
          <div className="mt-10 flex gap-4">
            <Link className="btn btn-primary" to={"/signup"}>
              Start taking notes <ArrowRight size={20} />
            </Link>
            <Link className="btn">
              <Play size={20} />
              Watch demo
            </Link>
          </div>

          <div className="mt-40 flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold">Packed with features</h1>
            <div className="mt-10 flex flex-wrap gap-4">
              <FeatureCard
                title={"Rich Text Formatting"}
                body={""}
                icon={<Play />}
              />
              <FeatureCard
                title={"Smart Speech Recognition"}
                body={"lorem ipsum dolor sit amet lorem ipsum dolor sit amet"}
                icon={<Play />}
              />
              <FeatureCard
                title={"Markdown Support"}
                body={"lorem ipsum dolor sit amet lorem ipsum dolor sit amet"}
                icon={<Play />}
              />
              <FeatureCard
                title={"Beautiful Math"}
                body={"lorem ipsum dolor sit amet lorem ipsum dolor sit amet"}
                icon={<Play />}
              />
              <FeatureCard
                title={"Auto Formatting"}
                body={"lorem ipsum dolor sit amet lorem ipsum dolor sit amet"}
                icon={<Play />}
              />
              <FeatureCard
                title={"Notebook System"}
                body={
                  "Group related notes into custom notebooks with tags and filters."
                }
                icon={<Play />}
              />
              <FeatureCard
                title={"Powerful Organization"}
                body={"lorem ipsum dolor sit amet lorem ipsum dolor sit amet"}
                icon={<Play />}
              />
              <FeatureCard
                title={"Powerful Search"}
                body={"lorem ipsum dolor sit amet lorem ipsum dolor sit amet"}
                icon={<Play />}
              />
              <FeatureCard
                title={"Beautiful Themes"}
                body={"lorem ipsum dolor sit amet lorem ipsum dolor sit amet"}
                icon={<Play />}
              />
              <FeatureCard
                title={"Handy Keyboard Shortcuts"}
                body={"lorem ipsum dolor sit amet lorem ipsum dolor sit amet"}
                icon={<Play />}
              />
              <FeatureCard
                title={"Real-Time Word Count"}
                body={
                  "Stay focused on your writing goals with live word tracking."
                }
                icon={<Play />}
              />
              <FeatureCard
                title={"Quick Actions"}
                body={
                  "Create notes, notebooks, or view recent activity with one click."
                }
                icon={<Play />}
              />
              <FeatureCard
                title={"Secure Cloud Sync"}
                body={"Your notes are saved and synced safely using Firestore."}
                icon={<Play />}
              />
              <FeatureCard
                title={"Markdown Export"}
                body={"lorem ipsum dolor sit amet lorem ipsum dolor sit amet"}
                icon={<Play />}
              />
              <FeatureCard
                title={"Open Source"}
                body={"lorem ipsum dolor sit amet lorem ipsum dolor sit amet"}
                icon={<Play />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
