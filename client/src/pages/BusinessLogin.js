import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import AuthLayout from '../components/authentication/AuthLayout';
import Button from '../components/Button';
import TextField from '../components/authentication/Fields';
import Logo from '../components/Logo';

export default function Login(props)  {
  const navigate = useNavigate()
  //variable stores current input of fiels
  let emailInput;
  //function that updates the input holding variable on every change event
  let onEmailChange = event => emailInput = event.target.value;

  //variable stores current input of fiels
  let passwordInput;
  //function that updates the input holding variable on every change event
  let onPasswordChange = event =>  passwordInput = event.target.value;

  //function called on submit
  let onSubmitSignIn = (event) => {
    event.preventDefault();
    //access backend sign in endpoint  
    fetch('http://localhost:8080' + '/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      //convert data to JSON
      body: JSON.stringify({
        //pass in entry variables
        'email': emailInput,
        'password': passwordInput
      })
    })
    .then(response => response.json())
      .then(data => {     
        console.log(data)
        if (data.status === 'success') {     
          props.updateUserInfo(data.username, data.firstName, data.lastName, data.aboutMe, data.profilePicture)
          // reroute on success
            navigate('/directory')
        }
      });
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
          <TextField
            label="Email address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            onChange={onEmailChange}
            required
          />

          <TextField
            label="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            onChange={onPasswordChange}
            required 
          />

          <div>
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