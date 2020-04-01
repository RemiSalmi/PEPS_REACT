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
import Pagination from '@material-ui/lab/Pagination';

import Answer from './Answer'
import ListFilter from './ListFilter'
import Ordonneur from './Ordonneur';

class ListAnswer extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchAnswers());
    }

    constructor(props){
        super(props)
        this.state = {
            open: false,
            answer: "",
            filters : [],
            idCategory: this.props.categories.allIds[2],
            nbByPage : 10,
            nbPage : Math.ceil(this.props.remarks.byId[this.props.idRemark].answers.length/10),
            currentPage : 1
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true }) 
    };

    goToFirstPage = (e) => {
        this.setState({ currentPage: 1 })
    }


    refreshNbPage = () => {
        let size = this.props.remarks.byId[this.props.idRemark].answers.filter(idAnswer =>{
                                
            if (this.state.filters.includes(this.props.answers.byId[idAnswer].idCategory) || this.state.filters.length === 0){
                return idAnswer
            }
            return null
        }).length

        this.setState({nbPage : Math.ceil(size/this.state.nbByPage)})
    }

    addFilter = (filter) => {
        let newFilters = this.state.filters
        newFilters.push(filter)
        this.setState({filters : newFilters})
        this.goToFirstPage()
        this.refreshNbPage()
    }

    removeFilter = (filter) => {
        let newFilters = this.state.filters
        newFilters.splice(newFilters.indexOf(filter),1)
        this.setState({filters : newFilters})
        this.goToFirstPage()
        this.refreshNbPage()
    }

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

    handleChangePage = (event, value) => {
        this.setState({ currentPage: value })
        document.getElementsByClassName('section_title')[0].scrollIntoView(true)
    };

    ordonner = (ordre) => {

        switch (ordre) {
            case 1:
                //plus aimé
                let answers = this.props.remarks.byId[this.props.idRemark].answers
                let aimé = answers.map( id => { return [this.props.answers.byId[id].likes.length,this.props.answers.byId[id].idAnswer]})
                aimé.sort().reverse()
                this.props.remarks.byId[this.props.idRemark].answers=aimé.map(obj =>{return obj[1]})
                break;
            case 2:
                //plus recent
                this.props.remarks.byId[this.props.idRemark].answers.sort().reverse()
                break;
    
            default:
                break;
        }

        this.setState({ordre : ordre})
        this.goToFirstPage()
    }

    render() {
        const { error, loading, title, answers ,categories,remarks, idRemark} = this.props;
        const isConnected = this.props.auth.isConnected;
        if (error) {
          return <div>Error! {error.message}</div>;
        }
    
        if (loading) {
          return <div>Loading...</div>;
        }

        return(
            <section style={{height:"100%"}} id={title}>
                <h1 className={"section_title neu-card"}>{title}</h1>
                <div className={"container-fluid dspf"}>
                    <div>
                        <ListFilter type="answer" addFilter={this.addFilter} removeFilter={this.removeFilter}/>
                        <Ordonneur type="answer" ordonner={this.ordonner}/>

                    </div>
                    <div className="fullWidth" style={{marginRight : "15%"}}>
                    <ul>
                        {remarks.byId[idRemark].answers.length ? (
                            remarks.byId[idRemark].answers
                            .filter(idAnswer =>{
                                if(answers.byId[idAnswer] !== undefined){
                                    if (this.state.filters.includes(answers.byId[idAnswer].idCategory) || this.state.filters.length === 0){
                                        return idAnswer
                                    }
                                    return null
                                }else{
                                    return idAnswer
                                }
                                
                            })
                            .slice(this.state.nbByPage*this.state.currentPage-this.state.nbByPage,this.state.nbByPage*this.state.currentPage)
                            .map(idAnswer => {
                                return <li key={idAnswer}><Answer answer={answers.byId[idAnswer]} history={this.props.history}></Answer></li>
                            })
                        ) : (
                            <p>There is no answer for this remark, add one !</p>
                        )}    
                    </ul>
                    <Pagination count={this.state.nbPage === 0 ? (Math.ceil(this.props.remarks.byId[this.props.idRemark].answers.length/10)) :(this.state.nbPage)} page={this.state.currentPage} size="large" className="pagination-it" onChange={this.handleChangePage} />
                    </div>
                </div>
                {isConnected ? (
                    <Tooltip title={"New answer"} aria-label={"New answer"} arrow>
                        <Fab aria-label="add" className="fab fab_color" onClick={this.handleClickOpen}>
                            <AddIcon />
                        </Fab>
                        
                    </Tooltip>
                    ) : null
                } 
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