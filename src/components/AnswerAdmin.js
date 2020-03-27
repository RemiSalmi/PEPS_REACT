import React from 'react';
import { connect } from 'react-redux'

import { deleteAnswer,addAnswer,updateAnswer } from '../actions/answerAction';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent'; 
import Button from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';

class AnswerAdmin extends React.Component{
    componentDidMount(){
        this.setState({answersList: this.props.answersList})
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
            answersList: [],
        }
    }


    handleCreate = () =>{
        let answer = {"answer": this.state.answer, "idCategory":this.state.idCategory, "idRemark":this.props.remarkId}
        this.props.dispatch(addAnswer(answer,sessionStorage.getItem('token')))
        this.handleClose()

    };
    
    handleUpdate = () => {
        let answer = {"idAnswer": this.state.answerId,"answer": this.state.answer, "idCategory":this.state.idCategory}
        this.props.dispatch(updateAnswer(answer,sessionStorage.getItem('token')))
        this.handleClose()
    };

    handleDelete = () =>{
        console.log(this.state.answersList)
        this.state.answersList.splice(this.props.answersList.indexOf(this.state.answerId),1)
        console.log(this.state.answersList)
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

        const { answers, categories, remarkId } = this.props;
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
                            <textarea className="form-control" id="Answer" rows="3" value={this.state.answer} onChange={this.handleChangeAnswer}></textarea>
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
            {remarkId !== undefined && (
                <Button variant="contained" color="default" endIcon={<AddIcon/>} onClick={this.handleConfirmCreate}>New Answer for this remark</Button>
            )}
            
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Answer ID</TableCell>
                        <TableCell align="right">Content</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Update</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.answersList.length ? (
                        this.state.answersList.map(answerId => (
                            <TableRow key={answerId}>
                            <TableCell component="th" scope="row">
                                {answerId}
                            </TableCell>
                            <TableCell align="right">{answers.byId[answerId].answer}</TableCell>
                            <TableCell align="right">{categories.byId[answers.byId[answerId].idCategory].lib}</TableCell>
                            <TableCell align="right">
                                <IconButton aria-label="update" value={answerId} onClick={this.handleConfirmUpdate}>
                                    <UpdateIcon color="primary" />
                                </IconButton>
                            </TableCell>
                            <TableCell align="right">
                                <IconButton edge="end" aria-label="delete" value={answerId} onClick={this.handleConfirmDelete}>
                                    <DeleteIcon color="secondary"/>
                                </IconButton>
                            </TableCell>
                            
                            </TableRow>
                        ))
                    ):(
                        <TableRow>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">No answers to handle</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    )
                    }
                    </TableBody>
                </Table>
                </TableContainer>

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