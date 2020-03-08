import React from 'react';
import Landing from './Landing'
import List from './List'
import { connect } from 'react-redux' 
import { getAll } from '../actions/remarkAction'
 
class Home extends React.Component{
    componentDidMount(){
        this.props.getAll()
        
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAll: () => dispatch(getAll())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);