import React, { forwardRef } from 'react';
import profile from "../../../assets/images/profile.png";
import { Link } from "react-router-dom";


const  MostActive = (({ companylist,refProp }) => {
    return (
        <div id="most-active-companies" className="container most-active" ref={refProp} >
            <div id="mostactivecompaniessect" className="row">
                <div className="text-center col-md-6 mx-auto mb-3">
                    <h2 className="font-weight-bold deepgray ">Most Active Companies</h2>
                </div>
            </div>
            <div className="most-active-card">

                {companylist && companylist.map((item, index) => {

                    let profileimg = profile;
                    if (item && item.fullpicture && item.fullpicture.length) {
                        profileimg = item.fullpicture;
                    }
                    return <div key={index} className="p-3 ">
                        <div className="card border-0">
                            <div className="card-body p-4">

                                <Link to={"/company/profile/" + item._id} className={"mt-3 font-weight-bold greyheader "}>
                                    <img src={profileimg} width="150" className="img-fluid" alt="Against Cyber Theft" />
                                </Link>

                            </div>
                        </div>
                    </div>
                })}


            </div>
            <div id="testimonialssect2"></div>
        </div>
    );
})

export default MostActive;
