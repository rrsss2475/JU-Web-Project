import React from 'react'

const SignupScreen = () => {
    return (
        <div class="container" style={{marginTop:'100px'}}>
		<div class="row" style={{textAlign:'center'}}>
			<div class="col-lg-12">
				<h2><b>SIGN UP</b></h2>
				<form style={{marginTop:'40px'}}>  
                        <div class="form-group">
                            <input type="text" placeholder="Name" class="form-control" name="name" required/>
                        </div>
                        
                        <div class="form-group">
                            <input type="email" placeholder="Email" name="email" class="form-control" required pattern="[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$" title="Enter a valid email!"/>
                            <p class="text-warning"></p>
                        </div>                                                                          
                        
                        <div class="form-group">
                            <input type="password" placeholder="Password" class="form-control" name="password" required pattern=".{6,}" title="Password must contain at least 6 characters"/>                            
                            <p class="text-warning"></p>
                        </div>

                        <div class="form-group">
                        <label for="cars" style={{fontSize:'19px'}}>Buisness Account :&nbsp;</label>
                        <select id="cars" name="cars">
                            <option value="NO">NO</option>
                            <option value="YES">YES</option>
                        </select>
                        </div>

                        <div> 
                        <button type="submit" class="btn btn-primary">Submit</button>                    
                        </div>
                        
                        <div><p class="text-warning">                         
                            </p></div>
				</form>
			</div>
		</div>
	</div>
    )
}

export default SignupScreen
