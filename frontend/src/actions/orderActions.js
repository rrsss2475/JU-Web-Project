import axios from "axios"
import { SAVE_ORDER_ITEMS } from "../constants/orderConstants"
export const saveOrderItems = (userInfo) => async (dispatch) => {
	try {
		const orderItems = []
		const cart = await axios.post("/api/users/cart", {
			userid: userInfo._id,
		})
		const cartItems = cart.data

		var totalPrice = 0
		for (var i = 0; i < cartItems.length; i++) {
			const { data } = await axios.get(
				`http://127.0.0.1:5000/api/products/categories/${cartItems[i].product}`
			)

			//console.log(data)
			const orderItem = {
				name: data.name,
				qty: cartItems[i].qty,
				weight: data.isWeighted ? cartItems[i].weight : null,
				image: data.image,
				price: data.isWeighted
					? data.price * cartItems[i].qty * cartItems[i].weight
					: data.price * cartItems[i].qty,
			}
			totalPrice += orderItem.price
			orderItems.push(orderItem)
		}
		const orderDetails = {
			orderItems: orderItems,
			totalPrice: totalPrice,
		}

		dispatch({ type: SAVE_ORDER_ITEMS, payload: orderDetails })

		localStorage.setItem("orderDetails", JSON.stringify(orderDetails))
	} catch (error) {
		console.log(error)
	}
}
