import NavBar from "../components/NavBar";
import {
  ArrowRight,
  Book,
  Cloud,
  Code2,
  DollarSign,
  FileText,
  Grid,
  HeartHandshake,
  Keyboard,
  LetterText,
  Mic,
  Palette,
  Search,
  Settings2,
  Sigma,
  Sparkles,
  Star,
  Type,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";

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
          <p className="mt-10 text-xl text-gray-400">
            Craft and organize your thoughts in a space
            <br />
            built for clarity, speed, and creativity.
            <br />
            Free. Cloud-based. Feature-packed.
            <br />
            Fully yours.
          </p>
          <div className="mt-10 flex gap-4">
            <Link className="btn btn-primary" to={"/signup"}>
              Start taking notes <ArrowRight size={20} />
            </Link>
            <Link className="btn">
              <Sparkles size={20} />
              Explore features
            </Link>
          </div>

          {/* Features */}

          <div className="mt-40 flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold">Packed with features</h1>
            <div className="mt-10 grid grid-cols-3 gap-6">
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
                  "Write with Markdown for quick, clean formatting and export your notes as Markdown files with perfect styling, ready for sharing or publishing anywhere."
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
            </div>
          </div>

          <div className="mt-40 flex flex-row-reverse items-center justify-between">
            <div className="">
              <h1 className="text-4xl font-bold">Cloud based & Secure</h1>
              <div className="mt-10">
                <p className="max-w-140 text-xl text-gray-400">
                  Nebula securely backs up your notes to the cloud whenever you
                  hit save, giving you full control while keeping your work
                  safe. Cloud storage is completely free* for all users, made
                  possible by community donations.
                </p>
              </div>
            </div>
            <div className="flex items-center p-20 border-1 border-accent rounded-lg">
              <Cloud size={120} />
            </div>
          </div>

          <div className="mt-40 flex items-center justify-between">
            <div className="">
              <h1 className="text-4xl font-bold">Open Source</h1>
              <div className="mt-10">
                <p className="max-w-140 text-xl text-gray-400">
                  Nebula is built for the community — no subscriptions, no
                  paywalls. You can view, use, and contribute to the entire
                  codebase on GitHub.
                </p>
                <Link className="btn mt-4">
                  Star on GitHub <Star size={20} />
                </Link>
              </div>
            </div>
            <div className="flex items-center p-20 border-1 border-accent rounded-lg">
              <Code2 size={120} />
            </div>
          </div>

          <div className="mt-40 flex flex-row-reverse items-center justify-between">
            <div className="">
              <h1 className="text-4xl font-bold">
                Free Cloud Storage, Powered by You
              </h1>
              <div className="mt-10">
                <p className="max-w-140 text-xl text-gray-400">
                  Nebula offers free cloud storage for your notes — no
                  subscriptions, no hidden fees. Just hit save and your work is
                  securely backed up. This is possible thanks to a
                  donation-supported model. We don’t charge for storage, but
                  running servers isn't free — your support helps keep Nebula
                  open and sustainable for everyone.
                </p>
                <Link className="btn mt-4">
                  Support Nebula <HeartHandshake size={20} />
                </Link>
              </div>
            </div>
            <div className="flex items-center p-20 border-1 border-accent rounded-lg">
              <DollarSign size={120} />
            </div>
          </div>

          <div className="mt-40 flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-40">
        <Footer></Footer>
      </div>
    </div>
  );
}

export default HomePage;
