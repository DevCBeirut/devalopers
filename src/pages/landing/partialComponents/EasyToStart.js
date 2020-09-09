import React from 'react';
import easytostart from "../../../assets/images/easytostart.png"
import { Link } from "react-router-dom";


function EasyToStart() {
    return (
        <div className="py-5">
            <div className="container">
                <div className="row">
                    <div className="text-center col-md-6 mx-auto">
                        <h2 className="font-weight-bold deepgray ">Itʼs Easy to Start</h2>
                    </div>
                </div>
                <div className="row d-flex justify-content-center text-center ">
                    <div className="p-12 col-lg-12 col-md-12">
                        <div className=" border-0">
                            <div className="card-body p-12 d-none d-md-block">
                                <img src={easytostart} className="pt-4 img-fluid" />
                            </div>

                            <div className="row d-flex justify-content-center text-center d-block d-md-none ">
                                <div className="col-8">
                                    <div className="card border-0">
                                        <div className="card-body ">
                                            <div className="buble font-weight-bold" style={{ backgroundColor: "#5691F2" }}>1</div>
                                            <h5 className="mt-2 deepgray">Set up your company profile</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-8">
                                    <div className="card border-0">
                                        <div className="card-body ">
                                            <div className="buble font-weight-bold" style={{ backgroundColor: "#4470E6" }}>2</div>
                                            <h5 className="mt-2 deepgray">Post a job instantly</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-8">
                                    <div className="card border-0">
                                        <div className="card-body ">
                                            <div className="buble font-weight-bold" style={{ backgroundColor: "#233E83" }}>3</div>
                                            <h5 className="mt-2 deepgray">Start receiving applications</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body p-12">

                                <Link to="/selectanaccount" variant="primary" className="btnpostajob p-3 m-2 pr-5 pl-5 btn btn-sm  btn-secondary p-3 font-weight-bold" >
                                    Get started
                                </Link>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default EasyToStart;
