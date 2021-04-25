import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem, Image } from 'react-bootstrap';
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
    }, [dispatch]);

    useEffect(() => {
        (async function fun() {
            for (let i = 0; i < cart.length; i++) {
                const item = await axios.get(`http://localhost:5000/api/products/categories/${cart[i].product}`)
                console.log(item.data);
                setcartArr(prevState => [...prevState, item.data]);
            }
        })();
    }, [cart]);

    /*
    if (!loading && !error) {
        useEffect(() => {
            (async function fun() {
                for (let i = 0; i < cart.length; i++) {
                    const item = await axios.get(`http://localhost:5000/api/products/categories/${cart[i].product}`)
                    console.log(item.data);
                    setcartArr(prevState=>[...prevState,item.data]);
                }
            })();
        }, [cart]);
    }
    */

    let body = (
        <div>
            <ListGroup>
                {cartArr.map(item => <div><ListGroup.Item><Image src={item.image} style={{ height: "150px" }} /></ListGroup.Item><br /></div>)}
            </ListGroup>
        </div>
    );

    return (
        <div className="container">
            <h1>Shopping Cart</h1>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : body}
        </div>
    )
}

export default CartScreen
