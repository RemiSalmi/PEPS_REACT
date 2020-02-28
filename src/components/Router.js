import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Navigation from './Navigation';
 
class Router extends React.Component{
    render(){
        return (      
            <BrowserRouter>
             <div>
               <Navigation />
                 <Switch>
                  <Route path="/" component={Home} exact/>
                  <Route path="/about" component={About}/>
                </Switch>
             </div> 
           </BrowserRouter>
         );
    }
    
}
 
export default Router;