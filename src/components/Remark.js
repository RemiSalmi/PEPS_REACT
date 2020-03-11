import React from 'react';
import { connect } from 'react-redux'

import { fetchUsers } from '../actions/userAction';

class Remark extends React.Component{
    componentDidMount(){
        this.props.dispatch(fetchUsers());
    }

    state = {
        open: false
    }

    handleClickOpen = () => {
        this.setState({ open: true }) 
    };
    
    handleClose = () => {
        this.setState({ open: false })
    };

    render(){
        return(
            <div>
                <div className={"card"} onClick={this.handleClickOpen}>
                    <div className={"card-body"}>
                        <h5 className={"card-category card-category-social"}>
                        <i className={"material-icons"}>place</i> {this.props.location}, {this.props.dateCreation}
                        </h5>
                        <h4 className={"card-title"}>
                        <p>&quot; {this.props.remark} &quot;</p>
                        </h4>

                        <div className={"card-stats"}>
                            <div className={"author"}>
                                <div>
                                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=334&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" alt="..." className={"avatar img-raised"}/>
                                    <span>{this.props.users.byId[this.props.creator] !== undefined ? this.props.users.byId[this.props.creator].pseudo : ""}</span>
                                </div>
                            </div>
                            <div className={"stats ml-auto"} style={{'color': '#a65fb3'}}>
                            <i className={"fas fa-bullhorn icon-pad"}></i> {this.props.nbEncounter}
                            <i className={"fas fa-comment icon-pad"}></i> {this.props.nbAnswer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    users: state.users,
    loading: state.users.loading,
    error: state.users.error
});

export default connect(mapStateToProps)(Remark);