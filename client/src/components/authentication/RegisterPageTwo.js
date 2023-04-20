import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  ContainsLetter,
  ContainsSpecial,
} from "./InputFormatter";
import Input from "./Input";
import Button from "@mui/material/Button";

export default function RegisterPageTwo(props) {
  const { formData, handleChange, error, setError, previousStep } = props;

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault(); // Prevents page refresh

    // If phone or hourlyRate contain letters or special characters
    if (
      ContainsSpecial(formData.phone) ||
      ContainsLetter(formData.phone) ||
      ContainsSpecial(formData.hourlyRate) ||
      ContainsLetter(formData.hourlyRate)
    ) {
      setError("This field may only contain numbers");
      return;
    }

    // Move step counter back if error on previous page
    if (error !== "This field may only contain numbers") {
      previousStep();
    };

    insertRow();
  };

  // Insert user into database
  const insertRow = () => {
    axios
      .post(process.env.REACT_APP_SERVER + "/auth/signUp", {
        signUpUserName: formData.userName,
        signUpFirstName: formData.firstName,
        signUpLastName: formData.lastName,
        signUpEmail: formData.email,
        signUpPassword: formData.password,
        signUpAboutMe: formData.aboutMe,
        signUpPhone: formData.phone,
        signUpWork: formData.work,
        signUpCountry: formData.country,
        signUpLocation: formData.location,
        signUpHourlyRate: formData.hourlyRate,
        signUpBirthday: formData.birthday,
      })
      .then((res) => {
        setError(res.data);

        // If validation passed
        if (res.data === "Successfully registered, please login") {
          navigate("/business-login", { state: res.data });
        }
      });
  };

  return (
    <form
      onSubmit={submitHandler}
      onKeyDown={(e) => {
        e.key === "Enter" && submitHandler(); //Submit form on enter
      }}
      className="mt-10"
    >
      {/* About me */}
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          About Me
        </label>

        <textarea
          type="text"
          name="aboutMe"
          rows={4}
          value={formData.aboutMe}
          autoComplete="off"
          required
          onChange={handleChange}
          className="w-full px-3 py-2.5 text-sm leading-tight border border-gray-200 focus:border-blue-500 rounded-md rounded-r-none focus:outline-none"
        />
      </div>

      {/* Phone */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700">Phone</label>

        <div className="mt-1 w-full flex items-center">
          <div className="p-3 border border-l-0 rounded-l-md text-xs font-medium bg-gray-100 text-gray-700">
            +44
          </div>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            autoComplete="off"
            required
            onChange={handleChange}
            className={`${
              error === "This field may only contain numbers"
                ? "border-red-500 rounded"
                : "border-gray-200"
            } w-full px-3 py-2.5 text-sm leading-tight border border-l-none border-gray-200 focus:border-blue-500 rounded-md rounded-l-none focus:outline-none`}
          />
        </div>
      </div>

      {error === "This field may only contain numbers" && (
        <p class="-mt-4 mb-4 text-xs italic text-red-500">
          This field may only contain numbers
        </p>
      )}

      {/* Work */}
      <Input
        label="Work"
        type="text"
        name="work"
        value={formData.work}
        handleChange={handleChange}
      />

      <div className="md:flex md:flex-row md:space-x-5">
        {/* Country */}
        <Input
          label="Country"
          type="text"
          name="country"
          value={formData.country}
          handleChange={handleChange}
        />

        {/* Location */}
        <Input
          label="Location"
          type="text"
          name="location"
          value={formData.location}
          handleChange={handleChange}
        />
      </div>

      {/* Hourly rate */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700">
          Hourly rate
        </label>

        <div className="mt-1 w-full flex items-center">
          <div className="p-3 border border-l-0 rounded-l-md text-xs font-medium bg-gray-100 text-gray-700">
            £
          </div>

          <input
            type="text"
            name="hourlyRate"
            value={formData.hourlyRate}
            autoComplete="off"
            required
            onChange={handleChange}
            className={`${
              error === "This field may only contain numbers"
                ? "border-red-500 rounded"
                : "border-gray-200"
            } w-full px-3 py-2.5 text-sm leading-tight border border-l-none border-gray-200 focus:border-blue-500 rounded-md rounded-l-none focus:outline-none`}
          />
        </div>
      </div>

      {error === "This field may only contain numbers" && (
        <p class="-mt-4 mb-4 text-xs italic text-red-500">
          This field may only contain numbers
        </p>
      )}

      {/* Birthday */}
      <Input
        label="Birthday"
        type="date"
        name="birthday"
        value={formData.birthday}
        handleChange={handleChange}
      />

      {/* Buttons */}
      <div className="flex flex-row space-x-2.5">
        <Button
          onClick={previousStep}
          sx={{
            width: "100%",
            padding: "0.5rem 1rem",
            textTransform: "none",
            color: "#6b7280",
            bgcolor: "#e5e7eb",

            ":hover": {
              color: "#4b5563",
              bgcolor: "#f3f4f6",
            },
          }}
        >
          Previous
        </Button>

        <Button
          type="submit"
          sx={{
            width: "100%",
            padding: "0.5rem 1rem",
            textTransform: "none",
            color: "#ffffff",
            bgcolor: "#3b82f6",

            ":hover": {
              bgcolor: "#2563eb",
            },
          }}
        >
          Sign up{" "}
          <span aria-hidden="true" className="ml-1">
            &rarr;
          </span>
        </Button>
      </div>
    </form>
  );
};