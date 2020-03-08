import React from 'react';
import Remark from './Remark'
import Answer from './Answer'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { addRemark } from '../actions/remarkAction'
import { connect } from 'react-redux' 

class List extends React.Component{

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
                    <Fab aria-label="add" className="fab fab_color" onClick={this.handleClick}>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </section>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addRemark: (remark) => dispatch(addRemark(remark))
    }
}

export default connect(null,mapDispatchToProps)(List);