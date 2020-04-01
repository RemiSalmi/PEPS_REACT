import React from 'react';
import { connect } from 'react-redux'
import { checkLogin } from '../actions/authAction'; 



import logo from '../assets/img/logo.svg'
 
import { NavLink } from 'react-router-dom';
var jwt = require('jsonwebtoken');

class Navigation extends React.Component{

    logout = (e) =>{
        sessionStorage.removeItem('token')
        this.props.dispatch(checkLogin());
        
    }
    
    render() {
        const isConnected = sessionStorage.getItem('token') !== null;
        var isAdmin = false
        if(isConnected){
            isAdmin = jwt.decode(sessionStorage.getItem('token')).role === "admin";
        }

        return (
            <nav>
                <div style={{display: "flex",flexDirection: "row",alignItems: "center"}}>
                    <img className={"logo-nav"} src={logo} alt="logo"/>
                    <NavLink to="/">Home</NavLink>
                    
                </div>
                
               {isConnected ? (
                   <div style={{display:"flex", marginRight:"10px",alignItems: "center"}}>
                        <NavLink className="login" to="/account">Profile</NavLink>
                        {isAdmin &&  <NavLink className="admin" to="/admin">Admin</NavLink> }
                        <NavLink onClick={this.logout} to="/">Logout</NavLink>
                   </div>
               ) :(
                <div style={{display:"flex", marginRight:"10px"}}>
                    <NavLink className="login" to="/login">Login</NavLink>
                    <NavLink to="/register">Register</NavLink>
                </div>
               )}
            </nav>
         );
    } 
}

const mapStateToProps = state => ({
    auth: state.auth,
});
 
export default connect(mapStateToProps)(Navigation);