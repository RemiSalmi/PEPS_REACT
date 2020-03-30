import React from 'react';
import { connect } from 'react-redux'
import Chip from '@material-ui/core/Chip';

class Ordonneur extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            clicked1 : false,
            clicked2 : false
        }
    }

    
    handleClick1 = (e) => {
        if (this.state.clicked1){
            this.setState({clicked1 : false})
            this.setState({clicked2 : false})
        }else{
            this.props.ordonner(1)
            this.setState({clicked1 : true})
            this.setState({clicked2 : false})
        }
    };
    handleClick2 = (e) => {
        if (this.state.clicked2){
            this.setState({clicked2 : false})
            this.setState({clicked1 : false})

        }else{
            this.props.ordonner(2)
            this.setState({clicked2 : true})
            this.setState({clicked1 : false})

        }
    };

    render(){
        return (
                <div className="card neu-card" style={{padding : "20px",width:"300px"}}>
                    <h2>Classer par</h2>
                    <div className="dspf" style={{flexDirection:"column"}}> 
                    
                    <Chip style={this.props.style} label="plus entendu" color={"primary"} variant={this.state.clicked1 ? ('default'):('outlined')} clickable={true} onClick={this.handleClick1} style={{marginBottom : "5px"}}/>
                    <Chip style={this.props.style} label="plus récent" color={"primary"} variant={this.state.clicked2 ? ('default'):('outlined')} clickable={true} onClick={this.handleClick2} style={{marginBottom : "5px"}}/>

                    </div>
                    
                </div>
                
         );
    }
    
}

const mapStateToProps = state => ({

});
 
export default connect(mapStateToProps)(Ordonneur);