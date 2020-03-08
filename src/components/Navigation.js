import React from 'react';
import logo from '../assets/img/logo.svg'
 
import { NavLink } from 'react-router-dom';
 
class Navigation extends React.Component{
    render() {
        return (
            <nav>
                <img className={"logo-nav"} src={logo} alt="logo"/>
               <NavLink to="/">Home</NavLink>
               <NavLink to="/remark">Login</NavLink>
               <NavLink to="/remark">Register</NavLink>
            </nav>
         );
    }
    
}
 
export default Navigation;