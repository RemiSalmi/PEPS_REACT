import React from 'react';
import Remark from './Remark'

class List extends React.Component{

    render(){
        return(
            <section>
                <h1>{this.props.title}</h1>
                <div class="container">
                    <ul>
                        <li><Remark location="Montpellier" dateCreation="03/03/2020" remark="Ma super remarque" creator="Rémi" nbEncounter="10" nbAnswer="4"></Remark></li>
                        <li><Remark location="Paris" dateCreation="03/03/2020" remark="Ma super remarque 2" creator="Tom" nbEncounter="34" nbAnswer="8"></Remark></li>
                    </ul>
                </div>
            </section>
        );
    }
}
export default List;