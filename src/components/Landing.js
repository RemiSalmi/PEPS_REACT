import React from 'react';
import next from '../assets/img/next.png'
import circle from "../assets/img/circle.svg"
import circle1 from "../assets/img/main-banner1.png"
import circle2 from "../assets/img/main-banner12.png"
import circle3 from "../assets/img/main-banner3.png"

class Landing extends React.Component{

    scrollToRemark = () => {
        let remarks = document.getElementById("Remarks")
        remarks.scrollIntoView({behavior: "smooth", block: "start", inline: "center"})
    }

    render(){
        return (
            <section id="Landing" className="fullScreen">
                <div className={"container-fluid"}>
                    <div className={"row"} style={{height: '300px'}}>
                        <div className={"landing-circle"}>
                            <div className={"landing-circle1"}>
                                <img src={circle3} alt=""/>
                            </div>
                            <div className={"landing-circle2"} >
                                <img src={circle2} alt=""/>
                            </div>
                            <div className={"landing-circle3"}>
                                <img src={circle1} alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-sm-6 flex justify-center"}>
                            <img className={"logo"} src={circle} alt="logo"/>
                            <p className={"logo-text"}>PEPS</p>
                        </div>
                    </div>
                    
                    <div className={"row res-off"} style={{'paddingTop': '60px'}}>
                        <div className={"col-sm-6 flex justify-center"}>
                            <div className={"roundBtn"} onClick={this.scrollToRemark}>
                                <img className={"next"} src={next} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
         );
    }
    
}
 
export default Landing;