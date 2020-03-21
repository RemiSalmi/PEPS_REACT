import React from 'react';
import { connect } from 'react-redux' 

import Chip from '@material-ui/core/Chip';


class Filter extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            clicked : false
        }
    }

    
    handleClick = (e) => {
        if (this.state.clicked){
            this.props.removeFilter(this.props.idCategory)
            this.setState({clicked : false})
        }else{
            this.props.addFilter(this.props.idCategory)
            this.setState({clicked : true})
        }
    };

    render(){
        return (   
            <Chip style={this.props.style} label={this.props.label} color={"primary"} variant={this.state.clicked ? ('default'):('outlined')} clickable={true} onClick={this.handleClick} />
         );
    }
    
}

const mapStateToProps = state => ({
    categories: state.categories,
    loadingCat: state.categories.loading,
    errorCat: state.categories.error,
});
 
export default connect(mapStateToProps)(Filter);