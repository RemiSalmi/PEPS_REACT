import React from 'react';
import { connect } from 'react-redux'

import { fetchUsers } from '../actions/userAction';
import { deleteRemark } from '../actions/remarkAction';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent'; 
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';

import Divider from '@material-ui/core/Divider';
var jwt = require('jsonwebtoken');

class RemarkAdmin extends React.Component{
    componentDidMount(){
        this.props.dispatch(fetchUsers());
    }

    constructor(props){
        super(props)
        this.state = {
            open: false,
            openDialog: false,
            dialogAction: "",
            remarkId: "",
        }
    }
    
    handleUpdate = () => {

    };

    handleDelete = () =>{
        this.props.dispatch(deleteRemark(this.state.remarkId,sessionStorage.getItem('token')))
        this.handleClose()
    };

    handleConfirmDelete = event => {
        this.setState({openDialog: true, dialogAction: "delete", remarkId: event.currentTarget.value})
    };

    handleConfirmUpdate = event => {
        this.setState({openDialog: true, dialogAction: "update" , remarkId: event.currentTarget.value})
    };

    handleClose = () => {
        this.setState({ openDialog: false })
    };

    render(){

        const { remark, users } = this.props;
        var dialogContent, dialogActionsUpdate, dialogActionsDelete;

        dialogActionsDelete = (
            <DialogActions>
                <Button variant="outlined" color="default" autoFocus onClick={this.handleClose}>
                    Cancel
                </Button>
                <Button variant="outlined" color="secondary" autoFocus onClick={this.handleDelete}>
                    Delete
                </Button>
            </DialogActions>
        )

        dialogActionsUpdate = (
            <DialogActions>
                <Button variant="outlined" color="default" autoFocus onClick={this.handleClose}>
                    Cancel
                </Button>
                <Button variant="outlined" color="primary" autoFocus >
                    Update
                </Button>
            </DialogActions>
        )

        if (this.state.dialogAction === "delete"){
            dialogContent = (
                <DialogContent>
                    <div>Are you sure to delete this remark ??</div>
                </DialogContent>
            )
        }else if(this.state.dialogAction === "update"){
            dialogContent = (
                <DialogContent>
                    <div>Update the remark</div>
                </DialogContent>
            )
        }

        return(
            <div>
                <ListItem >
                    <ListItemText key={remark.idRemark}>
                    {remark.remark}
                    </ListItemText>
                    <ListItemSecondaryAction>
                        <IconButton aria-label="update" value={remark.idRemark} onClick={this.handleConfirmUpdate}>
                            <UpdateIcon color="primary" />
                        </IconButton>

                        <IconButton edge="end" aria-label="delete" value={remark.idRemark} onClick={this.handleConfirmDelete}>
                            <DeleteIcon color="secondary"/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider/>

                <Dialog open={this.state.openDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title"  maxWidth={'xl'}>
                    <DialogTitle id="form-dialog-title">{this.state.dialogAction==="delete" ? ( <p>Verification</p> ):(<p>Update</p>)}</DialogTitle>
                
                    {dialogContent}

                    {this.state.dialogAction==="delete" ? (
                        dialogActionsDelete
                    ): (
                        dialogActionsUpdate
                    )}
                </Dialog>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    users: state.users,
    remarks : state.remarks,
});

export default connect(mapStateToProps)(RemarkAdmin);