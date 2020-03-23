import React from 'react';
import { connect } from 'react-redux'

import { addCategory, updateCategory, deleteCategory } from '../actions/categoryAction';

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
    }

    constructor(props){
        super(props)
        this.state = {
            open: false,
            openDialog: false,
            dialogAction: "",
            categoryId: "",
            lib:"",
            type:"",
        }
    }

    handleCreate = () => {
        let category = {"lib": this.state.lib, "type": this.state.type}
        console.log(category)
        this.props.dispatch(addCategory(category,sessionStorage.getItem('token')))
        this.handleClose()
    };
    
    handleUpdate = () => {
        let category = {"idCategory":this.state.categoryId, "lib": this.state.lib, "type": this.state.type}
        console.log(category)
        this.props.dispatch(updateCategory(category,sessionStorage.getItem('token')))
        this.handleClose()
    };

    handleDelete = () =>{
        console.log(this.state.categoryId)
        this.props.dispatch(deleteCategory(this.state.categoryId,sessionStorage.getItem('token')))
        this.handleClose()
    };

    handleConfirmDelete = event => {
        this.setState({openDialog: true, dialogAction: "delete", categoryId: event.currentTarget.value})
    };

    handleConfirmUpdate = event => {
        let categoryObj = this.props.categories.byId[event.currentTarget.value]
        this.setState({openDialog: true,
            dialogAction: "update",
            categoryId: event.currentTarget.value,
            lib: categoryObj.lib,
            type: categoryObj.type,
        })
    };

    handleConfirmCreate = () => {
        this.setState({openDialog:true, dialogAction: "create"})
    }

    handleClose = () => {
        this.setState({ openDialog: false })
    };

    handleChangeLib = event => {
        this.setState({ lib: event.currentTarget.value })
    }

    handleChangeType = event => {
        this.setState({ type: event.currentTarget.value })
    }

    render(){

        const { categories } = this.props;
        var dialogContent, dialogActions;

        

        

        if (this.state.dialogAction === "delete"){
            dialogContent = (
                <DialogContent>
                    <div>Are you sure to delete this category ?</div>
                </DialogContent>
            )

            dialogActions= (
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
                            <label htmlFor="Lib">Name</label>
                            <textarea className="form-control" id="Lib" value={this.state.lib} onChange={this.handleChangeLib}></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="Type">Type</label>
                            <select className="form-control selectpicker" data-style="btn btn-link" id="Type" onChange={this.handleChangeType}>
                            <option key={0} value={this.state.type}>{this.state.type}</option>
                            <option key={0} value="remark">remark</option>
                            <option key={1} value="answer">answer</option>
                            </select>
                        </div>
                    </form>
                </DialogContent>
            )

            dialogActions= (
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
                            <label htmlFor="Lib">Name</label>
                            <textarea className="form-control" id="Lib" onChange={this.handleChangeLib}></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="Type">Type</label>
                            <select className="form-control selectpicker" data-style="btn btn-link" id="Type" onChange={this.handleChangeType}>
                            <option>---</option>
                            <option key={0} value="remark">remark</option>
                            <option key={1} value="answer">answer</option>
                            </select>
                        </div>
                    </form>
                </DialogContent>
            )

            dialogActions= (
                <DialogActions>
                    <Button variant="outlined" color="default" autoFocus onClick={this.handleClose}>
                        Cancel
                    </Button>
                    <Button variant="outlined" color="primary" autoFocus onClick={this.handleCreate}>
                        Create
                    </Button>
                </DialogActions>
            )
        }

        return(

            <div>
            <Button variant="contained" color="default" endIcon={<AddIcon/>} onClick={this.handleConfirmCreate}>New Category</Button>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Category ID</TableCell>
                        <TableCell align="right">Lib</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Update</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {categories.allIds.length ? (
                        categories.allIds.map(categoryId => (
                            <TableRow key={categoryId}>
                            <TableCell component="th" scope="row">
                                {categoryId}
                            </TableCell>
                            <TableCell align="right">{categories.byId[categoryId].lib}</TableCell>
                            <TableCell align="right">{categories.byId[categoryId].type}</TableCell>
                            <TableCell align="right">
                                <IconButton aria-label="update" value={categoryId} onClick={this.handleConfirmUpdate}>
                                    <UpdateIcon color="primary" />
                                </IconButton>
                            </TableCell>
                            <TableCell align="right">
                                <IconButton edge="end" aria-label="delete" value={categoryId} onClick={this.handleConfirmDelete}>
                                    <DeleteIcon color="secondary"/>
                                </IconButton>
                            </TableCell>
                            
                            </TableRow>
                        ))
                    ):(
                        <TableRow>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">No categories to handle</TableCell>
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
    categories: state.categories
});

export default connect(mapStateToProps)(AnswerAdmin);