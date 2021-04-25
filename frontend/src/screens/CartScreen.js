import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { listCart } from '../actions/cartActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import img from '../images/baby.jpg'
import axios from 'axios';

const CartScreen = () => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const cartList = useSelector(state => state.cartList);
    const { loading, error, cart } = cartList;

    const [cartArr, setcartArr] = useState([]);

    useEffect(() => {
        dispatch(listCart(userInfo._id))
    }, [dispatch, userInfo, cart, cartArr]);

   // const cartArr1 = [];
    function pushToCartArr(id, qty)
    {
        axios.get(`http://localhost:5000/api/products/categories/${id}`)
        .then(item => setcartArr([...cartArr, item.data]))
        .catch(err => console.log("error"))
    }
    if(!loading && !error)
    {
        for(let i in cart)
        {
            pushToCartArr(cart[i].product, cart[i].qty)
            console.log(cart[i].product)
        }
    }

    let body = (
        <div className="container">
            <ListGroup>
                {cartArr.map(item => <div><ListGroup.Item>{item.name}</ListGroup.Item><br /></div>)}
            </ListGroup>
        </div>
    );

    return (
        loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : body
    )
}

export default CartScreen
