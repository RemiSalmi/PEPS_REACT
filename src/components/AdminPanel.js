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

        const isAdmin = this.props.auth.isAdmin;
        var adminContent, adminTitle;

        if (this.state.handleRemarks){
            adminTitle = <div>Administer remarks</div>
            adminContent = (
                    <RemarkAdmin/>
            )

        }else if (this.state.handleAnswers){
            adminTitle = <span>Administer answers</span>
            adminContent = (
                <AnswerAdmin/>
            )

        }else if (this.state.handleUsers){
            adminTitle = <span>Administer users</span>
            adminContent = (
                <UserAdmin/>
            )

        }else if(this.state.handleCategories){
            adminTitle = <span>Administer categories</span>
            adminContent = (
                <CategoryAdmin/>
            )
        }else if(isAdmin===false){
            adminTitle = <div>Access Denied</div>
            adminContent = <div>Access Denied</div> 
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
                            <InputBase 
                                placeholder="Search…"
                            
                                inputProps={{ 'aria-label': 'search' }}
                            />
                            <SearchIcon />
                        </div>
                    </Toolbar>
                </AppBar>
                <Grid item xs={2}>
                    {isAdmin ? (
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
                    ):(
                        <div>Access Denied</div>
                    )}
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
    auth: state.auth
});

export default connect(mapStateToProps)(AdminPanel);

