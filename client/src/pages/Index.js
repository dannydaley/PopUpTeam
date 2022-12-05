import React from 'react';
import Helmet from 'react-helmet';

import CallToAction from '../components/index/CallToAction';
import Faqs from '../components/index/Faqs';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/index/Hero';
import Pricing from '../components/index/Pricing';
import PrimaryFeatures from '../components/index/PrimaryFeatures';
import SecondaryFeatures from '../components/index/SecondaryFeatures';
import Testimonials from '../components/index/Testimonials';
import Banner from '../components/index/Banner';

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
        };
    };

    updateSession = (firstName, lastName, userName, userProfilePicture) => {
        this.setState({
            userFirstName: firstName,
            userLastName: lastName,
            loggedInUsername: userName,
            userProfilePicture: userProfilePicture,
            isSignedIn: true
        });     
        console.log(this.state);
    };

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
            this.setState({isSignedIn: true});
            console.log(this.state);
        }
        this.setState({route: route});
    };
    
    render () {
        return (
            <>
                <Helmet>
                    <title>PopUpTeam - Finding a team made simple for small businesses</title>
                    <meta
                        name="description"
                        content="Finding a team made simple for small businesses"
                    />
                </Helmet>

                <Header onRouteChange={this.onRouteChange} route={this.state.route} updateSession={this.updateSession} />
                <>
                    <Hero />
                    <PrimaryFeatures />
                    <SecondaryFeatures />
                    <CallToAction />
                    <Testimonials />
                    <Pricing />
                    <Faqs />
                </>
                
                <Banner />
                <Footer />
            </>
        );
    };
};