import React from 'react'

import img1 from '../components/home-image/products.jpg';
import img2 from '../components/home-image/services1.png';

const HomeScreen = () => {
    return (
        <div>
            <div>
            <div class="container">
                <img src={img1} class="image"/>
                <div class="middle">
                    <div class="text">PRODUCTS</div>
                </div>
            </div>

            <div class="container">
                <img src={img2} class="image"/>
                <div class="middle">
                    <div class="text2">SERVICES</div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default HomeScreen
