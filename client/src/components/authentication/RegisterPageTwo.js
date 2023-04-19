import { Link } from "react-router-dom";

import useFormData from "./useFormData";
import AuthLayout from "./AuthLayout";
import Logo from "../Logo";
import Input from "./Input";
import Button from "../Button";

export default function RegisterPageTwo() {
  const { formData, handleChange } = useFormData();

  return (
    <>
      <AuthLayout>
        <div className="flex flex-col">
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

          <form className="mt-10">
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
                onChange={handleChange}
                placeholder="Write a little bit to describe yourself"
                className="w-full px-3 py-2.5 text-sm leading-tight border border-gray-200 focus:border-blue-500 rounded-md rounded-r-none focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>

              <div className="mt-1 w-full flex items-center">
                <div className="p-3 border border-l-0 rounded-l-md text-xs font-medium bg-gray-100 text-gray-700">
                  +44
                </div>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-sm leading-tight border border-l-none border-gray-200 focus:border-blue-500 rounded-md rounded-l-none focus:outline-none"
                />
              </div>
            </div>

            {/* Work */}
            <Input
              label="Work"
              type="text"
              name="work"
              value={formData.work}
              handleChange={handleChange}
            />

            <div className="flex flex-row space-x-5">
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
                  name="phone"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-sm leading-tight border border-l-none border-gray-200 focus:border-blue-500 rounded-md rounded-l-none focus:outline-none"
                />
              </div>
            </div>

            {/* Birthday */}
            <Input
              label="Birthday"
              type="date"
              name="birthday"
              value={formData.birthday}
              handleChange={handleChange}
            />

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
        </div>
      </AuthLayout>
    </>
  );
};