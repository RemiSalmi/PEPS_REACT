import React from 'react';
import { connect } from 'react-redux'

import { fetchUsers } from '../actions/userAction';
import { deleteRemark, addRemarks, updateRemark } from '../actions/remarkAction';

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

import AddIcon from '@material-ui/icons/Add'
import Divider from '@material-ui/core/Divider';
var jwt = require('jsonwebtoken');

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
            idCategory: 1,
            location:"",
        }
    }

    handleCreate = () => {
        let remark = {"remark":this.state.remark, "idCategory" : this.state.idCategory, "location" : this.state.location, "token": sessionStorage.getItem('token')}
        this.props.dispatch(addRemarks(remark));
        this.handleClose()
    };
    
    handleUpdate = () => {
        let remark = {"idRemark":this.state.remarkId, "remark":this.state.remark, "idCategory" : this.state.idCategory, "location" : this.state.location}
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
            location: remarkObj.location
        })
    };

    handleConfirmCreate = () => {
        this.setState({openDialog:true, dialogAction: "create"})
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
                            <label htmlFor="Location">Location</label>
                            <input type="text" className="form-control" value={this.state.location} id="location"  onChange={this.handleChangeLocation}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Category">Category</label>
                            <select className="form-control selectpicker" data-style="btn btn-link" id="Category" onChange={this.handleChangeCategory}>
                                <option key={this.state.idCategory} value={this.state.idCategory}>{categories.byId[remarks.byId[this.state.remarkId].idCategory].lib}</option>
                                {
                                categories.allIds.map(idCategory => {
                                    if(categories.byId[idCategory].type === "remark"){
                                        return <option key={idCategory} value={idCategory}>{categories.byId[idCategory].lib}</option>
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
                                {
                                categories.allIds.map(categoryId => {
                                    if(categories.byId[categoryId].type === "remark"){
                                        return <option key={categoryId} value={categoryId}>{categories.byId[categoryId].lib}</option>
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
        }

        return(
            <div>
                <Button variant="contained" color="default" endIcon={<AddIcon/>} onClick={this.handleConfirmCreate}>New Remark</Button>
                <List>
                    {remarks.allIds.length ? (
                        remarks.allIds.map(remarkId => {
                            return (
                                <div>
                                <ListItem >
                                    <ListItemText key={remarkId}>
                                    {remarks.byId[remarkId].remark}
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <IconButton aria-label="update" value={remarkId} onClick={this.handleConfirmUpdate}>
                                            <UpdateIcon color="primary" />
                                        </IconButton>

                                        <IconButton edge="end" aria-label="delete" value={remarkId} onClick={this.handleConfirmDelete}>
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