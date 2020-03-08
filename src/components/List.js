import React from 'react';
import Remark from './Remark'
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
                        <li><Remark location="Montpellier" dateCreation="03/03/2020" remark="Ma super remarque" creator="Rémi" nbEncounter="10" nbAnswer="4" dialogcontent="rem1"></Remark></li>
                        <li><Remark location="Paris" dateCreation="03/03/2020" remark="Ma super remarque 2" creator="Tom" nbEncounter="34" nbAnswer="8" dialogcontent="rem2"></Remark></li>
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