import React from 'react'
import { Link } from 'react-router-dom';
import ImageSlider from '../components/ImageSlider'

const HomeScreen = () => {
    return (
    <>
    <ImageSlider/>
        <div class="wrapper">
            <div class="pic">
                <img class="image" src="https://firebasestorage.googleapis.com/v0/b/just-in-time-2fbd9.appspot.com/o/p2.jpg?alt=media&token=85b20ea9-a50b-4134-ac17-2236e3e38cad" alt="products"/>
                <div class="middle">
                    <Link className="text" style={{ textDecoration: 'none' }} to="/categories">PRODUCTS</Link>
                </div>
            </div>
            <div class="pic">
                <img class="image" src="https://firebasestorage.googleapis.com/v0/b/just-in-time-2fbd9.appspot.com/o/services2.jpg?alt=media&token=e2327c36-894f-476c-917b-cddcfe3aad07" alt="services"/>
                <div class="middle">
                    <div class="text">SERVICES</div>
                </div>
            </div>
        </div>    
    </>
    )
}

export default HomeScreen
