import Helmet from "react-helmet";

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