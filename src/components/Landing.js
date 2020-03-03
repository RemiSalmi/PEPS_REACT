import React from 'react';
import logo from '../assets/img/logo.svg'
import next from '../assets/img/next.png'
import circle from "../assets/img/circle.svg"
import Grid from '@material-ui/core/Grid';
import circle1 from "../assets/img/main-banner1.png"
import circle2 from "../assets/img/main-banner12.png"
import circle3 from "../assets/img/main-banner3.png"

class Landing extends React.Component{
    render(){
        return (
            <section>
                <div class="landing-circle">
                    <div class="landing-circle1">
                        <img src={circle3} alt=""/>
                    </div>
                    <div class="landing-circle2" >
                        <img src={circle2} alt=""/>
                    </div>
                    <div class="landing-circle3">
                        <img src={circle1} alt=""/>
                    </div>
                </div>
                
                <Grid container class="full-height dsp-flx-cl" spacing={6}>
                    <Grid container direction="column" item xs={6} justify="center" align="center" className="mr-t-190 align-ctr">
                        <img class="logo" src={circle} alt="logo"/>
                        <p>PEPS</p>
                    </Grid>
                </Grid>
            </section>
         );
    }
    
}
 
export default Landing;