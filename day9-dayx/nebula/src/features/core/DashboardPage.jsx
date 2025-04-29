import { ArrowLeft, File, LayoutGrid, Notebook, Settings } from "lucide-react";
import { useUserStore } from "../../store/userStore";
import { getAuthenticatedUser, getUserData } from "../../firebase/services";
import { useEffect, useState } from "react";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useNavigate } from "react-router-dom";
import DashboardArea from "./DashboardArea";
import NotesArea from "./NotesArea";
import NotebooksArea from "./NotebooksArea";
import SettingsArea from "./SettingsArea";
import { useUserVerifiedStore } from "../../store/userVerifiedStore";

function DashboardPage() {
  const navigate = useNavigate();

  const { user, setUser } = useUserStore();
  const { userVerified, setUserVerified } = useUserVerifiedStore();

  const [activeTab, setActiveTab] = useState(APP_CONSTANTS.DASHBOARD_PAGE);
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);

  function handleCollapse() {
    setSideBarCollapsed(!sideBarCollapsed);
  }

  function handleDashboardButtonClick() {
    setActiveTab(APP_CONSTANTS.DASHBOARD_PAGE);
  }

  function handleNotesButtonClick() {
    setActiveTab(APP_CONSTANTS.NOTES_PAGE);
  }

  function handleNotebooksButtonClick() {
    setActiveTab(APP_CONSTANTS.NOTEBOOKS_PAGE);
  }

  function handleSettingsButtonClick() {
    setActiveTab(APP_CONSTANTS.SETTINGS_PAGE);
  }

  useEffect(() => {
    getAuthenticatedUser().then((user) => {
      if (user == APP_CONSTANTS.UNAUTHENTICATED) {
        navigate("/login");
      } else {
        setUserVerified(user.emailVerified);
        return;
      }
    });
  }, []);

  useEffect(() => {
    getUserData().then((userData) => {
      if (userData == null) {
        // Handle this error later
      } else {
        setUser(userData);
      }
    });
  }, []);

  return (
    <div className="flex">
      <div
        className={
          "sideBar h-[100vh] bg-base-300 p-4 flex flex-col ease-in-out duration-200" +
          (sideBarCollapsed ? " w-20" : " w-60")
        }
      >
        <div className="logo flex items-center justify-between">
          <h1
            className={
              "text-xl font-jakarta font-bold text-center" +
              (sideBarCollapsed ? " hidden" : "")
            }
          >
            Nebula
          </h1>
          <button
            className={
              "btn btn-square" +
              (sideBarCollapsed ? " btn-wide rotate-180" : "")
            }
            onClick={handleCollapse}
          >
            <ArrowLeft></ArrowLeft>
          </button>
        </div>
        <div className="divider"></div>
        <div className="mainButtons flex-1">
          <button
            className={
              activeTab == APP_CONSTANTS.DASHBOARD_PAGE
                ? `btn btn-wide btn-primary ${
                    sideBarCollapsed ? "justify-center" : "justify-start"
                  } flex items-center`
                : `btn btn-wide ${
                    sideBarCollapsed ? "justify-center" : "justify-start"
                  } flex items-center`
            }
            onClick={handleDashboardButtonClick}
          >
            {sideBarCollapsed ? (
              <LayoutGrid className="shrink-0" />
            ) : (
              <>
                <LayoutGrid className="shrink-0" />
                <p>Dashboard</p>
              </>
            )}
          </button>

          <button
            className={
              activeTab == APP_CONSTANTS.NOTES_PAGE
                ? `btn btn-wide btn-primary mt-2 ${
                    sideBarCollapsed ? "justify-center" : "justify-start"
                  } flex items-center`
                : `btn btn-wide mt-2 ${
                    sideBarCollapsed ? "justify-center" : "justify-start"
                  } flex items-center`
            }
            onClick={handleNotesButtonClick}
          >
            {sideBarCollapsed ? (
              <File className="shrink-0" />
            ) : (
              <>
                <File className="shrink-0" />
                <p>Notes</p>
              </>
            )}
          </button>

          <button
            className={
              activeTab == APP_CONSTANTS.NOTEBOOKS_PAGE
                ? `btn btn-wide btn-primary mt-2 ${
                    sideBarCollapsed ? "justify-center" : "justify-start"
                  } flex items-center`
                : `btn btn-wide mt-2 ${
                    sideBarCollapsed ? "justify-center" : "justify-start"
                  } flex items-center`
            }
            onClick={handleNotebooksButtonClick}
          >
            {sideBarCollapsed ? (
              <Notebook className="shrink-0" />
            ) : (
              <>
                <Notebook className="shrink-0" />
                <p>Notebooks</p>
              </>
            )}
          </button>
        </div>
        <div className="bottomButtons flex items-center justify-between">
          <button
            className={
              activeTab == APP_CONSTANTS.SETTINGS_PAGE
                ? `btn btn-wide btn-primary ${
                    sideBarCollapsed ? "justify-center" : "justify-start"
                  } flex items-center`
                : `btn btn-wide ${
                    sideBarCollapsed ? "justify-center" : "justify-start"
                  } flex items-center`
            }
            onClick={handleSettingsButtonClick}
          >
            {sideBarCollapsed ? (
              <Settings className="shrink-0" />
            ) : (
              <>
                <Settings className="shrink-0" />
                <p>Settings</p>
              </>
            )}
          </button>
        </div>
      </div>
      {activeTab == APP_CONSTANTS.DASHBOARD_PAGE ? (
        <DashboardArea></DashboardArea>
      ) : activeTab == APP_CONSTANTS.NOTES_PAGE ? (
        <NotesArea></NotesArea>
      ) : activeTab == APP_CONSTANTS.NOTEBOOKS_PAGE ? (
        <NotebooksArea></NotebooksArea>
      ) : activeTab == APP_CONSTANTS.SETTINGS_PAGE ? (
        <SettingsArea></SettingsArea>
      ) : (
        ""
      )}
    </div>
  );
}

export default DashboardPage;
