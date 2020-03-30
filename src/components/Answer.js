import React from 'react';
import { connect } from 'react-redux' 

import { like } from '../actions/answerAction';
import { dislike } from '../actions/answerAction';

var jwt = require('jsonwebtoken');

class Answer extends React.Component{
    
    handleLike = () => {
        
        if(this.props.auth.isConnected){
            let idUser = jwt.decode(sessionStorage.getItem('token')).idUser
            if(this.props.answers.byId[this.props.answer.idAnswer].likes.includes(idUser)){
                this.props.dispatch(dislike(this.props.answer,sessionStorage.getItem('token')));
                
                
            }else{
                this.props.dispatch(like(this.props.answer,sessionStorage.getItem('token'))); 
                
            }
        }else{
             this.props.history();
        }
    };

    render(){
        const {answer, users, answers} = this.props
        return(
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-category card-category-social">
                        </h5>
                        {this.props.answer !== undefined ? (
                            <span className="badge badge-info ml-auto" style={{height:"20px"}}>{this.props.categories.byId[answer.idCategory].lib}</span>
                        ) :(
                            null
                        )

                        }
                        <h4 className="card-title">
                            <p>&quot;{answer !== undefined ? answer.answer : ""}&quot;</p>
                        </h4>

                        <div className="card-stats" style={{justifyContent:"space-between"}}>
                            <div className="author">
                                <div>
                                    <img src="https://www.lajornadadeoriente.com.mx/wp-content/uploads/2018/05/default.jpg" alt="..." className="avatar img-raised"/>
                                    <span>{answer !== undefined ? users.byId[answer.idUser].pseudo : ""}</span>
                                </div>
                            </div>
                            <div className="neu pointer" style={{margin:"0px"}} onClick={this.handleLike}>
                                {jwt.decode(sessionStorage.getItem('token')) !== null ?(
                                        this.props.answer !== undefined ? (
                                            <div style={{display:"flex",alignItems:"center"}}><i className="material-icons icon-mar-r-4" style={answers.byId[this.props.answer.idAnswer].likes.includes(jwt.decode(sessionStorage.getItem('token')).idUser)  ? ({'color': '#a45cfb'}) : ({'color': 'gray'})}>check</i> <span>{answers.byId[this.props.answer.idAnswer].likes.length}</span></div>
                                        ):(
                                            null
                                        )
                                    ) : (
                                        this.props.answer !== undefined ? (
                                            <div style={{display:"flex",alignItems:"center"}}><i className="material-icons icon-mar-r-4" style={{'color': 'gray'}}>check</i> <span>{answers.byId[this.props.answer.idAnswer].likes.length}</span></div>
                                        ) : (
                                            null
                                        )
            
                                    )
                                }
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
        );
    }

}

const mapStateToProps = state => ({
    users: state.users,
    answers : state.answers,
    auth: state.auth,
    categories : state.categories
});

export default connect(mapStateToProps)(Answer);