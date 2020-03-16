import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Navigation from './Navigation';
import Register from './Register'


 
class Router extends React.Component{
    render(){
        return (      
            <BrowserRouter>
             <div>
               <Navigation />
                 <Switch>
                  <Route path="/" component={Home} exact/>
                  <Route path="/login" component={Login}/>
                  <Route path="/register" component={Register}/>
                </Switch>
             </div> 
           </BrowserRouter>
         );
    }
    
}
 
export default Router;