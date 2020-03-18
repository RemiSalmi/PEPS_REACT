import React from 'react';
import { connect } from 'react-redux' 
import { checkLogin } from '../actions/authAction';

import Landing from './Landing'
import ListRemark from './ListRemark'
import Footer from './Footer'


class Home extends React.Component{
    componentDidMount(){
        this.props.dispatch(checkLogin());
    }

    redirectionLogin = ()=>{
        this.props.history.push('/login')
    }

    render(){
        return (
            <div>
                <Landing/>
                <ListRemark title={"Remarks"} history={this.redirectionLogin}/>
                <Footer/>
            </div>
         );
    }
    
}

export default connect()(Home);