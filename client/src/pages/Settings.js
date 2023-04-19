import { useNavigate } from "react-router-dom";
import axios from "axios";

import SideBar from "../components/directory/SideBar";

export default function Settingspage(props) {
  const { account, setAccount } = props;
  const navigate = useNavigate();

  const changeProfilePicture = async (image) => {
    let formData = new FormData();
    formData.append("image", image);
    formData.append("uploader", account.firstName + account.lastName);
    formData.append("username", account.username);

    try {
      const res = await axios.post(
        process.env.REACT_APP_SERVER + "/settings" + "/changeProfilePicture",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setAccount({ ...account, profilePicture: res.data.profilePicture });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };

  const updateAccount = (e) => {
    e.preventDefault();

    axios
      .put(process.env.REACT_APP_SERVER + "/settings/updateAccount", {
        aboutMe: account.aboutMe,
        work: account.work,
        firstName: account.firstName,
        lastName: account.lastName,
        birthday: account.birthday,
        phone: account.phone,
        location: account.location,
        country: account.country,
        hourlyRate: account.hourlyRate,
      })
      .then((res) => {
        if (res.data.includes("Updated")) {
          navigate("/directory");
        }
      });
  };

  const inputFields = [
    { label: "First Name", name: "firstName", value: account.firstName },
    { label: "Last Name", name: "lastName", value: account.lastName },
    { label: "Birthday", name: "birthday", value: account.birthday },
    { label: "Phone", name: "phone", value: account.phone },
    { label: "Location", name: "location", value: account.location },
    { label: "Country", name: "country", value: account.country },
    { label: "Hourly Rate", name: "hourlyRate", value: account.hourlyRate },
  ];

  function InputField(props) {
    const { label, name, value } = props;

    return (
      <div className={`${name === "work" && "w-1/2"} col-span-6 sm:col-span-3`}>
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          type="text"
          name={name}
          value={value}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    );
  }

  return (
    <div class="flex">
      <SideBar account={account} />

      <form onSubmit={updateAccount} className="space-y-6 px-6 py-6">
        {/* Basic Information */}
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            {/* Header */}
            <div className="md:col-span-1">
              <h2 className="text-lg font-medium leading-6 text-gray-900">
                Basic Information
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>

            <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
              {/* About */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  About
                </label>
                <div className="mt-1">
                  <textarea
                    type="text"
                    name="aboutMe"
                    rows={3}
                    value={account.aboutMe}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Work */}
              <InputField label="Work" name="work" value={account.work} />

              {/* Profile picture */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Photo
                </label>
                <div className="mt-1 flex items-center space-x-5">
                  <img
                    src={
                      process.env.REACT_APP_SERVER +
                      "/public/" +
                      account.profilePicture
                    }
                    alt="profile"
                    className="h-12 w-12 rounded-full border border-gray-300"
                  ></img>

                  <button
                    id="loadFileXml"
                    type="button"
                    onClick={() =>
                      document.getElementById("file-input").click()
                    }
                    className="rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Change
                  </button>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    id={"file-input"}
                    name="file"
                    onChange={(event) =>
                      changeProfilePicture(event.target.files[0])
                    }
                  />
                </div>
              </div>

              {/* Cover photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cover photo
                </label>
                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            {/* Header */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Use a permanent address where you can receive mail.
              </p>
            </div>

            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="grid grid-cols-6 gap-6">
                {inputFields.map((inputField) => (
                  <InputField
                    key={inputField.name}
                    label={inputField.label}
                    name={inputField.name}
                    value={inputField.value}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <button className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};