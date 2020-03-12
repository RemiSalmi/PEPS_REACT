import React from 'react';
import { connect } from 'react-redux' 
import { fetchAnswers } from '../actions/answerAction';

class Answer extends React.Component{

    componentDidMount(){
        this.props.dispatch(fetchAnswers());
    }

    render(){

        const { idAnswer, answers, error, loading } = this.props

        if (error) {
            return <div>Error! {error.message}</div>;
        }
      
        if (loading) {
            return <div>Loading...</div>;
        }

        return(
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-category card-category-social">
                        </h5>
                        <h4 className="card-title">
                            <p>&quot;{answers.byId[idAnswer] !== undefined ? answers.byId[idAnswer].answer : ""}&quot;</p>
                        </h4>

                        <div className="card-stats">
                            <div className="author">
                                <div>
                                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=334&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" alt="..." className="avatar img-raised"/>
                                    <span>{answers.byId[idAnswer] !== undefined ? answers.byId[idAnswer].idUser : ""}</span>
                                </div>
                            </div>
                            <div className="stats ml-auto" style={{'color': '#a65fb3'}}>
                            <i className="fas fa-bullhorn icon-pad"></i> {answers.byId[idAnswer] !== undefined ? answers.byId[idAnswer].likes.length : ""}
                            </div>
                        </div>
                    </div>
                </div>
        );
    }

}

const mapStateToProps = state => ({
    answers: state.answers,
    loading: state.answers.loading,
    error: state.answers.error
});

export default connect(mapStateToProps)(Answer);