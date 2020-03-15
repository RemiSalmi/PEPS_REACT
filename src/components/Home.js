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

    render(){
        return (
            <div>
                <Landing/>
                <ListRemark title={"Remarks"}/>
                <Footer/>
            </div>
         );
    }
    
}

export default connect()(Home);