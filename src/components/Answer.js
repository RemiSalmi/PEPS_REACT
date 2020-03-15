import React from 'react';
import { connect } from 'react-redux' 

class Answer extends React.Component{

    componentDidMount(){
    }

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
                            <div className="stats ml-auto" style={{'color': '#a65fb3'}}>
                            <i className="fas fa-bullhorn icon-pad"></i> {answer !== undefined ? answer.likes.length : ""}
                            </div>
                        </div>
                    </div>
                </div>
        );
    }

}

const mapStateToProps = state => ({
    users: state.users
});

export default connect(mapStateToProps)(Answer);