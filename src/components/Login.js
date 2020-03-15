import React from 'react';
import axios from 'axios'
import { connect } from 'react-redux' 
import { checkLogin } from '../actions/authAction';

import Footer from './Footer'
import logo from '../assets/img/logo.svg'
 
class Login extends React.Component{

    componentDidMount(){
        this.props.dispatch(checkLogin());
    }

    constructor(props){
        super(props)
        this.state = {
            pseudo: "",
            pass: ""
        }
    }

    handleChangePseudo = (e) => {
        this.setState({
            pseudo: e.target.value
        })
    }

    handleChangePass = (e) => {
        this.setState({
            pass: e.target.value
        })
    }

    login = (e) =>{
        let credentials ={
            pseudo: this.state.pseudo,
            password: this.state.pass
        }
        e.preventDefault()
        axios.post("https://web-ios-api.herokuapp.com/users/login",credentials)
        .then(res => {
            sessionStorage.setItem('token',res.data.data.token)
            this.props.history.push('/')
        })
        .catch(err => {
            console.log(err)
        })
    }


    render(){
        console.log(this.props)
        return (
            <div style={{position: "absolute",height:"100%", width:"100%"}}>
                <section id="Login" className="">
                    <div className={"container"} >
                        <div className="row loginBox" >
                        <div className="card margin-center">
                            <div className="container loginFlex">
                                <img className="loginLogo" src={logo} alt="logo"/>
                                <h1>Login</h1>
                                <form>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="material-icons">account_circle</i>
                                        </span>
                                        </div>
                                        <input type="text" className="form-control" id="pseudo" placeholder="Pseudo" onChange={this.handleChangePseudo}/>
                                    </div>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="material-icons">lock</i>
                                        </span>
                                        </div>
                                        <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.handleChangePass}/>
                                    </div>

                                    <div className="form-group loginFlex">
                                    <button type="submit" className="btn btn-primary" style={{marginTop:"30px"}} onClick={this.login}>Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
                <Footer style={{position: "fixed",bottom:"0px", left:"0px", width:"100%"}}/>  
            </div>
         );
    }
    
}
 
export default connect()(Login);