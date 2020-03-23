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

    constructor(props){
        super(props)
        this.state = {
            open: false,
        }
    }
    

    handleClickOpen = () => {
        this.setState({ open: true }) 
    };
    
    handleClose = () => {
        this.setState({ open: false })
    };
    handleEncounter = () => {
        if(this.props.auth.isConnected){
            let idUser = jwt.decode(sessionStorage.getItem('token')).idUser
            if(this.props.remarks.byId[this.props.remark.idRemark].encounters.includes(jwt.decode(sessionStorage.getItem('token')).idUser)){
                console.log("desencounter")
                console.log(this.props.remark)
                this.props.dispatch(desencounter(this.props.remark,sessionStorage.getItem('token')));
            }else{
                console.log("encounter")
                this.props.dispatch(encounter(this.props.remark,sessionStorage.getItem('token')));
            }
        }else{
             this.props.history();
        }
    };

    render(){

        const { remark, users, remarks } = this.props;
        return(
            <div>
                <div className={"card neu-card"}>
                    <div className={"card-body"}>
                        <div className="dspf">
                        <h5 className={"card-category card-category-social"}>
                        <i className={"material-icons"}>place</i> {remark.location}, {remark.dateCreation}
                        </h5>
                        <span className="badge badge-info ml-auto" style={{height:"20px"}}>{this.props.categories.byId[remark.idCategory].lib}</span>
                        </div>
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
                                    <div><i className="material-icons icon-mar-r-4" style={remarks.byId[remark.idRemark].encounters.includes(jwt.decode(sessionStorage.getItem('token')).idUser)  ? ({'color': '#a45cfb'}) : ({'color': 'gray'})}>hearing</i> <span>{remarks.byId[remark.idRemark].encounters.length}</span></div>
                                ) : (
                                    <div><i className="material-icons icon-mar-r-4" style={{'color': 'gray'}}>hearing</i> <span>{remarks.byId[remark.idRemark].encounters.length}</span></div>
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
                            <ListAnswer title="Answers" idRemark = {remark.idRemark} answersList={remark.answers} history={this.props.history} categories={this.props.categories}></ListAnswer> 
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
    remarks : state.remarks,
    loading: state.users.loading,
    error: state.users.error,
    auth: state.auth,
    categories : state.categories
});

export default connect(mapStateToProps)(Remark);