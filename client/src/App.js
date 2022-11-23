import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";

import Home from './components/index';
import About from './components/about';
import BecomeACreative from './components/BecomeACreative';

import Login from './components/authentication/BusinessLogin';
import Register from './components/authentication/BusinessRegister';

import CreativeDirectory from './components/directory/CreativeDirectory';
import NewProject from './components/directory/NewProject';
import Error from './components/404';

export default function App() {
    return (
        <>            
            <Routes>
                {/* Index */}
                <Route path="/" element={<Home />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/become-a-creative" element={<BecomeACreative />} />

                {/* Authentication */}
                <Route path="/business-login" element={<Login />} />
                <Route path="/business-register" element={<Register />} />

                {/* Directory */}
                <Route path="/directory" element={<CreativeDirectory />} />
                <Route path="/projects" element={<NewProject />} />
                <Route path="*" element={<Error />}/>
            </Routes>
        </>
    );
};