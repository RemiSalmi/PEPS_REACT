import React from 'react';
import Remark from './Remark'
import Answer from './Answer'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { addRemark } from '../actions/remarkAction'
import { connect } from 'react-redux'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent'; 
import DialogTitle from '@material-ui/core/DialogTitle'; 
import Button from '@material-ui/core/Button';

class List extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            open: false,
            remark: "",
            location: "",
            category: 0,
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true }) 
    };
    
    handleChangeLocation = (e) => {
        this.setState({
            location: e.target.value
        })
    }

    handleChangeCategory = (e) => {
        this.setState({
            category: e.target.value
        })
    }

    handleChangeRemark = (e) => {
        this.setState({
            remark: e.target.value
        })
    }

    handleClose = () => {
        this.setState({ open: false })
        let remark = {"remark":this.state.remark, "idCategory" : this.state.category, "location" : this.state.location, "token": this.props.token}
        this.props.addRemark(remark)
    };

    handleClick = () =>{
        this.props.addRemark({"idRemark":8,"remark":"The remark","idCategory":2,"idUser":29,"location":"Montpellier","dateCreation":"2020-02-28T00:00:00.000Z"})
    }

    render(){
        return(
            <section id={this.props.title}>
                <h1 className={"section_title"}>{this.props.title}</h1>
                <div className={"container"}>
                    <ul>
                        {this.props.type === "remark" ? (
                            this.props.remarks.length ? (
                                this.props.remarks.map(remark => {
                                    return <li key={remark.idRemark}><Remark location={remark.location} dateCreation={remark.dateCreation} remark={remark.remark} creator={remark.idUser} nbEncounter="10" nbAnswer="4" dialogcontent="rem1"></Remark></li>
                                })
                            ) : (
                                <p>There is no remarks</p>
                            )
                            
                        ) : (
                            this.props.answers.length ? (
                                this.props.answers.map(answer => {
                                    return <li key={answer.idAnswer}><Answer  location={answer.location} dateCreation={answer.dateCreation} answer={answer.answer} creator={answer.idUser} nbLike="10"></Answer></li>
                                })
                            ) : (
                                <p>There is no answer for this remark</p>
                            )
                            
                        )}
                        
                        
                    </ul>
                </div>
                <Tooltip title={"New " + this.props.type} aria-label={"New " + this.props.type} arrow>
                    <Fab aria-label="add" className="fab fab_color" onClick={this.handleClickOpen}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth={'xl'}>
                    <DialogTitle id="form-dialog-title">New remark</DialogTitle>
                    <DialogContent>
                        <form>
                            <div className="form-group">
                                <label htmlFor="Location">Location</label>
                                <input type="text" className="form-control" id="location" placeholder="Paris" onChange={this.handleChangeLocation}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Category">Category</label>
                                <select className="form-control selectpicker" data-style="btn btn-link" id="Category" onChange={this.handleChangeCategory}>
                                    <option value="0">Fun</option>
                                    <option value="1">Angry</option>
                                    <option value="2">Cool</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Remark">Remark</label>
                                <textarea className="form-control" id="Remark" rows="3" onChange={this.handleChangeRemark}></textarea>
                            </div>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Create
                        </Button>
                        <Button onClick={this.handleClose} color="secondary" autoFocus>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token : state.auth.token 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addRemark: (remark) => dispatch(addRemark(remark))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(List);