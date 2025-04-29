import { ArrowBigUp, Command, Plus } from "lucide-react";
import { LANGUAGES } from "../../constants/LANGUAGES";
import { useUserStore } from "../../store/userStore";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useUserVerifiedStore } from "../../store/userVerifiedStore";

function SettingsArea() {
  const { user, setUser } = useUserStore();
  const { userVerified, setUserVerified } = useUserVerifiedStore();

  return (
    <div className="flex-1 h-[100vh] p-4 font-jakarta overflow-y-scroll scroll-smooth scrollbar-thin">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
        <div className="btn btn-primary">Update</div>
      </div>
      <div className="divider"></div>

      <div className="bg-base-200 rounded-lg p-4">
        <div className="">
          <p className="text-xl font-semibold">Profile</p>
          <p className="mt-4 text-neutral-400">
            Update your personal information
          </p>
        </div>
        <div className="divider"></div>
        <div className="flex flex-col">
          <p className="font-medium">Name</p>
          <input
            className="input input-primary mt-4 w-200 max-w-full"
            type="text"
            placeholder="Name"
            defaultValue={user.name}
          />
        </div>
        <div className="flex flex-col mt-4">
          <p className="font-medium">Email</p>
          <input
            className="input input-primary mt-4 w-200 max-w-full"
            type="text"
            placeholder="Email"
            defaultValue={user.email}
            readOnly={
              user.authenticationMethod == APP_CONSTANTS.WITH_GOOGLE
                ? true
                : false
            }
          />
        </div>
      </div>

      <div
        className={!userVerified ? "bg-base-200 rounded-lg p-4 mt-4" : "hidden"}
      >
        <div className="">
          <p className="text-xl font-semibold">Account verification</p>
          <p className="mt-4 text-neutral-400">Verify your account</p>
        </div>
        <div className="divider"></div>
        <div className="flex justify-between">
          <p className="font-medium">Send verification mail</p>
          <button className="btn btn-primary">Send</button>
        </div>
      </div>

      <div className="bg-base-200 rounded-lg p-4 mt-4">
        <div className="">
          <p className="text-xl font-semibold">Preferences</p>
          <p className="mt-4 text-neutral-400">Manage your preferences</p>
        </div>
        <div className="divider"></div>
        <div className="flex justify-between">
          <p className="font-medium">Trigger autosave every (in minutes)</p>
          <div className="w-full max-w-xs">
            <input
              type="range"
              min={0}
              max={10}
              defaultValue={user.preferences.autoSaveTriggerTime}
              className="range range-primary"
              step="1"
            />
            <div className="flex justify-between px-2.5 mt-4 text-xs">
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
            </div>
            <div className="flex justify-between px-2.5 mt-4 text-xs">
              <span>0</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>10</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="font-medium">Default language</p>
          <select
            defaultValue={user.preferences.language}
            className="select select-primary"
          >
            {Object.keys(LANGUAGES).map((language, id) => {
              return <option key={id}>{language}</option>;
            })}
          </select>
        </div>
        <div className="flex justify-between mt-4">
          <p className="font-medium">
            {" "}
            Keep me informed with occasional emails about new features, updates,
            helpful tips, and special offers.
          </p>
          <div className="flex items-center">
            <p className="">Yes</p>
            <input
              type="radio"
              name="radio-1"
              checked={
                user.preferences.subscribedToEmailNotifications == true
                  ? true
                  : false
              }
              className="radio radio-primary mx-2"
            />
            <p className="">No</p>
            <input
              type="radio"
              name="radio-1"
              checked={
                user.preferences.subscribedToEmailNotifications == false
                  ? true
                  : false
              }
              className="radio radio-primary ml-2"
            />
          </div>
        </div>
      </div>

      <div className="bg-base-200 rounded-lg p-4 mt-4">
        <div className="">
          <p className="text-xl font-semibold">Shortcuts</p>
          <p className="mt-4 text-neutral-400">Configure your shortcuts</p>
        </div>
        <div className="divider"></div>
        <div className="flex items-center justify-between">
          <p className="font-medium">Navigate to Dashboard Page</p>
          <div className="flex items-center">
            <button className="btn" disabled>
              <Command></Command>
            </button>
            <Plus></Plus>
            <button className="btn" disabled>
              <ArrowBigUp></ArrowBigUp>
            </button>
            <Plus></Plus>
            <input
              className="input input-primary w-20 uppercase"
              maxLength={1}
              defaultValue={user.shortcuts.DASHBOARD_PAGE}
            ></input>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="font-medium">Navigate to Notes Page</p>
          <div className="flex items-center">
            <button className="btn" disabled>
              <Command></Command>
            </button>
            <Plus></Plus>
            <button className="btn" disabled>
              <ArrowBigUp></ArrowBigUp>
            </button>
            <Plus></Plus>
            <input
              className="input input-primary w-20 uppercase"
              maxLength={1}
              defaultValue={user.shortcuts.NOTES_PAGE}
            ></input>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="font-medium">Navigate to Notebooks Page</p>
          <div className="flex items-center">
            <button className="btn" disabled>
              <Command></Command>
            </button>
            <Plus></Plus>
            <button className="btn" disabled>
              <ArrowBigUp></ArrowBigUp>
            </button>
            <Plus></Plus>
            <input
              className="input input-primary w-20 uppercase"
              maxLength={1}
              defaultValue={user.shortcuts.NOTEBOOKS_PAGE}
            ></input>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="font-medium">Navigate to Settings Page</p>
          <div className="flex items-center">
            <button className="btn" disabled>
              <Command></Command>
            </button>
            <Plus></Plus>
            <button className="btn" disabled>
              <ArrowBigUp></ArrowBigUp>
            </button>
            <Plus></Plus>
            <input
              className="input w-20 input-primary uppercase"
              maxLength={1}
              defaultValue={user.shortcuts.SETTINGS_PAGE}
            ></input>
          </div>
        </div>
      </div>

      <div className="bg-base-200 rounded-lg p-4 mt-4">
        <div className="">
          <p className="text-xl font-semibold text-error">Danger zone</p>
          <p className="mt-4 text-neutral-400">You're walking on thin ice.</p>
        </div>
        <div className="divider"></div>
        <div className="flex justify-between">
          <p className="font-medium">Delete my notes</p>
          <button className="btn btn-error text-error-content">Delete</button>
        </div>
        <div className="flex justify-between mt-4">
          <p className="font-medium">Delete my notebooks</p>
          <button className="btn btn-error text-error-content">Delete</button>
        </div>
        <div className="flex justify-between mt-4">
          <p className="font-medium">Delete my account</p>
          <button className="btn btn-error text-error-content">Delete</button>
        </div>
      </div>
    </div>
  );
}
export default SettingsArea;
