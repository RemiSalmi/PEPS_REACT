import React from 'react';
import { connect } from 'react-redux' 

import { like } from '../actions/answerAction';
import { dislike } from '../actions/answerAction';

var jwt = require('jsonwebtoken');

class Answer extends React.Component{
    

    constructor(props){
        super(props)
        this.state = { 
            likes: this.props.answer != null ? (this.props.answer.likes) : ([])
        }
        
    }

    handleLike = () => {
        
        if(this.props.auth.isConnected){
            let idUser = jwt.decode(sessionStorage.getItem('token')).idUser
            if(this.state.likes.includes(idUser)){
                console.log("dislike")
                this.props.dispatch(dislike(this.props.answer,sessionStorage.getItem('token')));
                let newLike = this.props.answer.likes
                while (newLike.includes(idUser)){
                    if (newLike[newLike.indexOf(idUser)] == idUser){
                        newLike.splice(newLike.indexOf(idUser),1)
                    }
                }
                this.setState({ likes: newLike })
                
            }else{
                console.log("like")
                this.props.dispatch(like(this.props.answer,sessionStorage.getItem('token'))); 
                
            }
        }else{
             this.props.history();
        }
    };

    render(){
        const {answer, users} = this.props
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
                                {jwt.decode(sessionStorage.getItem('token')) !== null ? (
                                        <div><i className="material-icons icon-mar-r-4" style={this.state.likes.includes(jwt.decode(sessionStorage.getItem('token')).idUser)  ? ({'color': '#a45cfb'}) : ({'color': 'gray'})}>hearing</i> <span>{answer != null ? (answer.likes.length) : ("...") }</span></div>
                                    ) : (
                                        <div><i className="material-icons icon-mar-r-4" style={{'color': 'gray'}}>hearing</i> <span>{answer != null ? (answer.likes.length) : ("...")}</span></div>
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
    auth: state.auth
});

export default connect(mapStateToProps)(Answer);