import React from 'react';

class Answer extends React.Component{

    render(){
        return(
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-category card-category-social">
                        </h5>
                        <h4 class="card-title">
                            <p>&quot;{this.props.answer}&quot;</p>
                        </h4>

                        <div class="card-stats">
                            <div class="author">
                                <div>
                                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=334&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" alt="..." class="avatar img-raised"/>
                                    <span>{this.props.creator}</span>
                                </div>
                            </div>
                            <div class="stats ml-auto" style={{'color': '#a65fb3'}}>
                            <i class="fas fa-bullhorn icon-pad"></i> {this.props.nbLike}
                            </div>
                        </div>
                    </div>
                </div>
        );
    }

}

export default Answer;