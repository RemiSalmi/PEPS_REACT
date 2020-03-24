import React from 'react'
import { connect } from 'react-redux' 
import { fetchAnswers } from '../actions/answerAction';
import { addAnswer } from '../actions/answerAction';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent'; 
import DialogTitle from '@material-ui/core/DialogTitle'; 
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

import Answer from './Answer'

class ListAnswer extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchAnswers());
    }

    constructor(props){
        super(props)
        this.state = {
            open: false,
            answer: "",
            idCategory: this.props.categories.allIds[2],
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true }) 
    };

    handleChangeCategory = (e) => {
        this.setState({
            idCategory: e.target.value
        })
    }

    handleChangeAnswer = (e) => {
        this.setState({
            answer: e.target.value
        })
    }

    handleClose = () => {
        this.setState({ open: false })
    };

    handleClickCreate = () =>{
        let answer = {"answer": this.state.answer, "idCategory":this.state.idCategory,"idRemark":this.props.idRemark}
        this.props.dispatch(addAnswer(answer,sessionStorage.getItem('token')))
        this.handleClose()
    }

    render() {
        const { error, loading, title, answers ,categories,remarks, idRemark} = this.props;
        if (error) {
          return <div>Error! {error.message}</div>;
        }
    
        if (loading) {
          return <div>Loading...</div>;
        }

        return(
            <section id={title}>
                <h1 className={"section_title"}>{title}</h1>
                <div className={"container"}>
                    <ul>
                        {remarks.byId[idRemark].answers.length ? (
                            remarks.byId[idRemark].answers.map(idAnswer => {
                                return <li key={idAnswer}><Answer answer={answers.byId[idAnswer]} history={this.props.history}></Answer></li>
                            })
                        ) : (
                            <p>There is no answer for this remark, add one !</p>
                        )}    
                    </ul>
                </div>
                <Tooltip title={"New answer"} aria-label={"New answer"} arrow>
                    <Fab aria-label="add" className="fab fab_color" onClick={this.handleClickOpen}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth={'xl'}>
                    <DialogTitle id="form-dialog-title">New Answer</DialogTitle>
                    <DialogContent>
                        <form>
                            <div className="form-group">
                                <label htmlFor="Category">Category</label>
                                <select className="form-control selectpicker" data-style="btn btn-link" id="Category" onChange={this.handleChangeCategory}>
                                    {categories.allIds.filter(categoryId => categories.byId[categoryId].type === "answer").map(categoryId => {
                                        return (
                                            <option key={categoryId} value={categoryId}>{categories.byId[categoryId].lib}</option>
                                        )   
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Remark">Answer</label>
                                <textarea className="form-control" id="Remark" rows="3" onChange={this.handleChangeAnswer}></textarea>
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
    answers: state.answers,
    remarks: state.remarks,
    loading: state.answers.loading,
    error: state.answers.error,
    auth: state.auth
});

export default connect(mapStateToProps)(ListAnswer)