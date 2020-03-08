import React from 'react';
import Landing from './Landing'
import List from './List'
import { connect } from 'react-redux' 
 
class Home extends React.Component{
    render(){
        return (
            <div>
                <Landing/>
                <List title="Remarks" type="remark" remarks={this.props.remarks}/>
            </div>
         );
    }
    
}

const mapStateToProps = (state) => {
    return {
        remarks : state.remark.remarks,
    }
}

export default connect(mapStateToProps)(Home);