import React from 'react';

class Remark extends React.Component{
    render(){
        return(
            <div class="card bg-primary">
                <div class="card-body">
                    <h5 class="card-category card-category-social">
                    <i class="material-icons">place</i> {this.props.location}, {this.props.dateCreation}
                    </h5>
                    <h4 class="card-title">
                        <a href="#pablo">&quot;{this.props.remark}&quot;</a>
                    </h4>

                    <div class="card-stats">
                        <div class="author">
                            <a href="#pablo">
                                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=334&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" alt="..." class="avatar img-raised"/>
                                <span>{this.props.creator}</span>
                            </a>
                        </div>
                        <div class="stats ml-auto">
                        <i class="fas fa-bullhorn"></i> {this.props.nbEncounter} &#xB7;
                            <i class="material-icons">share</i> {this.props.nbAnswer}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Remark;