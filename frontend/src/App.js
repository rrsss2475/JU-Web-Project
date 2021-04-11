import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import Footer from './components/Footer';
import AboutusScreen from './screens/AboutusScreen';
import ContactusScreen from './screens/ContactusScreen';
import LoginScreen from './screens/LoginScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import SubCategoriesScreen from './screens/SubCategoriesScreen';
import ProductScreen from './screens/ProductScreen'
import ProductDescScreen from './screens/ProductDescScreen';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar />
      {/* <Carousel/> */}
      <main >
        <Route path="/" component={HomeScreen} exact />
        <Route path="/aboutus" component={AboutusScreen} exact />
        <Route path="/contactus" component={ContactusScreen} exact />
        <Route path="/login" component={LoginScreen} exact />
        <Route path="/categories" component={CategoriesScreen} exact />
        <Route path="/categories/:catName" component={SubCategoriesScreen} exact />
        <Route path="/categories/:catName/:subCatName" component={ProductScreen} exact />
        <Route path="/categories/:catName/:subCatName/:prodName" component={ProductDescScreen} exact />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
