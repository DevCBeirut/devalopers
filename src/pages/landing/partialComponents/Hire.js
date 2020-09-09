import React from 'react';
import benefits1 from "../../../assets/images/hire/1.png";
import benefits2 from "../../../assets/images/hire/2.png";
import benefits3 from "../../../assets/images/hire/3.png";
import benefits4 from "../../../assets/images/hire/4.png";
import strings from "../../../core/translate";

function Hire() {
    return (
        <div className="py-- hire-banner">
            <div className="row">
                <div className="text-center col-md-6 mx-auto">
                    <h2 className="font-weight-bold pt-0 mt-0 deepgray">Hire</h2>
                </div>
            </div>


            <div className="bg-info">
                <div className="container">
                    <div className="row d-flex justify-content-center text-center ">
                        <div className="col-lg-3 col-md-3">
                            <div className="pad">
                                <img src={benefits1} width="47" className="" alt="Against Cyber Theft" />
                                <h5>{strings.hire_software} <br /> {strings.hire_developers}</h5>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3">
                            <div className="pad">
                                <img src={benefits2} width="47" className="" alt="Against Cyber Theft" />
                                <h5>{strings.hire_ui_ux} <br /> {strings.hire_experts} </h5>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3">
                            <div className="pad">
                                <img src={benefits3} width="47" className="" alt="Against Cyber Theft" />
                                <h5>{strings.hire_technical_product_projects_managers}</h5>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3">
                            <div className="pad">
                                <img src={benefits4} width="47" className="" alt="Against Cyber Theft" />
                                <h5>{strings.hire_data_scientists} <br /> {strings.hire_ai_ml_experts}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hire;
