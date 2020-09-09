import React from 'react';
import benefits1 from "../../../assets/images/whyus/p1.png"
import benefits2 from "../../../assets/images/whyus/p2.png"
import benefits3 from "../../../assets/images/whyus/p3.png"
import strings from "../../../core/translate";


function WhyUs() {
    return (
        <div id="whyussection" style={{ marginTop: "84px" }}>
            <div className="container">
                <div className="row">
                    <div className="text-center col-md-6 mx-auto ">
                        <h2 className="font-weight-bold deepgray">{strings.why_us}</h2>
                    </div>
                </div>
                <div className="row d-flex justify-content-center text-center ">
                    <div className="p-3 col-lg-3 col-md-4">
                        <div className=" border-0">
                            <div className="card-body p-4">
                                <img src={benefits1} width="100" className="pt-4" alt="Against Cyber Theft" />
                                <h5 className="mt-3 deepgray" style={{ width: "70%", margin: "0 auto" }}>{strings.tech_focused_platform}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 col-lg-3 col-md-4">
                        <div className=" border-0">
                            <div className="card-body p-4">
                                <img src={benefits2} width="200" className="pt-4" alt="Against Cyber Theft" />
                                <h5 className="mt-5 pt-2 deepgray" style={{ width: "70%", margin: "0 auto" }}>{strings.free}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 col-lg-3 col-md-4">
                        <div className=" border-0">
                            <div className="card-body p-4">
                                <img src={benefits3} width="130" className="" alt="Against Cyber Theft" />
                                <h5 className="mt-5 deepgray" style={{ width: "100%", margin: "0 auto" }}>{strings.community_focused}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WhyUs;
