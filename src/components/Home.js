import React from 'react';

import Landing from './Landing'
import Footer from './Footer'
import ListRemark from './ListRemark'

class Home extends React.Component{

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

export default (Home);