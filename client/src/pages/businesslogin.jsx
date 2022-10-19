import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'

export default class Login extends React.Component {

  constructor(props) {
    
    super(props);    
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
}

onPasswordChange = (event) => {
  this.setState({signInPassword: event.target.value})
}

// applySession = (firstName, lastName, username, profilePicture) => {
//   this.props.updateSession(firstName, lastName, username, profilePicture)
//   this.props.onRouteChange('home')  
// }

// componentDidMount() {     
// fetch('http://localhost:8080' + '/refreshSessionStatus', {
// status: 'session-exists'
// }).then(response => response.json())
// .then(data => data.status === "session-exists" ? this.applySession(data.firstName, data.lastName, data.username, data.profilePicture) :''
// )
// }

onSubmitSignIn = () => {
  fetch('http://localhost:8080' + '/signin', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'email': this.state.signInEmail,
      'password': this.state.signInPassword
    })
    })
    .then(response => response.json())
      .then(data => {   
        if (data.status === 'success') {   
          console.log(data)  
          // this.props.updateSession(data.firstName, data.lastName, data.username, data.profilePicture);
          // this.props.onRouteChange('home')
        }
  })
}


  render () {
    return (
      <>
        <Head>
          <title>Sign In</title>
        </Head>
        <AuthLayout>
          <div className="flex flex-col">
            <Link href="/" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </Link>
            <div className="mt-20">
              <h2 className="text-lg font-semibold text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm text-gray-700">
                Don’t have an account?{' '}
                <Link
                  href="/businessregister"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Sign up
                </Link>{' '}
                for a free trial.
              </p>
            </div>
          </div>
          <form action="#" className="mt-10 grid grid-cols-1 gap-y-8">
            <TextField
              label="Email address"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              onChange={this.onEmailChange}
              required
            />
            <TextField
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              onChange={this.onPasswordChange}
              required
            />
            <div>
              <Button
                type="submit"
                variant="solid"
                color="blue"
                className="w-full"
                onSubmit={()=> this.onSubmitSignIn()}                            
                onClick={()=> this.onSubmitSignIn()}
              >
                <span>
                  Sign in <span aria-hidden="true">&rarr;</span>
                </span>
              </Button>
            </div>
          </form>
        </AuthLayout>
      </>
    )
  }
}

