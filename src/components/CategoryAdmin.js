import React from 'react';
import { connect } from 'react-redux'


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
            categoryId: "",
            lib:"",
            type:"",
        }
    }

    handleCreate = () => {
        let category = {"lib": this.state.lib, "type": this.state.type}
        console.log(category)
        //Create a category todo
        this.handleClose()
    };
    
    handleUpdate = () => {
        let category = {"lib": this.state.lib, "type": this.state.type}
        console.log(category)
        //Update a category todo
        this.handleClose()
    };

    handleDelete = () =>{
        console.log(this.state.categoryId)
        //Delete a category todo
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
                <List>
                    {categories.allIds.length ? (
                        categories.allIds.map(categoryId => {
                            return (
                                <div>
                                <ListItem >
                                    <ListItemText key={categoryId}>
                                    {categories.byId[categoryId].lib} type : {categories.byId[categoryId].type}
                                    </ListItemText>
                                    <ListItemSecondaryAction>

                                        <IconButton aria-label="update" value={categories.byId[categoryId].idCategory} onClick={this.handleConfirmUpdate}>
                                            <UpdateIcon color="primary" />
                                        </IconButton>
                 
                                        <IconButton edge="end" aria-label="delete" value={categories.byId[categoryId].idCategory} onClick={this.handleConfirmDelete}>
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
                            <ListItemText>No category to handle</ListItemText>
                        </ListItem>
                    )}
                </List>

                <Dialog open={this.state.openDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title"  maxWidth={'xl'}>
                    <DialogTitle id="form-dialog-title">{this.state.dialogAction==="delete" ? ( <p>Verification</p> ):(<p>Update</p>)}</DialogTitle>
                
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