import React from 'react'

window.onload = function() {
  const  loginBtn = document.querySelectorAll(".login-btn"),
  registerBtn = document.querySelectorAll(".register-btn"),
  lostPassBtn = document.querySelectorAll(".lost-pass-btn"),
  box = document.querySelector(".box"),
  loginForm = document.querySelector(".login-form"),
  registerForm = document.querySelector(".register-form"),
  lostPasswordForm = document.querySelector(".lost-password-form");
  
  registerBtn.forEach((btn) =>{
  btn.addEventListener("click",() =>{
  box.classList.add("slide-active");
  registerForm.classList.remove("form-hidden");
  loginForm.classList.add("form-hidden");
  lostPasswordForm.classList.add("form-hidden");
  });
  });
  
  loginBtn.forEach((btn) =>{
  btn.addEventListener("click",() =>{
  box.classList.remove("slide-active");
  registerForm.classList.add("form-hidden");
  loginForm.classList.remove("form-hidden");
  lostPasswordForm.classList.add("form-hidden");
  });
  });
  
  lostPassBtn.forEach((btn) =>{
  btn.addEventListener("click",() =>{
  registerForm.classList.add("form-hidden");
  loginForm.classList.add("form-hidden");
  lostPasswordForm.classList.remove("form-hidden");
  });
  });
}
  

const LoginScreen = () => {
    return (
  <div class="login-page">
  <div class="box">
    <div class="left">
      <h3>Create Account</h3>
      <button type="button" class="register-btn">Register</button>
    </div>
    <div class="right">
      <h3>Have an Account ?</h3>
      <button type="button" class="login-btn">Login</button>
    </div>
    <div class="form">
       {/* <!-- Login form Start --> */}
       <div class="login-form">
         <h3 style={{fontWeight:'700'}}>Log In</h3>
         <div class="form-group">
           <input type="text" placeholder="Email Address*" class="form-control"/>
         </div>
         <div class="form-group">
           <input type="password" placeholder="Password*" class="form-control"/>
         </div>
         <div class="form-group">
           <label>
             <input type="checkbox"/> Remember Me
           </label>
         </div>
         <button type="button" class="submit-btn">Login</button>
         <p><a href="#" class="lost-pass-btn">Lost Your Password ?</a></p>
       </div>
       {/* <!-- Login form End --> */}

            {/* <!-- Register form Start --> */}
       <div class="register-form form-hidden">
         <h3 style={{fontWeight:'700'}}>Register</h3>
         <div class="form-group">
           <input type="text" placeholder="Name*" class="form-control"/>
         </div>
         <div class="form-group">
           <input type="text" placeholder="Email Address*" class="form-control"/>
         </div>
         <div class="form-group">
           <input type="password" placeholder="Password*" class="form-control"/>
         </div>
         <div class="form-group">
           <i style={{color:'red', fontWeight:'700'}}>Business Account*</i> &nbsp;
           <select>
             <option>NO</option>
             <option>YES</option>
           </select>
         </div>
         <button type="button" class="submit-btn">Register</button>
         <p><a href="#" class="login-btn">Already have an account?</a></p>
       </div>
       {/* <!-- Register form End --> */}

       {/* <!-- Lost Password form Start --> */}
       <div class="lost-password-form form-hidden">
         <h3>Lost Your Password ?</h3>
         <h5>You will receive a link to create a new password via email.</h5>
         
         <div class="form-group">
           <input type="text" placeholder="Email Address*" class="form-control"/>
         </div>
         
         
         <button type="button" class="submit-btn">Reset Password</button>
         <p><a href="#" class="login-btn">Login</a> | <a href="#" class="register-btn">Register</a></p>
       </div>
       {/* <!-- Lost Password form End --> */}

    </div>
  </div>
</div>

    )
}

export default LoginScreen
