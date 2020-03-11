import React from 'react';
import Landing from './Landing'
import List from './List'
import Footer from './Footer'
import { connect } from 'react-redux' 
import { getAllRemarks } from '../actions/remarkAction'
import { getAllUsers } from '../actions/userAction'
import { getAllAnswers } from '../actions/answerAction';
 
class Home extends React.Component{
    componentDidMount(){
        this.props.getAllAnswers()
        this.props.getAllUsers()
        this.props.getAllRemarks()
        
        
    }

    render(){
        return (
            <div>
                <Landing/>
                <List title="Remarks" type="remark" remarks={this.props.remarks}/>
                <Footer/>
            </div>
         );
    }
    
}

const mapStateToProps = (state) => {
    return {
        remarks : state.remark.remarks,
        users : state.user.users, 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllRemarks: () => dispatch(getAllRemarks()),
        getAllUsers: () => dispatch(getAllUsers()),
        getAllAnswers: () => dispatch(getAllAnswers())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);