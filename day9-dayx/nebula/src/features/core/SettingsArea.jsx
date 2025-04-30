import React, { useState, useSyncExternalStore } from "react";
import { ArrowBigUp, CheckCircle2, Command, Plus, XCircle } from "lucide-react";
import { LANGUAGES } from "../../constants/LANGUAGES";
import { useUserStore } from "../../store/userStore";
import { APP_CONSTANTS } from "../../constants/APP_CONSTANTS";
import { useUserVerifiedStore } from "../../store/userVerifiedStore";
import {
  softDeleteAllNotes,
  updateUserData,
  softDeleteAllNotebooks,
} from "../../firebase/services";
import { Timestamp } from "firebase/firestore";
import GenericModal from "../components/GenericModal";

/*
TO DO
1. Delete user
2. Delete notes
3. Delete notebooks
4. email validation
5. Short cut input validation
6. Send verification email
*/

function SettingsArea() {
  const { user, setUser } = useUserStore();
  const { userVerified } = useUserVerifiedStore();

  // State variables
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [autoSaveTriggerTime, setAutoSaveTriggerTime] = useState(
    user.preferences.autoSaveTriggerTime
  );
  const [language, setLanguage] = useState(user.preferences.language);
  const [subscribed, setSubscribed] = useState(
    user.preferences.subscribedToEmailNotifications
  );
  const [shortcuts, setShortcuts] = useState({ ...user.shortcuts });
  const [updating, setUpdating] = useState(false);
  const [deletingNotes, setDeletingNotes] = useState(false);
  const [deletingNotebooks, setDeletingNotebooks] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);

  function isUserDataChanged() {
    return (
      name !== user.name ||
      email !== user.email ||
      autoSaveTriggerTime !== user.preferences.autoSaveTriggerTime ||
      language !== user.preferences.language ||
      subscribed !== user.preferences.subscribedToEmailNotifications ||
      JSON.stringify(shortcuts) !== JSON.stringify(user.shortcuts)
    );
  }

  // Update handler
  function handleUpdate() {
    if (!isUserDataChanged()) {
      return;
    }

    setUpdating(true);

    const updatedUser = {
      ...user,
      name,
      email,
      preferences: {
        ...user.preferences,
        autoSaveTriggerTime,
        language,
        subscribedToEmailNotifications: subscribed,
      },
      shortcuts: {
        ...shortcuts,
      },
    };

    setUser(updatedUser);

    updateUserData(updatedUser)
      .then(() => {
        setUpdating(false);
      })
      .catch((error) => {
        setUpdating(false);
        console.error(error);
      });
  }

  function updateMassDeletionTime() {
    const updatedUser = {
      ...user,
      lastMassDeletionTime: new Date(),
    };

    setUser(updatedUser);

    updateUserData(updatedUser)
      .then(() => {
        setUpdating(false);
      })
      .catch((error) => {
        setUpdating(false);
        console.error(error);
      });
  }

  function canDelete() {
    const last = user.lastMassDeletionTime;

    if (!last) {
      return true; // If there's no last mass deletion time, allow deletion
    }

    const lastTimestamp = new Timestamp(last.seconds, last.nanoseconds);
    const elapsed = Date.now() - lastTimestamp.toMillis();

    return elapsed >= APP_CONSTANTS.HOUR;
  }

  function deleteAllNotes() {
    document.getElementById(APP_CONSTANTS.DELETE_NOTES_MODAL).close();
    setDeletingNotes(true);
    softDeleteAllNotes()
      .then(() => {
        setDeletingNotes(false);
        updateMassDeletionTime();
        document.getElementById(APP_CONSTANTS.SUCCESS_MODAL).showModal();
      })
      .catch((error) => {
        setDeletingNotes(false);
        document.getElementById(APP_CONSTANTS.ERROR_MODAL).showModal();
        console.log(error);
      });
  }

  function deleteAllNotebooks() {
    document.getElementById(APP_CONSTANTS.DELETE_NOTEBOOKS_MODAL).close();
    setDeletingNotebooks(true);
    softDeleteAllNotebooks()
      .then(() => {
        setDeletingNotebooks(false);
        updateMassDeletionTime();
        document.getElementById(APP_CONSTANTS.SUCCESS_MODAL).showModal();
      })
      .catch((error) => {
        setDeletingNotes(false);
        document.getElementById(APP_CONSTANTS.ERROR_MODAL).showModal();
        console.log(error);
      });
  }

  function deleteAccount() {}

  return (
    <div className="flex-1 h-[100vh] p-4 font-jakarta overflow-y-scroll scroll-smooth scrollbar-thin">
      <GenericModal
        id={APP_CONSTANTS.SUCCESS_MODAL}
        title={APP_CONSTANTS.SUCCESS_MODAL_TITLE}
        textContent={APP_CONSTANTS.SUCCESS_MODAL_TEXT_CONTENT}
        firstButtonClassName={"btn btn-primary"}
        secondButtonClassName={"btn hidden"}
        firstButtonText={APP_CONSTANTS.OK}
        secondButtonText={""}
        firstButtonOnClick={function () {
          document.getElementById(APP_CONSTANTS.SUCCESS_MODAL)?.close();
        }}
        secondButtonOnClick={function () {}}
      />

      <GenericModal
        id={APP_CONSTANTS.ERROR_MODAL}
        title={APP_CONSTANTS.ERROR_MODAL_TITLE}
        textContent={APP_CONSTANTS.ERROR_MODAL_TEXT_CONTENT}
        firstButtonClassName={"btn btn-error"}
        secondButtonClassName={"btn hidden"} // Hide second button if not needed
        firstButtonText={APP_CONSTANTS.OK} // Should be "OK"
        secondButtonText={""}
        firstButtonOnClick={function () {
          document.getElementById(APP_CONSTANTS.ERROR_MODAL)?.close();
        }}
        secondButtonOnClick={function () {}}
      />

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
        <button
          className={"btn btn-primary"}
          onClick={handleUpdate}
          disabled={updating ? true : false}
        >
          {!updating ? (
            "Update"
          ) : (
            <span className="loading loading-spinner"></span>
          )}
        </button>
      </div>
      <div className="divider"></div>

      {/* Profile */}
      <div className="bg-base-200 rounded-lg p-4">
        <p className="text-xl font-semibold">Profile</p>
        <p className="mt-4 text-neutral-400">
          Update your personal information
        </p>
        <div className="divider"></div>
        <div className="flex flex-col">
          <p className="font-medium">Name</p>
          <input
            className="input input-primary mt-4 w-200 max-w-full"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-4">
          <p className="font-medium">Email</p>
          <input
            className="input input-primary mt-4 w-200 max-w-full"
            type="text"
            placeholder="Email"
            value={email}
            readOnly={user.authenticationMethod === APP_CONSTANTS.WITH_GOOGLE}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {/* Verification */}
      <div
        className={!userVerified ? "bg-base-200 rounded-lg p-4 mt-4" : "hidden"}
      >
        <p className="text-xl font-semibold">Account verification</p>
        <p className="mt-4 text-neutral-400">Verify your account</p>
        <div className="divider"></div>
        <div className="flex justify-between">
          <p className="font-medium">Send verification mail</p>
          <button className="btn btn-primary">Send</button>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-base-200 rounded-lg p-4 mt-4">
        <p className="text-xl font-semibold">Preferences</p>
        <p className="mt-4 text-neutral-400">Manage your preferences</p>
        <div className="divider"></div>

        {/* Autosave */}
        <div className="flex justify-between">
          <p className="font-medium">Trigger autosave every (in minutes)</p>
          <div className="w-full max-w-xs">
            <input
              type="range"
              min={0} // 0 indicates 'Off'
              max={10}
              value={autoSaveTriggerTime}
              onChange={(e) => setAutoSaveTriggerTime(Number(e.target.value))}
              className="range range-primary"
              step="1"
            />
            <div className="flex justify-between px-2.5 mt-4 text-xs">
              {[...Array(11)].map((_, i) => (
                <span key={i}>|</span>
              ))}
            </div>
            <div className="flex justify-between px-2.5 mt-4 text-xs">
              {[...Array(11)].map((_, i) => (
                <span key={i}>{i != 0 ? i : "Off"}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="flex items-center justify-between mt-4">
          <p className="font-medium">Default language</p>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="select select-primary"
          >
            {Object.keys(LANGUAGES).map((lang, id) => (
              <option key={id} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Email Subscription */}
        <div className="flex justify-between mt-4">
          <p className="font-medium">
            Keep me informed with occasional emails about new features, updates,
            helpful tips, and special offers.
          </p>
          <div className="flex items-center">
            <p>Yes</p>
            <input
              type="radio"
              name="email-subscription"
              className="radio radio-primary mx-2"
              checked={subscribed === true}
              onChange={() => setSubscribed(true)}
            />
            <p>No</p>
            <input
              type="radio"
              name="email-subscription"
              className="radio radio-primary ml-2"
              checked={subscribed === false}
              onChange={() => setSubscribed(false)}
            />
          </div>
        </div>
      </div>

      {/* Shortcuts */}
      <div className="bg-base-200 rounded-lg p-4 mt-4">
        <p className="text-xl font-semibold">Shortcuts</p>
        <p className="mt-4 text-neutral-400">Configure your shortcuts</p>
        <div className="divider"></div>

        {[
          "DASHBOARD_PAGE",
          "NOTES_PAGE",
          "NOTEBOOKS_PAGE",
          "SETTINGS_PAGE",
        ].map((page) => (
          <div key={page} className="flex items-center justify-between mt-4">
            <p className="font-medium">
              Navigate to {page.replace("_", " ").toLowerCase()}
            </p>
            <div className="flex items-center">
              <button className="btn" disabled>
                <Command />
              </button>
              <Plus />
              <button className="btn" disabled>
                <ArrowBigUp />
              </button>
              <Plus />
              <input
                className="input input-primary w-20 uppercase"
                maxLength={1}
                value={shortcuts[page]}
                onChange={(e) =>
                  setShortcuts({
                    ...shortcuts,
                    [page]: e.target.value.toUpperCase(),
                  })
                }
              />
            </div>
          </div>
        ))}
      </div>

      {/* Danger Zone */}
      <div className="bg-base-200 rounded-lg p-4 mt-4">
        <p className="text-xl font-semibold text-error">Danger zone</p>
        <p className="mt-4 text-neutral-400">You're walking on thin ice.</p>
        <div className="divider"></div>
        <div className="flex justify-between">
          <p className="font-medium">Delete my notes</p>
          <button
            className="btn btn-error text-error-content"
            onClick={() => {
              document
                .getElementById(APP_CONSTANTS.DELETE_NOTES_MODAL)
                .showModal();
            }}
            disabled={!canDelete()}
          >
            {!deletingNotes ? (
              "Delete"
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </button>
          <GenericModal
            id={APP_CONSTANTS.DELETE_NOTES_MODAL}
            title={APP_CONSTANTS.DELETE_NOTES_MODAL_TITLE}
            textContent={APP_CONSTANTS.DELETE_NOTES_MODAL_TEXT_CONTENT}
            firstButtonClassName={"btn btn-error"}
            secondButtonClassName={"btn"}
            firstButtonText={APP_CONSTANTS.DELETE}
            secondButtonText={APP_CONSTANTS.CANCEL}
            firstButtonOnClick={() => {
              deleteAllNotes();
            }}
            secondButtonOnClick={() => {
              if (
                document.getElementById(APP_CONSTANTS.DELETE_NOTES_MODAL) !=
                null
              ) {
                document
                  .getElementById(APP_CONSTANTS.DELETE_NOTES_MODAL)
                  .close();
              }
            }}
          ></GenericModal>
        </div>
        <div className="flex justify-between mt-4">
          <p className="font-medium">Delete my notebooks</p>
          <button
            className="btn btn-error text-error-content"
            onClick={() => {
              document
                .getElementById(APP_CONSTANTS.DELETE_NOTEBOOKS_MODAL)
                .showModal();
            }}
            disabled={!canDelete()}
          >
            {!deletingNotebooks ? (
              "Delete"
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </button>
          <GenericModal
            id={APP_CONSTANTS.DELETE_NOTEBOOKS_MODAL}
            title={APP_CONSTANTS.DELETE_NOTEBOOKS_MODAL_TITLE}
            textContent={APP_CONSTANTS.DELETE_NOTEBOOKS_MODAL_TEXT_CONTENT}
            firstButtonClassName={"btn btn-error"}
            secondButtonClassName={"btn"}
            firstButtonText={APP_CONSTANTS.DELETE}
            secondButtonText={APP_CONSTANTS.CANCEL}
            firstButtonOnClick={() => {
              deleteAllNotebooks();
            }}
            secondButtonOnClick={() => {
              if (
                document.getElementById(APP_CONSTANTS.DELETE_NOTEBOOKS_MODAL) !=
                null
              ) {
                document
                  .getElementById(APP_CONSTANTS.DELETE_NOTEBOOKS_MODAL)
                  .close();
              }
            }}
          ></GenericModal>
        </div>
        <div className="flex justify-between mt-4">
          <p className="font-medium">Delete my account</p>
          <button
            className="btn btn-error text-error-content"
            onClick={() => {
              document
                .getElementById(APP_CONSTANTS.DELETE_ACCOUNT_MODAL)
                .showModal();
            }}
          >
            Delete
          </button>
          <GenericModal
            id={APP_CONSTANTS.DELETE_ACCOUNT_MODAL}
            title={APP_CONSTANTS.DELETE_ACCOUNT_MODAL_TITLE}
            textContent={APP_CONSTANTS.DELETE_ACCOUNT_MODAL_TEXT_CONTENT}
            firstButtonClassName={"btn btn-error"}
            secondButtonClassName={"btn"}
            firstButtonText={APP_CONSTANTS.DELETE}
            secondButtonText={APP_CONSTANTS.CANCEL}
            firstButtonOnClick={() => {
              deleteAccount();
            }}
            secondButtonOnClick={() => {
              if (
                document.getElementById(APP_CONSTANTS.DELETE_ACCOUNT_MODAL) !=
                null
              ) {
                document
                  .getElementById(APP_CONSTANTS.DELETE_ACCOUNT_MODAL)
                  .close();
              }
            }}
          ></GenericModal>
        </div>
      </div>
    </div>
  );
}

export default SettingsArea;
