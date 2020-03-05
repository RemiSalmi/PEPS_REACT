import React from 'react';
import Remark from './Remark'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class List extends React.Component{

    render(){
        return(
            <section>
                <h1 class="section_title">{this.props.title}</h1>
                <div class="container">
                    <ul>
                        <li><Remark location="Montpellier" dateCreation="03/03/2020" remark="Ma super remarque" creator="Rémi" nbEncounter="10" nbAnswer="4"></Remark></li>
                        <li><Remark location="Paris" dateCreation="03/03/2020" remark="Ma super remarque 2" creator="Tom" nbEncounter="34" nbAnswer="8"></Remark></li>
                    </ul>
                </div>
                <Fab color="primary" aria-label="add" className="fab">
                    <AddIcon />
                </Fab>
            </section>
        );
    }
}
export default List;