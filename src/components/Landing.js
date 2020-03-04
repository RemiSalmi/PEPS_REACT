import React from 'react';
import next from '../assets/img/next.png'
import circle from "../assets/img/circle.svg"
import circle1 from "../assets/img/main-banner1.png"
import circle2 from "../assets/img/main-banner12.png"
import circle3 from "../assets/img/main-banner3.png"

class Landing extends React.Component{
    render(){
        return (
            <section id="Landing">

                <div class="container-fluid">
                    <div class="row" style={{height: '300px'}}>
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
                    </div>
                    <div class="row">
                        <div class="col-sm-6 flex justify-center">
                            <img class="logo" src={circle} alt="logo"/>
                            <p class="logo-text">PEPS</p>
                        </div>
                    </div>
                    
                    <div class="row" style={{'padding-top': '60px'}}>
                        <div class="col-sm-6 flex justify-center">
                            <div class="roundBtn">
                                <img class="next" src={next} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
         );
    }
    
}
 
export default Landing;