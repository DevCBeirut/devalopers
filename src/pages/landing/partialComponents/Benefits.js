import React from 'react';
import benefits1 from "../../../assets/images/benefits/benefits1.png"
import benefits2 from "../../../assets/images/benefits/benefits2.png"
import benefits3 from "../../../assets/images/benefits/benefits3.png"


function Benefits() {
    return (
        <div className="py-5">
            <div className="container">
                <div className="row">
                    <div className="text-center col-md-6 mx-auto">
                        <h3>Key benefits of using BREACH to insure your coins</h3>
                    </div>
                </div>
                <div className="row d-flex justify-content-center text-center ">
                    <div className="p-3 col-lg-3 col-md-4">
                        <div className="card border-0">
                            <div className="card-body p-4">

                                <img src={benefits1} width="80" className="pt-4" alt="Against Cyber Theft" />
                                <h5 className="mt-3 font-weight-bold">Against Cyber Theft</h5>
                                <h6 className="my-3 benefits-details">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua</h6>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 col-lg-3 col-md-4">
                        <div className="card border-0">
                            <div className="card-body p-4">
                                <img src={benefits2} width="80" className="pt-4" alt="Against Cyber Theft" />
                                <h5 className="mt-3 font-weight-bold">Single policy</h5>
                                <h6 className="my-3 benefits-details">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua</h6>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 col-lg-3 col-md-4">
                        <div className="card border-0">
                            <div className="card-body p-4">
                                <img src={benefits3} width="80" className="pt-4" alt="Against Cyber Theft" />
                                <h5 className="mt-3 font-weight-bold">More than 100 coins</h5>
                                <h6 className="my-3 benefits-details">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Benefits;
