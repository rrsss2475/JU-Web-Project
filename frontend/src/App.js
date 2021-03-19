import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Contents from './components/Contents';
import Footer from './components/Footer';

function App() {
  return (
    <div className="page-container">
      <Navbar />
      {/* <div className="content-wrap">
        <h1>CONTENT FOR FOOTER</h1>
        <h1>CONTENT FOR FOOTER</h1>
        <h1>CONTENT FOR FOOTER</h1>
        <h1>CONTENT FOR FOOTER</h1>
        <h1>CONTENT FOR FOOTER</h1>
        <h1>CONTENT FOR FOOTER</h1>
        <h1>CONTENT FOR FOOTER</h1>
        <h1>CONTENT FOR FOOTER</h1>
      </div> */}
      <Contents />
      <Footer />
    </div>
  );
}

export default App;
