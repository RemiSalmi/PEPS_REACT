import React from 'react';
import { connect } from 'react-redux' 
import { fetchRemarks } from '../actions/remarkAction';
import { fetchAnswers } from '../actions/answerAction';
import { fetchUsers } from '../actions/userAction';
import { fetchCategories } from '../actions/categoryAction';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add'

import RemarkAdmin from './RemarkAdmin';
import AnswerAdmin from './AnswerAdmin';
import UserAdmin from './UserAdmin';
import CategoryAdmin from './CategoryAdmin';

class AdminPanel extends React.Component{

    componentDidMount(){
        this.props.dispatch(fetchRemarks());
        this.props.dispatch(fetchAnswers());
        this.props.dispatch(fetchUsers());
        this.props.dispatch(fetchCategories());
    }

    constructor(props){
        super(props)
        this.state = {
            handleRemarks: false,
            handleAnswers: false,
            handleUsers: false,
            handleCategories: false,
        }
        this.toggleRemarks = this.toggleRemarks.bind(this)
        this.toggleAnswers = this.toggleAnswers.bind(this)
        this.toggleUsers = this.toggleUsers.bind(this)
    }

    toggleRemarks = () => {
        this.setState({handleRemarks: true, handleAnswers:false, handleUsers:false, handleCategories:false})
    }

    toggleAnswers= () =>{
        this.setState({handleRemarks: false, handleAnswers:true, handleUsers:false, handleCategories:false})
    }

    toggleUsers = () =>{
        this.setState({handleRemarks: false, handleAnswers:false, handleUsers:true, handleCategories:false})
    }

    toggleCategories = () =>{
        this.setState({handleRemarks: false, handleAnswers:false, handleUsers:false, handleCategories:true})
    }


    render(){
        var {remarks, answers, users, categories} = this.props;
        var adminContent, adminTitle, createButton;

        if (this.state.handleRemarks){
            adminTitle = <div>Administer remarks</div>
            adminContent = (
                    <List>
                        {remarks.allIds.length ? (
                            remarks.allIds.map(remarkId => {
                                return (
                                    <RemarkAdmin remark={remarks.byId[remarkId]}></RemarkAdmin>
                                )
                            })
                        ) :(
                            <ListItem>
                                <ListItemText>No remarks to handle</ListItemText>
                            </ListItem>
                        )}
                    </List>
            )
            
            createButton = <Button variant="contained" color="default" endIcon={<AddIcon/>}>New Remark</Button>



        }else if (this.state.handleAnswers){
            adminTitle = <div>Administer answers</div>
            adminContent = (
                <List>
                    {answers.allIds.length ? (
                        answers.allIds.map(answerId => {
                            return (
                                <AnswerAdmin answer={answers.byId[answerId]}></AnswerAdmin>
                            )
                        })
                    ) :(
                        <ListItem>
                            <ListItemText>No answers to handle</ListItemText>
                        </ListItem>
                        
                    )}
                </List>
            )
            createButton = <Button>New Answer</Button>

        }else if (this.state.handleUsers){
            adminTitle = <div>Administer users</div>
            adminContent = (
                <List>
                    {users.allIds.length ? (
                        users.allIds.map(userId => {
                            return (
                               <UserAdmin user={users.byId[userId]}></UserAdmin>
                            )
                        })
                    ) :(
                        <ListItem>
                            <ListItemText>No users to handle</ListItemText>
                        </ListItem>
                    )}
                </List>
            )
            createButton = <Button>New User</Button>

        }else if(this.state.handleCategories){
            adminTitle = <div>Administer categories</div>
            adminContent = (
                <List>
                    {categories.allIds.length ? (
                        categories.allIds.map(categoryId => {
                            return (
                                <CategoryAdmin category={categories.byId[categoryId]}></CategoryAdmin>
                            )
                        })
                    ) :(
                        <ListItem>
                            <ListItemText>No users to handle</ListItemText>
                        </ListItem>
                    )}
                </List>
            )

            createButton = <Button>New Category</Button>
        }    
        else{
            adminTitle =  <span>Click to administer</span>
        }
        
        
        return(
            
            <section id="adminPanel">
            <Grid container >
                <AppBar position="relative" >
                    <Toolbar>
                        <Typography  noWrap>
                        {adminTitle}
                        </Typography>
                        <div>
                            {createButton}
                        </div>

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
                    
                    <List>
                        <ListItem onClick={this.toggleRemarks} key={0}>
                            <ListItemText>
                                <Button>REMARKS</Button>
                            </ListItemText>
                        </ListItem>

                        <ListItem onClick={this.toggleAnswers} key={1}>
                            <ListItemText>
                                <Button>Answers</Button>
                            </ListItemText>
                        </ListItem>

                        <ListItem onClick={this.toggleUsers} key={2}>
                            <ListItemText>
                                <Button>Users</Button>
                            </ListItemText>
                        </ListItem>

                        <ListItem onClick={this.toggleCategories} key={3}>
                            <ListItemText>
                                <Button>Categories</Button>
                            </ListItemText>
                        </ListItem>
                    </List>

                </Grid>
                <Grid item xs={10}>
                    {adminContent}
                </Grid>
            </Grid>

            
            </section>
        );
    }
}
const mapStateToProps = state => ({
    remarks: state.remarks,
    answers: state.answers,
    users: state.users,
    categories: state.categories,
});

export default connect(mapStateToProps)(AdminPanel);

