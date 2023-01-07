import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';

import AuthLayout from '../components/authentication/AuthLayout';
import Button from '../components/Button';
import TextField from '../components/authentication/Fields';
import Logo from '../components/Logo';

export default function Login(props)  {
  const navigate = useNavigate()
  const location = useLocation();

  //variable stores current input of fiels
  let emailInput;
  //function that updates the input holding variable on every change event
  let onEmailChange = event => emailInput = event.target.value;

  //variable stores current input of fiels
  let passwordInput;
  //function that updates the input holding variable on every change event
  let onPasswordChange = event =>  passwordInput = event.target.value;

  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(location.state);
  }, [location]);

  const validateRow = () => {
    // Validate login
    axios.post('http://localhost:8080/signin', {
      email: emailInput,
      password: passwordInput
    })
    .then((res) => {
        setMessage(res.data);

        //If validation passed
        if (res.data === 'Login successful') {
          navigate('/directory')
        };
    });
  };

  const onSubmitSignIn = (e) => {
    e.preventDefault(); //Prevents page refresh
    setMessage(''); //Clear previous errors

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
              Don’t have an account?{' '}
              <Link
                to="/business-register"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign up
              </Link>{' '}
              for a free trial.
            </p>
          </div>
        </div>

        <form action="#" className="mt-10 grid z-10 grid-cols-1 gap-y-8">
          {/* Email */}
          <TextField
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            onChange={onEmailChange}
            required
            class={`${message === 'Email or password are incorrect' ? 'border-red-500' : ''
            }`}
          />

          {/* Password */}
          <TextField
            label="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            onChange={onPasswordChange}
            required 
            class={`${message === 'Incorrect password' ? 'border-red-500 rounded' : message === 'Email or password are incorrect' ? 'border-red-500 rounded' : ''
            }`}
          />

          {/* Password validation */}
          {message === 'Incorrect password' && (
            <p class="col-span-full text-xs italic text-red-500">Incorrect password</p>
          )}

          {message === 'Email or password are incorrect' && (
            <p class="col-span-full text-xs italic text-red-500">Email or password are incorrect</p>
          )}

          <div>
            {/* Submit button */}
            <Button                
              variant="solid"
              color="blue"
              className="w-full"                         
              onClick={onSubmitSignIn}
            >
              <span>
                Sign in <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
      </AuthLayout>
    </>
  );
};