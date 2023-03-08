import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

import useFormData from "../components/authentication/useFormData";
import AuthLayout from "../components/authentication/AuthLayout";
import Button from "../components/Button";
import Input from "../components/authentication/Input";
import Logo from "../components/Logo";

export default function Login(props) {
    const navigate = useNavigate();
    const location = useLocation();
    
    const { setAccount } = props;
    const { formData, handleChange } = useFormData();
    const [message, setMessage] = useState("");

    useEffect(() => {
        setMessage(location.state);
    }, [location]);

    const validateRow = () => {
        // Validate login
        axios
            .post(process.env.REACT_APP_SERVER + "/auth/signin", {
                email: formData.email,
                password: formData.password,
            })
            // .then((response) => response.json())
            .then((data) => {
                setMessage(data.data.login);

                //If validation passed
                if (data.data.login === "Login successful") {
                    setAccount({
                        firstName: data.data.userData.firstName,
                        lastName: data.data.userData.lastName,
                        profilePicture: data.data.userData.profilePicture,
                        aboutMe: data.data.userData.aboutMe,
                        phone: data.data.userData.phone,
                        email: data.data.userData.email,
                        work: data.data.userData.work,
                        team: data.data.userData.team,
                        country: data.data.userData.country,
                        location: data.data.userData.location,
                        hourlyRate: data.data.userData.hourlyRate,
                        birthday: data.data.userData.birthday,
                        skills: [],
                    });
                    
                    navigate("/directory");
                    window.location.reload(); // Ensures account information and message system updates
                }
            });
    };

    const onSubmitSignIn = (e) => {
        e.preventDefault(); //Prevents page refresh
        setMessage(""); //Clear previous errors

        validateRow();
    };

    return (
        <>
            <Helmet>
                <title>Sign In</title>
            </Helmet>

            <AuthLayout>
                <div className="flex flex-col">
                    <Logo width={170} image={"logo.png"} />
                    <div className="mt-20">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-sm text-gray-700">
                            Don’t have an account?{" "}
                            <Link
                                to="/business-register"
                                className="font-medium text-blue-600 hover:underline"
                            >
                                Sign up
                            </Link>{" "}
                            for a free trial.
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={onSubmitSignIn}
                    onKeyDown={(e) => {
                        e.key === "Enter" && onSubmitSignIn(); //Submit form on enter
                    }}
                    className="mt-10"
                >
                    {/* Registered message */}
                    {message === "Successfully registered, please login" && (
                        <p class="-mt-4 mb-8 p-4 rounded font-medium text-xs text-green-700 bg-green-300">
                            Successfully registered, please login
                        </p>
                    )}

                    {/* Email */}
                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        handleChange={handleChange}
                        error={
                            message === "Email or password are incorrect"
                                ? message
                                : ""
                        }
                    />

                    {/* Password */}
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        handleChange={handleChange}
                        error={
                            message === "Email or password are incorrect"
                                ? message
                                : ""
                        }
                    />

                    {/* Password validation */}
                    {message === "Email or password are incorrect" && (
                        <p class="col-span-full -mt-4 mb-4 text-xs italic text-red-500">
                            Email or password are incorrect
                        </p>
                    )}

                    <div>
                        {/* Submit button */}
                        <Button variant="solid" color="blue" className="w-full">
                            <span>
                                Sign in <span aria-hidden="true">&rarr;</span>
                            </span>
                        </Button>
                    </div>
                </form>
            </AuthLayout>
        </>
    );
}
