import React from 'react';
import { connect } from 'react-redux' 

import { like } from '../actions/answerAction';
import { dislike } from '../actions/answerAction';

var jwt = require('jsonwebtoken');

class Answer extends React.Component{
    

    constructor(props){
        super(props)
        
        
    }

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
                        <h4 className="card-title">
                            <p>&quot;{answer !== undefined ? answer.answer : ""}&quot;</p>
                        </h4>

                        <div className="card-stats">
                            <div className="author">
                                <div>
                                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=334&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" alt="..." className="avatar img-raised"/>
                                    <span>{answer !== undefined ? users.byId[answer.idUser].pseudo : ""}</span>
                                </div>
                            </div>
                            <div className="neu pointer" onClick={this.handleLike}>
                                {jwt.decode(sessionStorage.getItem('token')) !== null ?(
                                        this.props.answer !== undefined ? (
                                            <div><i className="material-icons icon-mar-r-4" style={answers.byId[this.props.answer.idAnswer].likes.includes(jwt.decode(sessionStorage.getItem('token')).idUser)  ? ({'color': '#a45cfb'}) : ({'color': 'gray'})}>hearing</i> <span>{answers.byId[this.props.answer.idAnswer].likes.length}</span></div>
                                        ):(
                                            null
                                        )
                                    ) : (
                                        this.props.answer !== undefined ? (
                                            <div><i className="material-icons icon-mar-r-4" style={{'color': 'gray'}}>hearing</i> <span>{answers.byId[this.props.answer.idAnswer].likes.length}</span></div>
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
    auth: state.auth
});

export default connect(mapStateToProps)(Answer);