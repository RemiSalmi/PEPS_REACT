import React from 'react';
import { connect } from 'react-redux'

import { deleteUser, addUser, } from '../actions/userAction';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent'; 
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import Divider from '@material-ui/core/Divider';
var jwt = require('jsonwebtoken');

class AnswerAdmin extends React.Component{
    componentDidMount(){
    }

    constructor(props){
        super(props)
        this.state = {
            open: false,
            openDialog: false,
            dialogAction: "",
            userId: "",
            pseudo: "",
            password: "",
            password2: ""
        }
    }

    handleCreate = () => {
        let user = {"pseudo": this.state.pseudo, "password":this.state.password}
        console.log(user)
        this.props.dispatch(addUser(user,sessionStorage.getItem('token')))
        this.handleClose()

    }
    
    handleUpdate = () => {
        if(this.state.password === this.state.password2){
            //this.props.dispatch(updateUser(this.state.idUser,this.state.password,sessionStorage.getItem('token')))
        }
    };

    handleDelete = () =>{
        this.props.dispatch(deleteUser(this.state.userId,sessionStorage.getItem('token')))
        this.handleClose()
    };

    handleConfirmDelete = event => {
        this.setState({openDialog: true, dialogAction: "delete", userId: event.currentTarget.value})
    };

    handleConfirmUpdate = event => {
        let userObj = this.props.users.byId[event.currentTarget.value]
        this.setState({
            openDialog: true,
            dialogAction: "update",
            userId: event.currentTarget.value,
            pseudo: userObj.pseudo
        })
    };

    handleConfirmCreate = () => {
        this.setState({openDialog:true, dialogAction: "create"})
    }

    handleClose = () => {
        this.setState({ openDialog: false })
    };

    handleChangePseudo = event => {
        this.setState({pseudo: event.target.value})
    }

    handleChangePassword = event => {
        this.setState({password: event.target.value})
    }

    handleChangePassword2 = event => {
        this.setState({password2: event.target.value})
    }

    render(){

        const { users } = this.props;
        var dialogContent, dialogActions;



        

        if (this.state.dialogAction === "delete"){
            dialogContent = (
                <DialogContent>
                    <div>Are you sure to delete this user ?</div>
                </DialogContent>
            )

            dialogActions = (
                <DialogActions>
                    <Button variant="outlined" color="default" autoFocus onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button variant="outlined" color="secondary" autoFocus onClick={this.handleDelete}>
                        Delete
                    </Button>
                </DialogActions>
            )
        }else if(this.state.dialogAction === "update"){
            dialogContent = (
                <DialogContent>
                    <form>
                        <div className="form-group">
                            <label htmlFor="Password">Password</label>
                            <input type="text" className="form-control" id="password" type="password" onChange={this.handleChangePassword}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="Password2">Check Password</label>
                            <input type="text" className="form-control" id="password2" type="password" onChange={this.handleChangePassword2}/>
                        </div>
                    </form>
                </DialogContent>
            )

            dialogActions = (
                <DialogActions>
                    <Button variant="outlined" color="default" autoFocus onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button variant="outlined" color="primary" autoFocus onClick={this.handleUpdate}>
                        Update
                    </Button>
                </DialogActions>
            )
        }else if(this.state.dialogAction === "create"){
            dialogContent = (
                <DialogContent>
                    <form>
                        <div className="form-group">
                            <label htmlFor="Pseudo">Pseudo</label>
                            <input type="text" className="form-control" id="pseudo" placeholder="JohnDoe" onChange={this.handleChangePseudo}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="Password">Password</label>
                            <input type="text" className="form-control" id="password" type="password" onChange={this.handleChangePassword}/>
                        </div>
                    </form>
                </DialogContent>
            )
            dialogActions = (
                <DialogActions>
                    <Button variant="outlined" color="default" autoFocus onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button variant="outlined" color="primary" autoFocus onClick={this.handleCreate}>
                        Create
                    </Button>
                </DialogActions>
            )
        }

        return(
            <div>

                <Button variant="contained" color="default" endIcon={<AddIcon/>} onClick={this.handleConfirmCreate}>New User</Button>
                <List>
                    {users.allIds.length ? (
                        users.allIds.map(userId => {
                            return (
                                <div>
                                <ListItem >
                                    <ListItemText key={userId}>
                                    {users.byId[userId].pseudo}
                                    </ListItemText>
                                    <ListItemSecondaryAction>

                                        <Button aria-label="update" value={userId} onClick={this.handleConfirmUpdate}>Password</Button>
                 
                                        <IconButton edge="end" aria-label="delete" value={userId} onClick={this.handleConfirmDelete}>
                                            <DeleteIcon color="secondary"/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider/>
                                </div>
                            )
                        })
                    ) :(
                        <ListItem>
                            <ListItemText>No users to handle</ListItemText>
                        </ListItem>
                    )}
                </List>

                <Dialog open={this.state.openDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title"  maxWidth={'xl'}>
                    
                    {dialogContent}
                    {dialogActions}
                    
                </Dialog>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    users: state.users
});

export default connect(mapStateToProps)(AnswerAdmin);