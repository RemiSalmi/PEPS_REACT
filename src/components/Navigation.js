import React from 'react';
import { connect } from 'react-redux'
import { checkLogin } from '../actions/authAction'; 



import logo from '../assets/img/logo.svg'
 
import { NavLink } from 'react-router-dom';
 
class Navigation extends React.Component{

    logout = (e) =>{
        sessionStorage.removeItem('token')
        this.props.dispatch(checkLogin());
    }
    
    render() {
        const isConnected = this.props.auth.isConnected;
        return (
            <nav>
                <div>
                    <img className={"logo-nav"} src={logo} alt="logo"/>
                    <NavLink to="/">Home</NavLink>
                    
                </div>
                
               {isConnected ? (
                   <div style={{display:"flex", marginRight:"10px"}}>
                        <NavLink className="login" to="/">My account</NavLink>
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