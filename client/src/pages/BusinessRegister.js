import { useState } from "react";
import { Link } from "react-router-dom";

import useFormData from "../components/authentication/useFormData";
import Helmet from "react-helmet";
import AuthLayout from "../components/authentication/AuthLayout";
import Logo from "../components/Logo";

import RegisterPageOne from "../components/authentication/RegisterPageOne";
import RegisterPageTwo from "../components/authentication/RegisterPageTwo";

export default function Register() {
  const [step, setStep] = useState(1);

  const [error, setError] = useState("");
  const { formData, handleChange } = useFormData();

  // Increase step count
  const nextStep = () => {
    setStep(step + 1);
  };

  // Decrease step count
  const previousStep = () => {
    setStep(step - 1);
  };

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>

      <AuthLayout>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <Logo width={170} image={"logo.png"} />

            {step === 1 && (
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
            )}
          </div>

          {step === 1 && (
            <RegisterPageOne
              nextStep={nextStep}
              formData={formData}
              handleChange={handleChange}
              error={error}
              setError={setError}
            />
          )}

          {step === 2 && (
            <RegisterPageTwo
              previousStep={previousStep}
              formData={formData}
              handleChange={handleChange}
              error={error}
              setError={setError}
            />
          )}
        </div>
      </AuthLayout>
    </>
  );
};