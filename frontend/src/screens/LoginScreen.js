import React from 'react'
import {Link, link} from 'react-router-dom';
import './style.css';
import img1 from './images/facebook.png';
import img2 from './images/twitter.png';
import img3 from './images/linkedin.png';
import img4 from './images/instagram.png';

window.onload = function() {
    var el = document.querySelector('.img-btn')
    if(el) {
        el.addEventListener('click', function()
            {
                document.querySelector('.cont').classList.toggle('s-signup')
            }
        );
    }
}

const LoginScreen = () => {
    return (
    <div class="cont">
    <div class="form sign-in">
      <h2>Sign In</h2>
      <label>
        <span>Email Address</span>
        <input type="email" name="email"/>
      </label>
      <label>
        <span>Password</span>
        <input type="password" name="password"/>
      </label>
      <button class="submit" type="button">Sign In</button>
      <p class="forgot-pass">Forgot Password ?</p>

      <div class="social-media">
        <ul>  
          <li><img src={img1}/></li>
          <li><img src={img2}/></li>
          <li><img src={img3}/></li>
          <li><img src={img4}/></li>
        </ul>
      </div>
    </div>

    <div class="sub-cont">
      <div class="img">
        <div class="img-text m-up">
          <h2>New here?</h2>
          <p>Sign up and discover great amount of new opportunities!</p>
        </div>
        <div class="img-text m-in">
          <h2>One of us?</h2>
          <p>If you already has an account, just sign in. We've missed you!</p>
        </div>
        <div class="img-btn">
          <span class="m-up">Sign Up</span>
          <span class="m-in">Sign In</span>
        </div>
      </div>
      <div class="form sign-up">
        <h2>Sign Up</h2>
        <label>
          <span>Name</span>
          <input type="text"/>
        </label>
        <label>
          <span>Email</span>
          <input type="email"/>
        </label>
        <label>
          <span>Password</span>
          <input type="password"/>
        </label>
        <label>
          <span>Confirm Password</span>
          <input type="password"/>
        </label>
        <button type="button" class="submit">Sign Up Now</button>
      </div>
    </div>
  </div>

    )
}

export default LoginScreen
