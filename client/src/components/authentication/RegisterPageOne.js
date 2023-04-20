import Input from "./Input";
import Button from "@mui/material/Button";

import {
  ContainsCapital,
  ContainsNumber,
  ContainsSpecial,
} from "./InputFormatter";

export default function RegisterPageOne(props) {
  const { nextStep, formData, handleChange, error, setError } = props;

  const submitHandler = (e) => {
    e.preventDefault();
    setError("");

    // If first or last name contain numbers or special characters
    if (
      ContainsNumber(formData.firstName) ||
      ContainsSpecial(formData.firstName) ||
      ContainsNumber(formData.lastName) ||
      ContainsSpecial(formData.lastName)
    ) {
      setError("Names may only contain alphabetic characters");
      return;
    }

    // If password doesn't contain a capital
    if (!ContainsCapital(formData.password)) {
      setError("Password must contain at least one uppercase letter");
      return;
    }

    // If password doesn't contain a number
    if (!ContainsNumber(formData.password)) {
      setError("Password must contain at least one number");
      return;
    }

    // If password is less than 8 characters
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    // If passwords don't match
    if (formData.confirmPassword !== formData.password) {
      setError("Passwords do not match");
      return;
    }

    //If all inputs have been filled move to next step
    if (
      formData.userName &&
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.password &&
      formData.confirmPassword
    ) {
      nextStep();
    };
  };

  return (
    <form
      onSubmit={submitHandler}
      onKeyDown={(e) => {
        e.key === "Enter" && submitHandler(); //Submit form on enter
      }}
      className="mt-10"
    >
      {/* Username */}
      <Input
        label="Username"
        type="text"
        name="userName"
        value={formData.userName}
        handleChange={handleChange}
        error={error === "Username already exists" ? error : ""}
      />

      {/* Username validation */}
      {error === "Username already exists" && (
        <p class="col-span-full -mt-4 mb-4 text-xs italic text-red-500">
          Username already exists
        </p>
      )}

      {/* First and last name */}
      <div class="flex flex-row space-x-5">
        <Input
          label="First name"
          type="text"
          name="firstName"
          value={formData.firstName}
          handleChange={handleChange}
          error={
            error === "Names may only contain alphabetic characters"
              ? error
              : ""
          }
        />

        <Input
          label="Last name"
          type="text"
          name="lastName"
          value={formData.lastName}
          handleChange={handleChange}
          error={
            error === "Names may only contain alphabetic characters"
              ? error
              : ""
          }
        />
      </div>

      {/* Name validation */}
      {error === "Names may only contain alphabetic characters" && (
        <p class="-mt-4 mb-4 text-xs italic text-red-500">
          Names may only contain alphabetic characters
        </p>
      )}

      {/* Email */}
      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        handleChange={handleChange}
        error={error === "Email already exists" ? error : ""}
      />

      {/* Email validation */}
      {error === "Email already exists" && (
        <p class="-mt-4 mb-4 text-xs italic text-red-500">
          Email already exists
        </p>
      )}

      {/* Password */}
      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        handleChange={handleChange}
        error={
          error === "Password must contain at least one uppercase letter" ||
          error === "Password must contain at least one number" ||
          error === "Password must be at least 8 characters long"
            ? error
            : "" || error === "Passwords do not match"
            ? error
            : ""
        }
      />

      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        handleChange={handleChange}
        error={error === "Passwords do not match" ? error : ""}
      />

      {/* Password validation */}
      {error === "Password must contain at least one uppercase letter" && (
        <p class="col-span-full -mt-4 mb-4 text-xs italic text-red-500">
          Password must contain at least one uppercase letter
        </p>
      )}

      {error === "Password must contain at least one number" && (
        <p class="col-span-full -mt-4 mb-4 text-xs italic text-red-500">
          Password must contain at least one number
        </p>
      )}

      {error === "Password must be at least 8 characters long" && (
        <p class="col-span-full -mt-4 mb-4 text-xs italic text-red-500">
          Password must be at least 8 characters long
        </p>
      )}

      {error === "Passwords do not match" && (
        <p class="col-span-full -mt-4 mb-4 text-xs italic text-red-500">
          Passwords do not match
        </p>
      )}

      {/* Submit button */}
      <Button
        type="submit"
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
        Next
      </Button>
    </form>
  );
};