import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "./App.css"
import Navbar from "./components/Navbar"
//import HomeScreen from "./screens/HomeScreen"
import Footer from "./components/Footer"
//import AboutusScreen from "./screens/AboutusScreen"
//import ContactusScreen from "./screens/ContactusScreen"
//import LoginScreen from "./screens/LoginScreen"
//import CategoriesScreen from "./screens/CategoriesScreen"
//import SubCategoriesScreen from "./screens/SubCategoriesScreen"
//import ProductScreen from "./screens/ProductScreen"
//import ProductDescScreen from "./screens/ProductDescScreen"
import "bootstrap/dist/css/bootstrap.min.css"
//import ReviewsScreen from "./screens/ReviewsScreen"
//import UserProfile from "./screens/UserProfile"
//import ShippingScreen from "./screens/ShippingScreen"
import ScrollToTop from "./components/ScrollToTop"
//import PaymentScreen from "./screens/PaymentScreen"
//import OrderScreen from "./screens/OrderScreen"
//import CartScreen from "./screens/CartScreen"
//import PlaceOrderScreen from "./screens/PlaceOrderScreen"
//import MyOrders from "./screens/MyOrders"
//import PlaceBookingScreen from "./screens/PlaceBookingScreen"
//import BookingScreen from "./screens/BookingScreen"
//import MyBookings from "./screens/MyBookings"
//import UserListScreen from "./screens/UserListScreen"
//import UserEditScreen from "./screens/UserEditScreen"
//import ProductListScreen from "./screens/ProductListScreen"
//import ProductEditScreen from "./screens/ProductEditScreen"
//import SearchScreen from "./screens/SearchScreen"
//import ServiceListScreen from "./screens/ServiceListScreen"
//import ServiceEditScreen from "./screens/ServiceEditScreen"
//import OrderListScreen from "./screens/OrderListScreen"
//import BookingListScreen from "./screens/BookingListScreen"
import Loadable from "react-loadable"
import Loader from "./components/Loader"

const Loading=()=><div><Loader /></div>;

const HomeScreen=Loadable({
	loader: () => import('./screens/HomeScreen'),
	loading: Loading
})

const AboutusScreen=Loadable({
	loader: () => import('./screens/AboutusScreen'),
	loading: Loading
})

const ContactusScreen=Loadable({
	loader: () => import('./screens/ContactusScreen'),
	loading: Loading
})

const LoginScreen=Loadable({
	loader: () => import('./screens/LoginScreen'),
	loading: Loading
})

const CategoriesScreen=Loadable({
	loader: () => import('./screens/CategoriesScreen'),
	loading: Loading
})

const SubCategoriesScreen=Loadable({
	loader: () => import('./screens/SubCategoriesScreen'),
	loading: Loading
})

const ProductScreen=Loadable({
	loader: () => import('./screens/ProductScreen'),
	loading: Loading
})

const ProductDescScreen=Loadable({
	loader: () => import('./screens/ProductDescScreen'),
	loading: Loading
})

const ReviewsScreen=Loadable({
	loader: () => import('./screens/ReviewsScreen'),
	loading: Loading
})

const UserProfile=Loadable({
	loader: () => import('./screens/UserProfile'),
	loading: Loading
})

const ShippingScreen=Loadable({
	loader: () => import('./screens/ShippingScreen'),
	loading: Loading
})

const PaymentScreen=Loadable({
	loader: () => import('./screens/PaymentScreen'),
	loading: Loading
})

const OrderScreen=Loadable({
	loader: () => import('./screens/OrderScreen'),
	loading: Loading
})

const CartScreen=Loadable({
	loader: () => import('./screens/CartScreen'),
	loading: Loading
})

const PlaceOrderScreen=Loadable({
	loader: () => import('./screens/PlaceOrderScreen'),
	loading: Loading
})

const MyOrders=Loadable({
	loader: () => import('./screens/MyOrders'),
	loading: Loading
})

const PlaceBookingScreen=Loadable({
	loader: () => import('./screens/PlaceBookingScreen'),
	loading: Loading
})

const BookingScreen=Loadable({
	loader: () => import('./screens/BookingScreen'),
	loading: Loading
})

const MyBookings=Loadable({
	loader: () => import('./screens/MyBookings'),
	loading: Loading
})

const UserListScreen=Loadable({
	loader: () => import('./screens/UserListScreen'),
	loading: Loading
})

const UserEditScreen=Loadable({
	loader: () => import('./screens/UserEditScreen'),
	loading: Loading
})

const ProductListScreen=Loadable({
	loader: () => import('./screens/ProductListScreen'),
	loading: Loading
})

const ProductEditScreen=Loadable({
	loader: () => import('./screens/ProductEditScreen'),
	loading: Loading
})

const SearchScreen=Loadable({
	loader: () => import('./screens/SearchScreen'),
	loading: Loading
})

const ServiceListScreen=Loadable({
	loader: () => import('./screens/ServiceListScreen'),
	loading: Loading
})

const ServiceEditScreen=Loadable({
	loader: () => import('./screens/ServiceEditScreen'),
	loading: Loading
})

const OrderListScreen=Loadable({
	loader: () => import('./screens/OrderListScreen'),
	loading: Loading
})

const BookingListScreen=Loadable({
	loader: () => import('./screens/BookingListScreen'),
	loading: Loading
})

function App() {
	return (
		<Router>
			<Navbar />
			<ScrollToTop />
			<main>
				<Switch>
					<Route path="/" component={HomeScreen} exact />
					<Route path="/aboutus" component={AboutusScreen} exact />
					<Route path="/contactus" component={ContactusScreen} exact />
					<Route path="/login" component={LoginScreen} exact />
					<Route path="/profile" component={UserProfile} exact />
					<Route path="/admin/userlist" component={UserListScreen} exact />
					<Route path="/admin/user/:id/edit" component={UserEditScreen} exact />
					<Route path="/search/:query" component={SearchScreen} exact />
					<Route
						path="/admin/productlist"
						component={ProductListScreen}
						exact
					/>
					<Route
						path="/admin/product/:id/edit"
						component={ProductEditScreen}
						exact
					/>
					<Route
						path="/admin/servicelist"
						component={ServiceListScreen}
						exact
					/>
					<Route
						path="/admin/service/:id/edit"
						component={ServiceEditScreen}
						exact
					/>
  				<Route path="/admin/orderList" component={OrderListScreen} exact />
					<Route path="/myOrders" component={MyOrders} exact />
					<Route
						path="/admin/bookingList"
						component={BookingListScreen}
						exact
					/>
					<Route path="/myBookings" component={MyBookings} exact />
					<Route path="/cart" component={CartScreen} exact />
					<Route
						path="/checkout/:type/shipping"
						component={ShippingScreen}
						exact
					/>
					<Route
						path="/checkout/:type/payment"
						component={PaymentScreen}
						exact
					/>
					<Route path="/checkout/order" component={PlaceOrderScreen} exact />
					<Route
						path="/checkout/booking"
						component={PlaceBookingScreen}
						exact
					/>
					<Route path="/checkout/order/:id" component={OrderScreen} exact />
					<Route path="/checkout/booking/:id" component={BookingScreen} exact />
					<Route path="/:type" component={CategoriesScreen} exact />
					<Route path="/:type/:catName" component={SubCategoriesScreen} exact />
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
				</Switch>
			</main>
			<Footer />
		</Router>
	)
}

export default App
