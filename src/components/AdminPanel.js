import React from 'react';
import { connect } from 'react-redux' 
import { fetchRemarks } from '../actions/remarkAction';
import { fetchAnswers } from '../actions/answerAction';
import { fetchUsers } from '../actions/userAction';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';


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
        }
        this.toggleRemarks = this.toggleRemarks.bind(this)
        this.toggleAnswers = this.toggleAnswers.bind(this)
        this.toggleUsers = this.toggleUsers.bind(this)
    }

    toggleRemarks(props){
        this.setState({handleRemarks: true, handleAnswers:false, handleUsers:false})
    }

    toggleAnswers(props){
        this.setState({handleRemarks: false, handleAnswers:true, handleUsers:false})
    }

    toggleUsers(props){
        console.log("here")
        this.setState({handleRemarks: false, handleAnswers:false, handleUsers:true})
    }


    render(){
        var {remarks, answers, users} = this.props;
        var adminContent, adminTitle;

        if (this.state.handleRemarks){
            adminTitle = <div>Administer all remarks</div>
            adminContent = (
                    <List>
                        {remarks.allIds.length ? (
                            remarks.allIds.map(remarkId => {
                                return (
                                    
                                    <div>
                                    <ListItem key={remarkId}>
                                        <ListItemText>
                                        {remarks.byId[remarkId].remark}
                                        </ListItemText>
                                        <ListItemSecondaryAction>
                                            <IconButton aria-label="update">
                                                <UpdateIcon color="primary"/>
                                            </IconButton>

                                            <IconButton edge="end" aria-label="delete">
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

                                        <IconButton edge="end" aria-label="delete">
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

                                        <IconButton edge="end" aria-label="delete">
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
            adminTitle = <div> Click to administer </div>
        }
        
        return(
            

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
        );
    }
}
const mapStateToProps = state => ({
    remarks: state.remarks,
    answers: state.answers,
    users: state.users,
});

export default connect(mapStateToProps)(AdminPanel);