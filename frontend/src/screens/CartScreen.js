import React, { useEffect } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { listCart } from '../actions/cartActions'
import Loader from '../components/Loader';
import Message from '../components/Message';
import img from '../images/baby.jpg'

const CartScreen = () => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const cartList = useSelector(state => state.cartList);
    const { loading, error, cart } = cartList;

    useEffect(() => {
        dispatch(listCart(userInfo._id))
    }, [dispatch]);

    let body = (
        <div className="container">
            <ListGroup>
                {cart.map(item => <div><ListGroup.Item><img src={img} style={{ height: "100px" }} />{item.qty}</ListGroup.Item><br /></div>)}
            </ListGroup>
        </div>
    );

    return (
        loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : body
    )
}

export default CartScreen
