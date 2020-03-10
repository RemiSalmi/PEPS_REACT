import React from 'react';

class Answer extends React.Component{

    render(){
        return(
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-category card-category-social">
                        </h5>
                        <h4 className="card-title">
                            <p>&quot;{this.props.answer}&quot;</p>
                        </h4>

                        <div className="card-stats">
                            <div className="author">
                                <div>
                                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=334&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" alt="..." className="avatar img-raised"/>
                                    <span>{this.props.creator}</span>
                                </div>
                            </div>
                            <div className="stats ml-auto" style={{'color': '#a65fb3'}}>
                            <i className="fas fa-bullhorn icon-pad"></i> {this.props.nbLike}
                            </div>
                        </div>
                    </div>
                </div>
        );
    }

}

export default Answer;