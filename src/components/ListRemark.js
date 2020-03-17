import React from 'react'
import { connect } from 'react-redux' 
import { fetchRemarks } from '../actions/remarkAction';
import { fetchCategories } from '../actions/categoryAction';
import { addRemarks } from '../actions/remarkAction';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent'; 
import DialogTitle from '@material-ui/core/DialogTitle'; 
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

import Remark from './Remark'

class ListRemark extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchRemarks());
        this.props.dispatch(fetchCategories());
    }

    constructor(props){
        super(props)
        this.state = {
            open: false,
            remark: "",
            location: "",
            category: 1,
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
    };

    handleClickCreate = () =>{
        this.setState({ open: false })
        let remark = {"remark":this.state.remark, "idCategory" : this.state.category, "location" : this.state.location, "token": sessionStorage.getItem('token')}
        this.props.dispatch(addRemarks(remark));
    }

    redirectionLogin = ()=>{
        console.log(this.props)
        this.props.history.push('/login')
    }

    render() {
        const { errorRemarks, loadingRemarks,loadingCat, remarks, title, categories } = this.props;
        const isConnected = this.props.auth.isConnected;

        if (errorRemarks) {
          return <div>Error! {errorRemarks.message}</div>;
        }
    
        if (loadingRemarks || loadingCat) {
          return <div>Loading...</div>;
        }

        return(
            <section id={title}>
                <h1 className={"section_title"}>{title}</h1>
                <div className={"container"}>
                    <ul>
                        {remarks.allIds.length ? (
                            remarks.allIds.map(remarkId => {
                                return <li key={remarkId}><Remark remark={remarks.byId[remarkId]} history={this.redirectionLogin}></Remark></li>
                            })
                        ) : (
                            <p>There is no remarks</p>
                        )}    
                    </ul>
                </div>

                {isConnected ? (
                   <Tooltip title={"New remark"} aria-label={"New remark"} arrow>
                        <Fab aria-label="add" className="fab fab_color" onClick={this.handleClickOpen}>
                            <AddIcon />
                        </Fab>
                    </Tooltip>
               ) : null
               }             
                

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
                                <textarea className="form-control" id="Remark" rows="3" onChange={this.handleChangeRemark}></textarea>
                            </div>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClickCreate} color="primary" autoFocus>
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

const mapStateToProps = state => ({
    remarks: state.remarks,
    categories: state.categories,
    loadingRemarks: state.remarks.loading,
    errorRemarks: state.remarks.error,
    loadingCat: state.categories.loading,
    errorCat: state.categories.error,
    auth: state.auth,
});

export default connect(mapStateToProps)(ListRemark)