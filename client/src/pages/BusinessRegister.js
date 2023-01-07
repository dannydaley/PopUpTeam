import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import axios from 'axios';

import { ContainsCapital, ContainsNumber, ContainsSpecial } from '../components/authentication/InputFormatter';
import AuthLayout from '../components/authentication/AuthLayout';
import Button from '../components/Button';
import TextField from '../components/authentication/Fields';
import Logo from '../components/Logo';

export default function Register() { 
  const navigate = useNavigate();

  const[signUpUserName, setSignUpUserName] = useState('');
  const[signUpFirstName, setSignUpFirstName] = useState('');
  const[signUpLastName, setSignUpLastName] = useState('');
  const[signUpEmail, setSignUpEmail] = useState('');
  const[signUpPassword, setSignUpPassword] = useState('');
  const[signUpConfirmPassword, setSignUpConfirmPassword] = useState('');

  const [error, setError] = useState('');

  const insertRow = () => {
    // Insert user into database
    axios.post('http://localhost:8080/signUp', {
      signUpEmail: signUpEmail,
      signUpUserName: signUpUserName,
      signUpFirstName: signUpFirstName,
      signUpLastName: signUpLastName,
      signUpPassword: signUpPassword,
    })
    .then((res) => {
        setError(res.data);

        // If validation passed
        if (res.data === 'Successfully registered, please login') {
            navigate('/business-login', { state: res.data });
        };
    });
  };

  const onSubmitSignUp = (e) => {
    e.preventDefault(); // Prevents page refresh
    setError(''); // Clear previous errors

    // // If first or last name contain numbers or special characters
    if (ContainsNumber(signUpFirstName) || ContainsSpecial(signUpFirstName) || ContainsNumber(signUpLastName) || ContainsSpecial(signUpLastName)) {
        setError('Names may only contain alphabetic characters')
        return;
    };

    // If password doesn't contain a capital
    if (!ContainsCapital(signUpPassword)) {
        setError('Password must contain at least one uppercase letter');
        return;
    };

    // If password doesn't contain a number
    if (!ContainsNumber(signUpPassword)) {
        setError('Password must contain at least one number');
        return;
    };

    // If password is less than 8 characters
    if (signUpPassword.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
    };

    // If passwords don't match
    if (signUpConfirmPassword !== signUpPassword) {
        setError('Passwords do not match');
        return;
    };

    insertRow();
  };

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      
      <AuthLayout>
        <div className="flex flex-col">
          <Link to="/" aria-label="Home">
            <Logo className="h-10 w-auto" />
          </Link>
          <div className="mt-20">
            <h2 className="text-lg font-semibold text-gray-900">
              Get started for free
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Already registered? {' '}
              <Link
                to="/business-login"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign in
              </Link>{' '}
              to your account.
            </p>
          </div>
        </div>

        <form
          onSubmit={onSubmitSignUp}
          onKeyPress={(e) => {
            e.key === 'Enter' && onSubmitSignUp(); //Submit form on enter
          }}
          className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2"
        >
          {/* Username */}
          <TextField
            label="Username"
            id="username"
            name="first_name"
            type="text"
            autoComplete="username"
            required
            className="col-span-full"
            onChange={(e) => {
              setSignUpUserName(e.target.value);
            }}
            class={`${
              error === 'Username already exists' ? 'w-full border-red-500 rounded' : 'border-gray-200'
            }`}
          />

          {/* Username validation */}
          {error === 'Username already exists' && 
            <p class="col-span-full -mt-4 text-xs italic text-red-500">Username already exists</p>
          }

          {/* First and last name */}
          <TextField
            label="First name"
            id="first_name"
            name="first_name"
            type="text"
            autoComplete="given-name"
            required
            onChange={(e) => {
              setSignUpFirstName(e.target.value);
            }}            
            class={`${
              error === 'Names may only contain alphabetic characters' ? 'w-full border-red-500 rounded' : 'border-gray-200'
            }`}
          />

          <TextField
            label="Last name"
            id="last_name"
            name="last_name"
            type="text"
            autoComplete="family-name"
            required
            onChange={(e) => {
              setSignUpLastName(e.target.value);
            }}             
            class={`${
              error === 'Names may only contain alphabetic characters' ? 'w-full border-red-500 rounded' : 'border-gray-200'
            }`}
          />

          {/* Name validation */}
          {error === 'Names may only contain alphabetic characters' && 
            <p class="col-span-full -mt-4 text-xs italic text-red-500">Names may only contain alphabetic characters</p>
          }

          {/* Email */}
          <TextField
            className="col-span-full"
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            onChange={(e) => {
              setSignUpEmail(e.target.value);
            }}              
            class={`${
              error === 'Email already exists' ? 'w-full border-red-500 rounded' : 'border-gray-200'
            }`}
          />

          {/* Email validation */}
          {error === 'Email already exists' && 
            <p class="-mt-4 text-xs italic text-red-500">Email already exists</p>
          }

          {/* Password */}
          <TextField
            className="col-span-full"
            label="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            onChange={(e) => {
              setSignUpPassword(e.target.value);
            }}              
            class={`${
              error === 'Password must contain at least one uppercase letter' || error === 'Password must contain at least one number' || error === 'Password must be at least 8 characters long' || error === 'Passwords do not match'   ? 'w-full border-red-500 rounded' : 'border-gray-200'
            }`}
          />

          <TextField
            className="col-span-full"
            label="Confirm Password"
            id="password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            onChange={(e) => {
              setSignUpConfirmPassword(e.target.value);
            }}               
            class={`${
              error === 'Passwords do not match' ? 'w-full border-red-500 rounded' : 'border-gray-200'
            }`}
          />

          {/* Password validation */}
          {error === 'Password must contain at least one uppercase letter' &&
            <p class="col-span-full -mt-4 text-xs italic text-red-500">Password must contain at least one uppercase letter</p>
          }

          {error === 'Password must contain at least one number' &&
            <p class="col-span-full -mt-4 text-xs italic text-red-500">Password must contain at least one number</p>
          }

          {error === 'Password must be at least 8 characters long' &&
            <p class="col-span-full -mt-4 text-xs italic text-red-500">Password must be at least 8 characters long</p>
          }

          {error === 'Passwords do not match' && 
            <p class="col-span-full -mt-4 text-xs italic text-red-500">Passwords do not match</p>
          }   
          
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


