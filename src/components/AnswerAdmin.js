import React from 'react';
import { connect } from 'react-redux'

import { deleteAnswer,addAnswer } from '../actions/answerAction';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent'; 
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
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
            answerId: "",
            answer: "",
            idCategory: 1,
        }
    }


    handleCreate = () =>{
        let answer = {"answer": this.state.answer, "idCategory":this.state.idCategory}
        console.log(answer)
        this.props.dispatch(addAnswer(answer,sessionStorage.getItem('token')))
        this.handleClose()

    };
    
    handleUpdate = () => {
        let answer = {"answer": this.state.answer, "idCategory":this.state.idCategory}
        console.log(answer)
        //this.props.dispatch(updateAnswer(answer,sessionStorage.getItem('token")))
        this.handleClose()
    };

    handleDelete = () =>{
        this.props.dispatch(deleteAnswer(this.state.answerId,sessionStorage.getItem('token')))
        this.handleClose()
    };

    handleConfirmDelete = event => {
        this.setState({openDialog: true, dialogAction: "delete", answerId: event.currentTarget.value})
    };

    handleConfirmUpdate = event => {
        let answerObj = this.props.answers.byId[event.currentTarget.value]
        this.setState({
            openDialog: true,
            dialogAction: "update",
            answerId: event.currentTarget.value,
            answer: answerObj.answer,
            idCategory: answerObj.idCategory
        })
    };

    handleConfirmCreate = () => {
        this.setState({openDialog:true, dialogAction: "create"})
    }

    handleClose = () => {
        this.setState({ openDialog: false })
    };

    handleChangeCategory = (e) => {
        this.setState({
            idCategory: e.target.value
        })
    }

    handleChangeAnswer = (e) => {
        this.setState({answer: e.target.value})
    }



    render(){

        const { answers, categories } = this.props;
        var dialogContent, dialogActions;

        
        if (this.state.dialogAction === "delete"){
            dialogContent = (
                <DialogContent>
                    <div>Are you sure to delete this answer ?</div>
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
                            <label htmlFor="Category">Category</label>
                            <select className="form-control selectpicker" data-style="btn btn-link" id="Category" onChange={this.handleChangeCategory}>
                                <option key={this.state.idCategory} value={this.state.idCategory}>{categories.byId[answers.byId[this.state.answerId].idCategory].lib}</option>
                                {
                                categories.allIds.map(idCategory => {
                                    if(categories.byId[idCategory].type === "answer"){
                                        return <option key={idCategory} value={categories.byId[idCategory].idCategory}>{categories.byId[idCategory].lib}</option>
                                    }else{
                                        return null
                                    }
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Answer">Answer</label>
                            <textarea className="form-control" id="Remark" rows="3" onChange={this.handleChangeAnswer}></textarea>
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
                            <label htmlFor="Category">Category</label>
                            <select className="form-control selectpicker" data-style="btn btn-link" id="Category" onChange={this.handleChangeCategory}>
                            <option>---</option>
                                {
                                categories.allIds.map(idCategory => {
                                    if(categories.byId[idCategory].type === "answer"){
                                        return <option key={idCategory} value={categories.byId[idCategory].idCategory}>{categories.byId[idCategory].lib}</option>
                                    }else{
                                        return null
                                    }
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Answer">Answer</label>
                            <textarea className="form-control" id="Remark" rows="3" onChange={this.handleChangeAnswer}></textarea>
                        </div>
                    </form>
                </DialogContent>
            )

            dialogActions = (
                <DialogActions>
                    <Button variant="outlined" color="default" autoFocus onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button variant="outlined" color="primary" autoFocus onClick={this.handleCreate} >
                        Create
                    </Button>
                </DialogActions>
            )
        }

        return(
            <div>
                
                <Button variant="contained" color="default" endIcon={<AddIcon/>} onClick={this.handleConfirmCreate}>New Answer</Button>
                <List>
                    {answers.allIds.length ? (
                        answers.allIds.map(answerId => {
                            return (
                                <div>
                                <ListItem >
                                    <ListItemText key={answerId}>
                                    {answers.byId[answerId].answer}
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <IconButton aria-label="update" value={answerId} onClick={this.handleConfirmUpdate}>
                                            <UpdateIcon color="primary" />
                                        </IconButton>

                                        <IconButton edge="end" aria-label="delete" value={answerId} onClick={this.handleConfirmDelete}>
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

                <Dialog open={this.state.openDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title"  maxWidth={'xl'}>
                
                    {dialogContent}
                    {dialogActions}

                    
                </Dialog>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    answers: state.answers,
    categories: state.categories,
});

export default connect(mapStateToProps)(AnswerAdmin);