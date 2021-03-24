import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Carousel from './components/ImageSlider';
import HomeScreen from './screens/HomeScreen';
import Footer from './components/Footer';
import AboutusScreen from './screens/AboutusScreen';
import ContactusScreen from './screens/ContactusScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar />
      {/* <Carousel/> */}
      <main >
        <Route path="/" component = {HomeScreen} exact/>
        <Route path="/aboutus" component = {AboutusScreen} exact/>
        <Route path="/contactus" component = {ContactusScreen} exact/>
        <Route path="/login" component = {LoginScreen} exact/>
        <Route path="/signup" component = {SignupScreen} exact/>
        <Route path="/categories" component = {CategoriesScreen} exact/>
        
      </main>
      <Footer />
    </Router>
  );
}

export default App;
