import NavBar from "../components/NavBar";
import {
  ArrowRight,
  Book,
  Code2,
  FileText,
  FileUp,
  Grid,
  Keyboard,
  LetterText,
  Mic,
  Palette,
  Play,
  Search,
  Settings2,
  Sigma,
  Type,
  Zap,
} from "lucide-react";
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
                body={
                  "Create structured notes with support for headings, bold, underline, quotes, code blocks, tables, and more — all accessible via intuitive controls and shortcuts."
                }
                icon={<Type />}
              />
              <FeatureCard
                title={"Smart Speech Recognition"}
                body={
                  "Convert your spoken words into text effortlessly with Nebula’s built-in speech recognition, perfect for capturing ideas quickly without typing."
                }
                icon={<Mic />}
              />
              <FeatureCard
                title={"Markdown Support"}
                body={
                  "Write using Markdown syntax to quickly format your notes with ease. Nebula lets you seamlessly toggle between Markdown and rich text."
                }
                icon={<FileText />}
              />
              <FeatureCard
                title={"Beautiful Math"}
                body={
                  "Use LaTeX-style math rendering to add complex equations and formulas to your notes, ideal for students, researchers, and professionals."
                }
                icon={<Sigma />}
              />
              <FeatureCard
                title={"Auto Formatting"}
                body={
                  "Nebula automatically formats lists, spacing, and indentation as you type, keeping your notes clean and well-structured without extra effort. Manual formatting supported as well."
                }
                icon={<Settings2 />}
              />
              <FeatureCard
                title={"Notebook System"}
                body={
                  "Organize notes by grouping them into notebooks with tags and filters, and switch between grid and table views for easy management."
                }
                icon={<Book />}
              />
              <FeatureCard
                title={"Powerful Organization"}
                body={
                  "Pin notes, tag them, and sort your notebooks effortlessly to keep your important information front and center at all times."
                }
                icon={<Grid />}
              />
              <FeatureCard
                title={"Fast Search"}
                body={
                  "Quickly find notes using advanced search with support for tags and notebook filters, delivering precise results blazingly fast."
                }
                icon={<Search />}
              />
              <FeatureCard
                title={"Beautiful Themes"}
                body={
                  "Choose from multiple themes designed for comfort and focus, including light and dark modes for different working environments."
                }
                icon={<Palette />}
              />
              <FeatureCard
                title={"Handy Keyboard Shortcuts"}
                body={
                  "Work faster with customizable keyboard shortcuts for creating, editing, navigating, and saving notes, designed to keep your workflow smooth."
                }
                icon={<Keyboard />}
              />
              <FeatureCard
                title={"Real-Time Word Count"}
                body={
                  "Track your writing progress with live word count, perfect for staying on top of writing goals."
                }
                icon={<LetterText />}
              />
              <FeatureCard
                title={"Quick Actions"}
                body={
                  "Access common tasks like creating notes or viewing recent activity instantly from your dashboard with one-click quick actions."
                }
                icon={<Zap />}
              />
              <FeatureCard
                title={"Markdown Export"}
                body={
                  "Export notes as Markdown files for easy sharing, publishing, or integration with other tools, maintaining your formatting perfectly."
                }
                icon={<FileUp />}
              />
              <FeatureCard
                title={"Open Source"}
                body={
                  "Nebula is built openly, inviting you to see how it works, suggest improvements, or even help build it yourself."
                }
                icon={<Code2 />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
