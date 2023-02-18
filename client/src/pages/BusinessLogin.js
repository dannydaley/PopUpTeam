import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

import AuthLayout from "../components/authentication/AuthLayout";
import Button from "../components/Button";
import TextField from "../components/authentication/Fields";
import Logo from "../components/Logo";

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const [message, setMessage] = useState("");

    useEffect(() => {
        setMessage(location.state);
    }, [location]);

    const validateRow = () => {
        console.log(process.env.REACT_APP_SERVER);
        // Validate login
        axios
            .post(process.env.REACT_APP_SERVER + "/auth/signin", {
                email: emailInput,
                password: passwordInput,
            })
            .then((res) => {
                setMessage(res.data);

                //If validation passed
                if (res.data === "Login successful") {
                    navigate("/directory");
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
                    <Link to="/" aria-label="Home">
                        <Logo className="h-10 w-auto" />
                    </Link>
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
                    onKeyPress={(e) => {
                        e.key === "Enter" && onSubmitSignIn(); //Submit form on enter
                    }}
                    className="mt-10 grid z-10 grid-cols-1 gap-y-8"
                >
                    {/* Registered message */}
                    {message === "Successfully registered, please login" && (
                        <p class="-mt-4 p-4 rounded font-medium text-xs text-green-700 bg-green-300">
                            Successfully registered, please login
                        </p>
                    )}

                    {/* Email */}
                    <TextField
                        label="Email address"
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        onChange={(e) => {
                            setEmailInput(e.target.value);
                        }}
                        class={`${
                            message === "Email or password are incorrect"
                                ? "w-full border-red-500 rounded"
                                : "border-gray-200"
                        }`}
                    />

                    {/* Password */}
                    <TextField
                        label="Password"
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        onChange={(e) => {
                            setPasswordInput(e.target.value);
                        }}
                        class={`${
                            message === "Incorrect password"
                                ? "w-full border-red-500 rounded"
                                : message === "Email or password are incorrect"
                                ? "w-full border-red-500 rounded"
                                : "border-gray-200"
                        }`}
                    />

                    {/* Password validation */}
                    {message === "Incorrect password" && (
                        <p class="col-span-full -mt-4 text-xs italic text-red-500">
                            Incorrect password
                        </p>
                    )}

                    {message === "Email or password are incorrect" && (
                        <p class="col-span-full -mt-4 text-xs italic text-red-500">
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
