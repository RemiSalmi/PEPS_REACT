import React from 'react';
import { connect } from 'react-redux'

import { fetchUsers } from '../actions/userAction';
import { encounter } from '../actions/remarkAction';
import { desencounter } from '../actions/remarkAction';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent'; 
import ListAnswer from './ListAnswer'
import Button from '@material-ui/core/Button';

var jwt = require('jsonwebtoken');

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
    handleEncounter = () => {
        if(this.props.auth.isConnected){
            console.log("est connecté")
            if(this.props.remark.encounters.includes(jwt.decode(sessionStorage.getItem('token')).idUser)){
                console.log("deja encounter")
                this.props.dispatch(desencounter(this.props.remark,sessionStorage.getItem('token')));

            }else{
                console.log("pas encounter")
                this.props.dispatch(encounter(this.props.remark,sessionStorage.getItem('token')));
            }
            //
        }else{
            console.log("pas connecté")
        }
    };

    render(){

        const { remark, users } = this.props;

        return(
            <div>
                <div className={"card neu-card"}>
                    <div className={"card-body"}>
                        <h5 className={"card-category card-category-social"}>
                        <i className={"material-icons"}>place</i> {remark.location}, {remark.dateCreation}
                        </h5>
                        <h4 className={"card-title"}>
                        <p>&quot; {remark.remark} &quot;</p>
                        </h4>

                        <div className={"card-stats"}>
                            <div className={"author"}>
                                <div>
                                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=334&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" alt="..." className={"avatar img-raised"}/>
                                    <span>{users.byId[remark.idUser] !== undefined ? users.byId[remark.idUser].pseudo : ""}</span>
                                </div>
                            </div>
                            <div className={"stats ml-auto"} style={{'color': '#a65fb3'}}>

                            <div className="neu pointer" onClick={this.handleEncounter}>
                                {jwt.decode(sessionStorage.getItem('token')) !== null ? (
                                    <div><i className="material-icons icon-mar-r-4" style={remark.encounters.includes(jwt.decode(sessionStorage.getItem('token')).idUser)  ? ({'color': '#a45cfb'}) : ({'color': 'gray'})}>hearing</i> <span>{remark.encounters.length}</span></div>
                                ) : (
                                    <div><i className="material-icons icon-mar-r-4" style={{'color': 'gray'}}>hearing</i> <span>{remark.encounters.length}</span></div>
                                )}
                                
                            </div>
                            <div className="neu icon-mar pointer" onClick={this.handleClickOpen}>
                            <i className="material-icons icon-mar-r-4">message</i> {remark.answers.length}
                            </div>
                            
                            </div>
                        </div>
                    </div>
                </div>

                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth={'xl'}>
                    <DialogContent>
                            <ListAnswer title="Answers" answersList={remark.answers}></ListAnswer> 
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Fermer
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    users: state.users,
    loading: state.users.loading,
    error: state.users.error,
    auth: state.auth
});

export default connect(mapStateToProps)(Remark);