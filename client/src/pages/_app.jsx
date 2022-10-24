import 'focus-visible'
import '@/styles/tailwind.css'
import { useState } from 'react';

export default function App({ Component, pageProps }) {
  const [userFirstName, setUserFirstName] = useState('firstname');
  const [userLastName, setUserLastName] = useState('lastname');
  let [userUserName, setUserUserName] = useState('username');
  let [userProfilePicture, setUserProfilePicture] = useState('./');

  return   <Component {...pageProps} 
    userFirstName={userFirstName}
    setUserFirstName={setUserFirstName}
    userLastName={userLastName}
    setUserLastName={setUserLastName}
    userUserName={userUserName}
    setUserUserName={setUserUserName}
    userProfilePicture={userProfilePicture}
    setUserProfilePicture={setUserProfilePicture}
    />
}
