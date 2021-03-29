import React from 'react'
import {Link, link} from 'react-router-dom';

const LoginScreen = () => {
    return (
        <div class="container" style={{marginTop:'100px',border:'1px solid black'}}>
        <div class="row">
            <div class="col-lg-12">
                <div class=" panel panel-primary">
                    <div class="panel-heading"><h3><b>Login</b></h3></div>
                    <div class="panel-body">
                        <form>
                            <p class="text-info">Login to make a purchase</p>
                            <div class="form-group">
                                <label for="email">Email :</label>
                                <input type="email" name="email" class="form-control"/>
                            </div>

                            <div class="form-group">
                                <label for="password">Password :</label>
                                <input type="password" name="password" class="form-control"/>
                            </div>

                            <input type="submit" value="Submit" class="btn btn-primary"/>
                        </form>
                    </div>

                    <div class="panel-footer">
                        <p>Don't have an account?<Link to="/signup"><b>Register</b></Link></p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    )
}

export default LoginScreen
