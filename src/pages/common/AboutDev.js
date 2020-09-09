import React from 'react';
import FontAwesome from "react-fontawesome";
import logotop from "../../assets/images/logowhite.png"
import {Link} from "react-router-dom";
import iconBriefcase from "../../assets/images/status/icon-briefcase-dark.svg"
import iconBuilding from "../../assets/images/status/icon-building-dark.svg"
import iconPeople from "../../assets/images/status/icon-people-dark.svg"

function AboutDev({statistics}) {
    return (
        <div className="borderwrap aboutdev">

            <div className="col-lg-12 col-md-12 mx-auto text-left bg-primary">
                <h5 className="font-weight-bold text-white">About <img src={logotop} className="img-fluid" alt="logo" />  </h5>
            </div>

            <div className="col-lg-12 pr-0">
                <div className="d-flex">
                    <div>
                        <img src={iconBriefcase} />
                    </div>
                    <div className="col-11 pr-0 text-left">
                        <Link to="/jobs"><h6>{statistics && statistics.jobs}+ Jobs posted so far </h6></Link>
                        <hr/>
                    </div>
                </div>
                <div className="d-flex">
                    <div>
                        <img src={iconBuilding} />
                    </div>
                    <div className="col-11 pr-0 text-left">
                        <h6>{statistics && statistics.companies}+ Companies </h6>
                        <hr/>
                    </div>
                </div>
                <div className="d-flex">
                    <div>
                        <img src={iconPeople} />
                    </div>
                    <div className="col-11 pr-0 text-left">
                        <Link to="/talentdirectory"><h6>{statistics && statistics.dev}+ Tech Professionals </h6></Link>
                    </div>
                </div>
            </div>
                
        </div>
    );
}

export default AboutDev;
