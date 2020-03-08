import React from 'react';
import Landing from './Landing'
import List from './List'
 
class Home extends React.Component{
    render(){
        return (
            <div>
                <Landing/>
                <List title="Remarks" type="remark"/>
            </div>
         );
    }
    
}
 
export default Home;