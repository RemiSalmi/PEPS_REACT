import React from 'react';
import { connect } from 'react-redux' 
import { fetchRemarks } from '../actions/remarkAction';
import { fetchAnswers } from '../actions/answerAction';
import { fetchUsers } from '../actions/userAction';
import { deleteRemark } from '../actions/remarkAction';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent'; 
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
var jwt = require('jsonwebtoken');

class AdminPanel extends React.Component{

    componentDidMount(){
        this.props.dispatch(fetchRemarks());
        this.props.dispatch(fetchAnswers());
        this.props.dispatch(fetchUsers());
    }

    constructor(props){
        super(props)
        this.state = {
            handleRemarks: false,
            handleAnswers: false,
            handleUsers: false,
            selectedTab: "",
            openDialog: false,
            dialogAction: "",
            objectId: "",
        }
        this.toggleRemarks = this.toggleRemarks.bind(this)
        this.toggleAnswers = this.toggleAnswers.bind(this)
        this.toggleUsers = this.toggleUsers.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    toggleRemarks(props){
        this.setState({handleRemarks: true, handleAnswers:false, handleUsers:false})
    }

    toggleAnswers(props){
        this.setState({handleRemarks: false, handleAnswers:true, handleUsers:false})
    }

    toggleUsers(props){
        this.setState({handleRemarks: false, handleAnswers:false, handleUsers:true})
    }

    handleDelete = () => {
        //Need check if Admin
        this.props.dispatch(deleteRemark(this.state.objectId,sessionStorage.getItem('token')))
        console.log("delete done")
        this.handleClose()
    }
    
    handleConfirmDelete = event => {
        this.setState({openDialog: true, dialogAction: "delete", objectId: event.currentTarget.value})
    };

    handleConfirmUpdate = event => {
        this.setState({openDialog: true, dialogAction: "update" , objectId: event.currentTarget.value})
    };

    handleClose(props){
        this.setState({ openDialog: false })
    };


    render(){
        var {remarks, answers, users} = this.props;
        var adminContent, adminTitle, dialogActions, dialogContent;

        if (this.state.handleRemarks){
            adminTitle = <div>Administer all remarks</div>
            adminContent = (
                    <List>
                        {remarks.allIds.length ? (
                            remarks.allIds.map(remarkId => {
                                return (
                                    
                                    <div>
                                    <ListItem >
                                        <ListItemText key={remarkId}>
                                        {remarks.byId[remarkId].remark}
                                        </ListItemText>
                                        <ListItemSecondaryAction>
                                            <IconButton aria-label="update" value={remarkId} onClick={this.handleConfirmUpdate}>
                                                <UpdateIcon color="primary" />
                                            </IconButton>

                                            <IconButton edge="end" aria-label="delete" value={remarkId} onClick={this.handleConfirmDelete}>
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
                                <ListItemText>No remarks to handle</ListItemText>
                            </ListItem>
                        )}
                    </List>
            )
            
            if (this.state.dialogAction === "delete"){
                dialogContent = (
                    <DialogContent>
                        <div>Are you sure to delete this remark ?</div>
                        <div>{this.state.objectId}</div>
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
                        <div>Update the remark</div>
                    </DialogContent>
                )

                dialogActions = (
                    <DialogActions>
                        <Button variant="outlined" color="default" autoFocus onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button variant="outlined" color="primary" autoFocus >
                            Update
                        </Button>
                    </DialogActions>
                )
            }



        }else if (this.state.handleAnswers){
            adminTitle = <div>Administer all answers</div>
            adminContent = (
                <List>
                    {answers.allIds.length ? (
                        answers.allIds.map(answerId => {
                            return (
                                
                                <div>
                                <ListItem key={answerId}>
                                    <ListItemText>
                                    {answers.byId[answerId].answer}
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <IconButton aria-label="update">
                                            <UpdateIcon color="primary"/>
                                        </IconButton>

                                        <IconButton edge="end" aria-label="delete" onClick={this.handleClickOpen}>
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
                            <ListItemText>No answers to handle</ListItemText>
                        </ListItem>
                        
                    )}
                </List>
            )
        }else if (this.state.handleUsers){
            adminTitle = <div>Administer all users</div>
            adminContent = (
                <List>
                    {users.allIds.length ? (
                        users.allIds.map(userId => {
                            return (
                                
                                <div>
                                <ListItem key={userId}>
                                    <ListItemText>
                                    {users.byId[userId].pseudo}
                                    </ListItemText>
                                    
                                    <ListItemSecondaryAction>
                                        <IconButton aria-label="update">
                                            <UpdateIcon color="primary"/>
                                        </IconButton>

                                        <IconButton edge="end" aria-label="delete" onClick={this.handleClickOpen}>
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
            )
        }else{
            adminTitle =  <span>Click to administer</span>
        }
        
        return(
            
            <section id="adminPanel">
            <Grid container id="adminPanel">
                <AppBar position="relative" >
                    <Toolbar>
                        <Typography  noWrap>
                        {adminTitle}
                        </Typography>
                        <div>
                            <InputBase 
                                placeholder="Search…"
                            
                                inputProps={{ 'aria-label': 'search' }}
                            />
                            <SearchIcon />
                        </div>
                    </Toolbar>
                </AppBar>
                <Grid item xs={2}>
                    <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    aria-label="Vertical tabs example"
                    >
                        <Tab label="Remarks" onClick={this.toggleRemarks} />
                        <Tab label="Answers"  onClick={this.toggleAnswers}/>
                        <Tab label="Users" onClick={this.toggleUsers}/>
                    </Tabs>
                </Grid>
                <Grid item xs={10}>

                    {adminContent}
                    
                </Grid>
            </Grid>

            <Dialog open={this.state.openDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title"  maxWidth={'xl'}>
                <DialogTitle id="form-dialog-title">{this.state.dialogAction==="delete" ? ( <p>Verification</p> ):(<p>Update</p>)}</DialogTitle>
                
                {dialogContent}
            
                {dialogActions}
            </Dialog>
            </section>
        );
    }
}
const mapStateToProps = state => ({
    remarks: state.remarks,
    answers: state.answers,
    users: state.users,
});

export default connect(mapStateToProps)(AdminPanel);