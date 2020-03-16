import React from 'react';
import axios from 'axios'
import { connect } from 'react-redux' 

import Footer from './Footer'
import logo from '../assets/img/logo.svg'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
 
class Register extends React.Component{

    componentDidMount(){
    }

    constructor(props){
        super(props)
        this.state = {
            open : false,
            pseudo: "",
            pass: "",
            alert:""
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

    register = (e) =>{
        let credentials ={
            pseudo: this.state.pseudo,
            password: this.state.pass
        }
        e.preventDefault()
        if (credentials.pseudo !== "" && credentials.password !== ""){
            axios.post('https://web-ios-api.herokuapp.com/users',credentials)
            .then(response => {
                this.props.history.push('/login')
            })
            .catch(err =>{
                this.openAlert("Pseudo already taken")
            })
        }else{
            this.openAlert("Password and pseudo can't be empty")
        }
        
        
    }

    openAlert = (alert) => {
        this.setState({
            alert : alert,
            open: true
            
        })
      };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({
            open: false
        })
      };

    render(){
        console.log(this.props)
        return (
            <div style={{position: "absolute",height:"100%", width:"100%"}}>
                <section id="Login" className="">
                    <div className={"container"} >
                        <div className="row loginBox " >
                        <div className="card margin-center neu-card ">
                            <div className="container loginFlex">
                                <img className="loginLogo" src={logo} alt="logo"/>
                                <h1>Register</h1>
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
                                    <button type="submit" className="btn btn-primary" style={{marginTop:"30px"}} onClick={this.register}>Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        </div>
                    </div>

                    <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose} anchorOrigin={{ vertical:"top", horizontal:"center"}}>
                        <Alert onClose={this.handleClose} severity="error">
                            {this.state.alert}
                        </Alert>
                    </Snackbar>
                </section>
                <Footer style={{position: "fixed",bottom:"0px", left:"0px", width:"100%"}}/>  
            </div>
         );
    }
    
}
 
export default connect()(Register);