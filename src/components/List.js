import React from 'react';
import Remark from './Remark'
import Answer from './Answer'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

class List extends React.Component{

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
                    <Fab aria-label="add" className="fab fab_color">
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </section>
        );
    }
}
export default List;