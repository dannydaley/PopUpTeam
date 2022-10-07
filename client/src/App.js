import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './components/header';
import Footer from './components/footer';
import Index from './components/index/index'
import Database from './components/database';

export default function App() {
  return (
    <div>
      <Header />
      
      <Routes>
        <Route path="/" element={<Index />}/>
        <Route path="/dev" element={<Database />}/>
      </Routes>

      <Footer />

    </div>
  );
};