import React from 'react'
// import img1 from './products.jpg';
// import img2 from './services1.png';
import img1 from './home-image/products.jpg';
import img2 from './home-image/services1.png';

const Contents = () => {
    return (
        <div class="row">
            <div class="container">
                <img src={img1} class="image"></img>
                <div class="overlay">
                    <div class="text">PRODUCTS</div>
                </div>
            </div>
            <div class="container">
                <img src={img2} class="image"></img>
                <div class="overlay">
                    <div class="text">SERVICES</div>
                </div>
            </div>
        </div>
    )
}

export default Contents
