import React from 'react';
import { connect } from 'react-redux'

import Filter from './Filter'


class ListFilter extends React.Component{

    

    render(){
        const {categories} = this.props
        return (
                <div className="card neu-card" style={{padding : "20px",width:"300px"}}>
                    <h2>Categories</h2>
                    <div className="dspf" style={{flexDirection:"column"}}> 
                    {categories.allIds.map(idCategory => {
                        if(categories.byId[idCategory].type === this.props.type){
                            return <Filter idCategory={idCategory} key={idCategory} label={categories.byId[idCategory].lib} clickable={true} addFilter={this.props.addFilter} removeFilter={this.props.removeFilter} style={{marginBottom : "5px"}}/>
                        }else{
                            return null
                        }
                    })}
                    </div>
                    
                </div>
                
         );
    }
    
}

const mapStateToProps = state => ({
    categories: state.categories,
    loadingCat: state.categories.loading,
    errorCat: state.categories.error,
});
 
export default connect(mapStateToProps)(ListFilter);