import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import useFormData from "./useFormData";
import {
  ContainsCapital,
  ContainsNumber,
  ContainsSpecial,
} from "./InputFormatter";
import AuthLayout from "./AuthLayout";
import Button from "../Button";
import Input from "./Input";
import Logo from "../Logo";

export default function RegisterPageOne() {
  const navigate = useNavigate();

  const { formData, handleChange } = useFormData();
  const [error, setError] = useState("");

  // Insert user into database
  const insertRow = () => {
    axios
      .post(process.env.REACT_APP_SERVER + "/auth/signUp", {
        signUpUserName: formData.userName,
        signUpFirstName: formData.firstName,
        signUpLastName: formData.lastName,
        signUpEmail: formData.email,
        signUpPassword: formData.password,
      })
      .then((res) => {
        setError(res.data);

        // If validation passed
        if (res.data === "Successfully registered, please login") {
          navigate("/business-login", { state: res.data });
        }
      });
  };

  const onSubmitSignUp = (e) => {
    e.preventDefault(); // Prevents page refresh
    setError(""); // Clear previous errors

    // // If first or last name contain numbers or special characters
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

    insertRow();
  };

  return (
    <>
      <AuthLayout>
        <div className="flex flex-col">
          <Logo width={170} image={"logo.png"} />

          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
              Get started for free
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Already registered?{" "}
              <Link
                to="/business-login"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign in
              </Link>{" "}
              to your account.
            </p>
          </div>
        </div>

        <form
          onSubmit={onSubmitSignUp}
          onKeyDown={(e) => {
            e.key === "Enter" && onSubmitSignUp(); //Submit form on enter
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
          <div className="col-span-full">
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
              value="Sign Up"
            >
              <span>
                Sign up <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
      </AuthLayout>
    </>
  );
};