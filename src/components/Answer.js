import React from 'react';
import { connect } from 'react-redux' 

import { like } from '../actions/answerAction';
import { dislike } from '../actions/answerAction';

var jwt = require('jsonwebtoken');

class Answer extends React.Component{
    componentDidMount(){
    }

    state = {
        like: []
    }

    handleLike = () => {
        
        if(this.props.auth.isConnected){
            let idUser = jwt.decode(sessionStorage.getItem('token')).idUser
            if(this.props.answer.likes.includes(jwt.decode(sessionStorage.getItem('token')).idUser)){
                this.props.dispatch(dislike(this.props.answer,sessionStorage.getItem('token')));
                let newLike = this.props.answer.likes
                newLike.splice(newLike.indexOf(idUser),1)
                this.setState({ like: newLike }) 
            }else{
                this.props.dispatch(like(this.props.answer,sessionStorage.getItem('token')));
                let newLike = this.props.answer.likes
                newLike.push(idUser)
                this.setState({ like: newLike }) 
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
                            <div className="stats ml-auto" style={{'color': '#a65fb3'}} onClick={this.handleLike}>
                            <i className="fas fa-bullhorn icon-pad"></i> {answer !== undefined ? answer.likes.length : ""}
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