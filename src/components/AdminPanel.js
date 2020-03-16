import React from 'react';
import { connect } from 'react-redux' 
import { fetchRemarks } from '../actions/remarkAction';

import Remark from './Remark'
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
        var {remarks} = this.props;
        console.log(remarks)
        var adminContent, adminTitle;
        if (this.state.handleRemarks){
            adminTitle = <div>Administer all remarks</div>
            adminContent = (
                <div className={"container"}>
                      <ul>
                        {remarks.allIds.length ? (
                            remarks.allIds.map(remarkId => {
                                return <li key={remarkId}><Remark remark={remarks.byId[remarkId]}></Remark></li>
                            })
                        ) : (
                            <p>There is no remarks</p>
                        )}    
                    </ul>
                </div> 
            )
        }else if (this.state.handleAnswers){
            adminTitle = <div>Administer all answers</div>
        }else if (this.state.handleUsers){
            adminTitle = <div>Administer all users</div>
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
});

export default connect(mapStateToProps)(AdminPanel);