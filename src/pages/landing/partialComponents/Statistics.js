import React from 'react';
import iconBriefcase from "../../../assets/images/status/icon-briefcase.png"
import iconBuilding from "../../../assets/images/status/icon-building.png"
import iconPeople from "../../../assets/images/status/icon-people.png"


function Statistics({ statistics }) {
    return (
        <div className="py--">

            <div className="bgstatus second-banner">

                <div className="container">
                    <div className="row justify-content-center text-left">
                        <div className="col-lg-4 col-md-4 ">
                            <div className="d-flex">
                                <div>
                                    <img src={iconBriefcase} />
                                </div>
                                <div className="col-10 text-left">
                                    <h3 className="text-white">{statistics && statistics.jobs}+</h3>
                                    <h5 className="text-white ">Jobs Posted So Far</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 ">
                            <div className="d-flex">
                                <div>
                                    <img src={iconBuilding} />
                                </div>
                                <div className="col-10 text-left">
                                    <h3 className="text-white">{statistics && statistics.companies}+</h3>
                                    <h5 className="text-white ">Companies</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 ">
                            <div className="d-flex">
                                <div>
                                    <img src={iconPeople} />
                                </div>
                                <div className="col-10 text-left">
                                    <h3 className="text-white">{statistics && statistics.dev}+</h3>
                                    <h5 className="text-white ">Tech Professionals</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="whyussection2"></div>
        </div>

    );
}

export default Statistics;
