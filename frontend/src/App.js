import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import "./App.css"
import Navbar from "./components/Navbar"
import HomeScreen from "./screens/HomeScreen"
import Footer from "./components/Footer"
import AboutusScreen from "./screens/AboutusScreen"
import ContactusScreen from "./screens/ContactusScreen"
import LoginScreen from "./screens/LoginScreen"
import CategoriesScreen from "./screens/CategoriesScreen"
import SubCategoriesScreen from "./screens/SubCategoriesScreen"
import ProductScreen from "./screens/ProductScreen"
import ProductDescScreen from "./screens/ProductDescScreen"
import "bootstrap/dist/css/bootstrap.min.css"
import ReviewsScreen from "./screens/ReviewsScreen"
import UserProfile from "./screens/UserProfile"
import ShippingScreen from "./screens/ShippingScreen"
import ScrollToTop from "./components/ScrollToTop"
import PaymentScreen from "./screens/PaymentScreen"
import OrderScreen from "./screens/OrderScreen"
import CartScreen from "./screens/CartScreen"

function App() {
	return (
		<Router>
			<Navbar />
			<ScrollToTop />
			<main>
				<Route path="/" component={HomeScreen} exact />
				<Route path="/aboutus" component={AboutusScreen} exact />
				<Route path="/contactus" component={ContactusScreen} exact />
				<Route path="/login" component={LoginScreen} exact />
				<Route path="/profile" component={UserProfile} exact />
				<Route path="/cart" component={CartScreen} exact />
				<Route path="/shipping" component={ShippingScreen} exact />
				<Route path="/payment" component={PaymentScreen} exact />
				<Route path="/order" component={OrderScreen} exact />
				<Route path="/:type" component={CategoriesScreen} exact />
				<Route
					path="/:type/:catName"
					component={SubCategoriesScreen}
					exact
				/>
				<Route
					path="/:type/:catName/:subCatName"
					component={ProductScreen}
					exact
				/>
				<Route
					path="/:type/:catName/:subCatName/:id"
					component={ProductDescScreen}
					exact
				/>
				<Route
					path="/:type/:catName/:subCatName/:id/reviews"
					component={ReviewsScreen}
					exact
				/>
			</main>
			<Footer />
		</Router>
	)
}

export default App
