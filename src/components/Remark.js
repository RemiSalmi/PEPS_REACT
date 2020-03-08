import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import List from './List'
import { connect } from 'react-redux' 

class Remark extends React.Component{

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
                                <a href="#pablo">
                                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=334&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" alt="..." className={"avatar img-raised"}/>
                                    <span>{this.props.creator}</span>
                                </a>
                            </div>
                            <div className={"stats ml-auto"} style={{'color': '#a65fb3'}}>
                            <i className={"fas fa-bullhorn icon-pad"}></i> {this.props.nbEncounter}
                            <i className={"fas fa-comment icon-pad"}></i> {this.props.nbAnswer}
                            </div>
                        </div>
                    </div>
                </div>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth={'xl'}>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <List title="Answers" type="answer" answers={this.props.answers}></List>
                        </DialogContentText>
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

const mapStateToProps = (state) => {
    return {
        answers : state.answer.answers,
    }
}

export default connect(mapStateToProps)(Remark);