import React from 'react'
import { Link } from 'react-router-dom';
import img1 from '../components/home-image/p2.jpg';
import img2 from '../components/home-image/services2.jpg';
import ImageSlider from '../components/ImageSlider'

const HomeScreen = () => {
    return (
    <>
    <ImageSlider/>
        <div class="wrapper">
            <div class="pic">
                <img class="image" src={img1} alt="products"/>
                <div class="middle">
                    <Link className="text" style={{ textDecoration: 'none' }} to="/categories">P R O D U C T S</Link>
                </div>
            </div>
            <div class="pic">
                <img class="image" src={img2} alt="services"/>
                <div class="middle">
                    <div class="text">S E R V I C E S</div>
                </div>
            </div>
        </div>    
    </>
    )
}

export default HomeScreen
