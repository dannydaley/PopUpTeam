import Head from 'next/head'
import React from 'react'
import { CallToAction } from '@/components/CallToAction'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Testimonials } from '@/components/Testimonials'
import { Banner } from '@/components/Banner'

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      route: 'signin',
      isSignedIn: false,
      userFirstName: '',
      userLastName: '',
      loggedInUsername: '',
      userProfilePicture: ''
    }
  }

  updateSession = (firstName, lastName, userName, userProfilePicture) => {
    this.setState({
      userFirstName: firstName,
      userLastName: lastName,
      loggedInUsername: userName,
      userProfilePicture: userProfilePicture,
      isSignedIn: true
    })   
    console.log(this.state)
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
      fetch(process.env.REACT_APP_SERVER + '/signout', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
             sender: this.props.loggedInUsername
        }) 
      })      
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
      console.log(this.state)
    }
    this.setState({route: route})
  }


  render () {
      return (
        <>
          <Head>
            <title>PopUpTeam - Finding a team made simple for small businesses</title>
            <meta
              name="description"
              content="Finding a team made simple for small businesses"
            />
          </Head>
          <Header onRouteChange={this.onRouteChange} route={this.state.route} updateSession={this.updateSession} />
          <main>
            <Hero />
            <PrimaryFeatures />
            <SecondaryFeatures />
            <CallToAction />
            <Testimonials />
            <Pricing />
            <Faqs />
          </main>
          <Banner />
          <Footer />
        </>
      )
    }
}