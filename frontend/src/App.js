import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Navbar />
      <Main />
      <Footer />
    </>
  );
}

export default App;
