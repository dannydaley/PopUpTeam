import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Helmet from "react-helmet";
import axios from "axios";
import RegisterPageOne from "../components/authentication/RegisterPageOne";

export default function Register() {
    return (
        <>
            <Helmet>
                <title>Sign Up</title>
            </Helmet>

            <RegisterPageOne />
        </>
    );
};