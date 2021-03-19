import React from 'react'
import img1 from './home-image/products.jpg';
import img2 from './home-image/services1.png';

const Main = () => {
    return (
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
    )
}

export default Main;
