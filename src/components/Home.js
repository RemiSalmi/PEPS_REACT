import React from 'react';
import Landing from './Landing'
import List from './List'
 
class Home extends React.Component{
    render(){
        return (
            <div>
                <Landing/>
                <List title="Remarks"/>
            </div>
         );
    }
    
}
 
export default Home;