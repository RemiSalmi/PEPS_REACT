import React from 'react';
import Landing from './Landing'
import List from './List'
import { connect } from 'react-redux' 
import { getAllRemarks } from '../actions/remarkAction'
import { getAllUsers } from '../actions/userAction'
 
class Home extends React.Component{
    componentDidMount(){
        this.props.getAllUsers()
        this.props.getAllRemarks()
        
        
    }

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
        users : state.user.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllRemarks: () => dispatch(getAllRemarks()),
        getAllUsers: () => dispatch(getAllUsers())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);