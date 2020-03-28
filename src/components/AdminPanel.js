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
import Button from '@material-ui/core/Button';

import RemarkAdmin from './RemarkAdmin';
import AnswerAdmin from './AnswerAdmin';
import UserAdmin from './UserAdmin';
import CategoryAdmin from './CategoryAdmin';
var jwt = require('jsonwebtoken');

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

        const isAdmin = jwt.decode(sessionStorage.getItem('token')).role === "admin";
        var adminContent;

        if (this.state.handleRemarks){
            adminContent = (
                    <RemarkAdmin/>
            )

        }else if (this.state.handleAnswers){
            adminContent = (
                <AnswerAdmin answersList={this.props.answers.allIds}/>
            )

        }else if (this.state.handleUsers){
            adminContent = (
                <UserAdmin/>
            )

        }else if(this.state.handleCategories){
            adminContent = (
                <CategoryAdmin/>
            )
        }else if(isAdmin===false){
            adminContent = <div>Access Denied</div> 
        }    
        
        
        return(
            
            <section id="adminPanel">

            <Grid container >
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
    answers: state.answers
});

export default connect(mapStateToProps)(AdminPanel);

