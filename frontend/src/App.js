import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import Footer from './components/Footer';
import AboutusScreen from './screens/AboutusScreen';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar />
      <main >
        <Route path="/" component = {HomeScreen} exact/>
        <Route path="/aboutus" component = {AboutusScreen} exact/>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
