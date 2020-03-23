import React from 'react';
import { connect } from 'react-redux'

import { fetchUsers } from '../actions/userAction';
import { deleteRemark, addRemarks, updateRemark } from '../actions/remarkAction';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent'; 
import Button from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import MessageIcon from '@material-ui/icons/Message';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';
import AnswerAdmin from './AnswerAdmin';

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
            remark:"",
            idCategory: 0,
            location:"",
        }
    }

    handleCreate = () => {
        let remark = {"remark":this.state.remark, "idCategory" : this.state.idCategory, "location" : this.state.location, "token": sessionStorage.getItem('token')}
        this.props.dispatch(addRemarks(remark));
        this.handleClose()
    };
    
    handleUpdate = () => {
        let remark = {"idRemark":this.state.remarkId, "remark":this.state.remark, "idCategory" : this.state.idCategory, "location":this.props.remarks.byId[this.state.remarkId].location}
        this.props.dispatch(updateRemark(remark,sessionStorage.getItem('token')))
        this.handleClose()
    };

    handleDelete = () =>{
        this.props.dispatch(deleteRemark(this.state.remarkId,sessionStorage.getItem('token')))
        this.handleClose()
    };

    handleConfirmDelete = event => {
        this.setState({openDialog: true, dialogAction: "delete", remarkId: event.currentTarget.value})
    };

    handleConfirmUpdate = event => {
        let remarkObj = this.props.remarks.byId[event.currentTarget.value]
        this.setState({
            openDialog: true,
            dialogAction: "update",
            remarkId: event.currentTarget.value,
            remark: remarkObj.remark,
            idCategory: remarkObj.idCategory,
        })
    };

    handleConfirmCreate = () => {
        this.setState({openDialog:true, dialogAction: "create"})
    }

    showRemarkAnswers = (event) => {
        this.setState({openDialog:true, dialogAction: "showAnswers", remarkId: event.currentTarget.value})
    }

    handleClose = () => {
        this.setState({ openDialog: false })
    };

    handleChangeLocation = (e) => {
        this.setState({
            location: e.target.value
        })
    }

    handleChangeCategory = (e) => {
        this.setState({
            idCategory: e.target.value
        })
    }

    handleChangeRemark = (e) => {
        this.setState({
            remark: e.target.value
        })
    }

    render(){

        const { remarks, categories } = this.props;
        var dialogContent, dialogActions;





        if (this.state.dialogAction === "delete"){
            dialogContent = (
                <DialogContent>
                    <div>Are you sure to delete this remark ??</div>
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
                                <option key={this.state.idCategory} value={this.state.idCategory}>{categories.byId[remarks.byId[this.state.remarkId].idCategory].lib}</option>
                                {
                                categories.allIds.map(idCategory => {
                                    if(categories.byId[idCategory].type === "remark"){
                                        return <option key={idCategory} value={categories.byId[idCategory].idCategory}>{categories.byId[idCategory].lib}</option>
                                    }else{
                                        return null
                                    }
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Remark">Remark</label>
                            <textarea className="form-control" id="Remark" rows="3" value={this.state.remark} onChange={this.handleChangeRemark}></textarea>
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
                            <label htmlFor="Location">Location</label>
                            <input type="text" className="form-control" id="location" placeholder="Paris" onChange={this.handleChangeLocation}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Category">Category</label>
                            <select className="form-control selectpicker" data-style="btn btn-link" id="Category" onChange={this.handleChangeCategory}>
                            <option>---</option>
                                {
                                categories.allIds.map(categoryId => {
                                    if(categories.byId[categoryId].type === "remark"){
                                        return <option key={categoryId} value={categories.byId[categoryId].idCategory}>{categories.byId[categoryId].lib}</option>
                                    }else{
                                        return null
                                    }
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Remark">Remark</label>
                            <textarea className="form-control" id="Remark" rows="3" onChange={this.handleChangeRemark}></textarea>
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
        }else if(this.state.dialogAction === "showAnswers"){
            console.log(remarks.byId[this.state.remarkId].answers)
            dialogContent = (
                <AnswerAdmin answersList={remarks.byId[this.state.remarkId].answers}/>
            )
        }

        return(
            <div>
                <Button variant="contained" color="default" endIcon={<AddIcon/>} onClick={this.handleConfirmCreate}>New Remark</Button>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Remark ID</TableCell>
                            <TableCell align="right">Content</TableCell>
                            <TableCell align="right">Category</TableCell>
                            <TableCell align="right">Answers</TableCell>
                            <TableCell align="right">Update</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {remarks.allIds.length ? (
                            remarks.allIds.map(remarkId => (
                                <TableRow key={remarkId}>
                                <TableCell component="th" scope="row">
                                    {remarkId}
                                </TableCell>
                                <TableCell align="right">{remarks.byId[remarkId].remark}</TableCell>
                                <TableCell align="right">{categories.byId[remarks.byId[remarkId].idCategory].lib}</TableCell>
                                <TableCell align="right">
                                    <Button value={remarkId} onClick={this.showRemarkAnswers}>
                                        <Badge badgeContent={remarks.byId[remarkId].answers.length} color="secondary" showZero >
                                            <MessageIcon/>
                                        </Badge>
                                    </Button>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="update" value={remarkId} onClick={this.handleConfirmUpdate}>
                                        <UpdateIcon color="primary" />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton edge="end" aria-label="delete" value={remarkId} onClick={this.handleConfirmDelete}>
                                        <DeleteIcon color="secondary"/>
                                    </IconButton>
                                </TableCell>
                                
                                </TableRow>
                            ))
                        ):(
                            <TableRow>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right">No remarks to handle</TableCell>
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
    users: state.users,
    remarks : state.remarks,
    categories: state.categories,
});

export default connect(mapStateToProps)(RemarkAdmin);