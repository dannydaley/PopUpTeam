import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'

export default class Register extends React.Component 
  {
    constructor(props) {
      super(props);
      this.state = {
          signUpEmail: '',
          signUpUserName: '',
          signUpFirstName: '',
          signUpLastName: '',
          signUpPassword: '',
          confirmSignUpPassword: ''            
      }
  }

  onEmailChange = (event) => {
    this.setState({signUpEmail: event.target.value})
  }
  onUserNameChange = (event) => {
    this.setState({signUpUserName: event.target.value})
  }
  onFirstNameChange = (event) => {
    this.setState({signUpFirstName: event.target.value})
  }
  onLastNameChange = (event) => {
    this.setState({signUpLastName: event.target.value})
  }
  onPasswordChange = (event) => {
    this.setState({signUpPassword: event.target.value})
  }
  onPasswordConfirmChange = (event) => {
    this.setState({confirmSignUpPassword: event.target.value})
  }


  onSubmitSignUp = () => {
    fetch('http://localhost:8080' + '/signUp', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'signUpEmail': this.state.signUpEmail,
            'signUpUserName': this.state.signUpUserName,
            'signUpFirstName': this.state.signUpFirstName,
            'signUpLastName': this.state.signUpLastName,
            'signUpPassword': this.state.signUpPassword,
            'confirmSignUpPassword': this.state.confirmSignUpPassword   
        })
    })
    .then(response => response.json())
    // .then(data => {
    //     if (data.status === 'success') {            
    //         this.props.updateSession(data.firstName, data.lastName, data.username, data.profilePicture);
    //       }
    //     })
        .then(
          console.log('sent')
          // this.props.onRouteChange('signin')
          )
}

  render () {
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
              onChange={this.onUserNameChange}
              required
            />
            <TextField
              label="First name"
              id="first_name"
              name="first_name"
              type="text"
              autoComplete="given-name"
              onChange={this.onFirstNameChange}
              required
            />
            <TextField
              label="Last name"
              id="last_name"
              name="last_name"
              type="text"
              autoComplete="family-name"
              onChange={this.onLastNameChange}
              required
            />
            <TextField
              className="col-span-full"
              label="Email address"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              onChange={this.onEmailChange}
              required
            />
            <TextField
              className="col-span-full"
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              onChange={this.onPasswordChange}
              required
            />
            <TextField
              className="col-span-full"
              label="Confirm Password"
              id="password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              onChange={this.onPasswordConfirmChange}
              required
            />
            <div className="col-span-full">
              <Button
                type="submit"
                variant="solid"
                color="blue"
                className="w-full"
                value="Sign Up" 
                onClick={() => this.onSubmitSignUp()}
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

}
