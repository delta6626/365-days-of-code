function SettingsArea() {
  return (
    <div className="w-full h-[100vh] p-4 font-jakarta overflow-y-scroll scroll-smooth scrollbar-thin">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
        <div className="btn">Update</div>
      </div>
      <div className="divider"></div>

      <div className="bg-base-200 rounded-lg p-4">
        <div className="">
          <p className="text-xl font-semibold">Profile</p>
          <p className="mt-2 text-neutral-400">
            Update your personal information
          </p>
        </div>
        <div className="divider"></div>
        <div className="flex flex-col">
          <p className="font-medium">Name</p>
          <input className="input mt-2 w-200" type="text" placeholder="Name" />
        </div>
        <div className="flex flex-col mt-2">
          <p className="font-medium">Email</p>
          <input className="input mt-2 w-200" type="text" placeholder="Email" />
        </div>
      </div>

      <div className="bg-base-200 rounded-lg p-4 mt-4">
        <div className="">
          <p className="text-xl font-semibold">Shortcuts</p>
          <p className="mt-2 text-neutral-400">Configure your shortcuts</p>
        </div>
        <div className="divider"></div>
        <div className="flex flex-col">
          <p className="font-medium">Name</p>
          <input className="input mt-2 w-200" type="text" placeholder="Name" />
        </div>
        <div className="flex flex-col mt-2">
          <p className="font-medium">Email</p>
          <input className="input mt-2 w-200" type="text" placeholder="Email" />
        </div>
      </div>

      <div className="bg-base-200 rounded-lg p-4 mt-4">
        <div className="">
          <p className="text-xl font-semibold">Account verification</p>
          <p className="mt-2 text-neutral-400">Verify your account</p>
        </div>
        <div className="divider"></div>
        <div className="flex flex-col">
          <p className="font-medium">Name</p>
          <input className="input mt-2 w-200" type="text" placeholder="Name" />
        </div>
        <div className="flex flex-col mt-2">
          <p className="font-medium">Email</p>
          <input className="input mt-2 w-200" type="text" placeholder="Email" />
        </div>
      </div>

      <div className="bg-base-200 rounded-lg p-4 mt-4">
        <div className="">
          <p className="text-xl font-semibold text-error">Danger zone</p>
          <p className="mt-2 text-neutral-400">You're walking on thin ice.</p>
        </div>
        <div className="divider"></div>
        <div className="flex justify-between">
          <p className="font-medium">Delete all notes</p>
          <button className="btn btn-error text-error-content">
            Delete my notes
          </button>
        </div>
        <div className="flex justify-between mt-2">
          <p className="font-medium">Delete all notebooks</p>
          <button className="btn btn-error text-error-content">
            Delete my notebooks
          </button>
        </div>
        <div className="flex justify-between mt-2">
          <p className="font-medium">Delete account</p>
          <button className="btn btn-error text-error-content">
            Delete my account
          </button>
        </div>
      </div>
    </div>
  );
}
export default SettingsArea;
