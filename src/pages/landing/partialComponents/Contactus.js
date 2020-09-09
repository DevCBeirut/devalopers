import React from 'react';



function Contactus() {
    return (
        <div className="">
            <div className="container">
                <div className="row d-flex justify-content-center text-center ">
                    <div className="col-md-6 contactus pl-5 pr-5 pb-5">
                        <div className="text-center  mx-auto pb-5">
                            <h3>Send Us message</h3>
                        </div>

                        <div className="form-group">
                            <input placeholder={"Your Email*"} type="email" className="form-control" />
                        </div>

                        <div className="form-group">
                            <input placeholder={"Your Name*"} type="text" className="form-control" />
                        </div>

                        <div className="form-group">
                            <input placeholder={"Phone Number*"} type="text" className="form-control" />
                        </div>

                        <div className="form-group">
                            <input placeholder={"Subject*"} type="text" className="form-control" />
                        </div>

                        <div className="form-group">
                            <input placeholder={"Your message*"} className="form-control" />
                        </div>

                        <div className="form-group">
                            <div className="form-check"><input className="form-check-input" type="checkbox" id="form21"
                                value="on" /> <label className="form-check-label dasbhoard-description"
                                    htmlFor="form21"> By sending this message, you confirm that you have read and agreed to our privacy-policy. </label></div>
                        </div>


                        <a className="btn btn-sm btn-primary" href="#">Send</a>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contactus;
