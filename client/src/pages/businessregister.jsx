import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { data } from 'autoprefixer'
import { useRouter } from 'next/router'

export default function Register() { 
  

  //set up router for page changes
  const router = useRouter();

  //collect data from text input field
  let signUpEmail;
  const onEmailChange = event => signUpEmail = event.target.value;
  
  //collect data from text input field
  let signUpUserName;
  const onUserNameChange = event => signUpUserName = event.target.value;
  
  //collect data from text input field
  let signUpFirstName;
  const onFirstNameChange = event => signUpFirstName = event.target.value;
  
  //collect data from text input field
  let signUpLastName;
  const onLastNameChange = event => signUpLastName = event.target.value;
  
  //collect data from text input field
  let signUpPassword;
  const onPasswordChange = event => signUpPassword = event.target.value;
  
  //collect data from text input field
  let signUpConfirmPassword;
  const onPasswordConfirmChange = event => signUpConfirmPassword = event.target.value

  //triggered by form submit button
  const onSubmitSignUp = (event) => {
    //prevent default behaviour of button, prevent http load and keeps sensitive data from url bar
    event.preventDefault();
    // set up the fetch request to server
    fetch('http://localhost:8080' + '/signUp', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        // pass in data from text fields
        body: JSON.stringify({
            'signUpEmail': signUpEmail,
            'signUpUserName': signUpUserName,
            'signUpFirstName': signUpFirstName,
            'signUpLastName': signUpLastName,
            'signUpPassword': signUpPassword,
            'confirmSignUpPassword': signUpConfirmPassword   
        })
    })
    // conver response to json
    .then(response => response.json())
    .then(data => {
      //run the correct response according the status brought back
      switch(data.status) {
        case 'success':
          alert("account created successfully, you can log in.");
          // reroute on success
            router.push('/');
          break;
        case 'email exists':
          alert('Email entered already exists');
          break;
        case 'username exists':
          alert('username already exists');
          break;
        default:
          alert('There was an error on signup')
      }}
    )}

    return (
      <>
        <Head>
          <title>Sign Up</title>
        </Head>
        <AuthLayout>
          <div className="flex flex-col">
            <Link href="/" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </Link>
            <div className="mt-20">
              <h2 className="text-lg font-semibold text-gray-900">
                Get started for free
              </h2>
              <p className="mt-2 text-sm text-gray-700">
                Already registered?{' '}
                <Link
                  href="/businesslogin"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Sign in
                </Link>{' '}
                to your account.
              </p>
            </div>
          </div>
          <form
            action="#"
            className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2"
          >
            <TextField
              className="col-span-full"
              label="Username"
              id="username"
              name="first_name"
              type="text"
              autoComplete="username"
              onChange={onUserNameChange}
              required
            />
            <TextField
              label="First name"
              id="first_name"
              name="first_name"
              type="text"
              autoComplete="given-name"
              onChange={onFirstNameChange}
              required
            />
            <TextField
              label="Last name"
              id="last_name"
              name="last_name"
              type="text"
              autoComplete="family-name"
              onChange={onLastNameChange}
              required
            />
            <TextField
              className="col-span-full"
              label="Email address"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              onChange={onEmailChange}
              required
            />
            <TextField
              className="col-span-full"
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              onChange={onPasswordChange}
              required
            />
            <TextField
              className="col-span-full"
              label="Confirm Password"
              id="password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              onChange={onPasswordConfirmChange}
              required
            />
            <div className="col-span-full">
              <Button
                type="submit"
                variant="solid"
                color="blue"
                className="w-full"
                value="Sign Up"                 
                onClick={onSubmitSignUp}
              >
                <span>
                  Sign up <span aria-hidden="true">&rarr;</span>
                </span>
              </Button>
            </div>
          </form>
        </AuthLayout>
      </>
    )

  }


