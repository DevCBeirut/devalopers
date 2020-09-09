import React, { Component } from 'react';



import { Button, Form, FormControl } from "react-bootstrap";
import Header from "../common/Header";
import selectanaccount1 from "../../assets/images/selectanaccount1.jpg";

import selectanaccount2 from "../../assets/images/selectanaccount2.jpg";
import Footer from "../common/Footer";
import { AvForm } from "availity-reactstrap-validation";
import FormRow from "../../components/Row/FormRow";
import { Link } from "react-router-dom";

class Selectanaccount extends Component {


    constructor(props) {
        super(props);
        this.state = {}
    }



    render() {
        return (
            <>
                <Header />
                <div className="py-5 bg-info">
                    <div className="container">

                        <h2 className="mt-3 font-weight-bold text-center">Create your account</h2>
                        <div className="row  text-center mx-auto align-items-center align-content-center   ">

                            <div className="p-1 col-0 col-md-3">
                            </div>
                            <div className="p-2 col-8 col-md-3 text-center mx-auto ">
                                <Link className="" to="/signupcompany" >
                                    <img src={selectanaccount1} className="img-fluid" />
                                </Link>
                                <div className=" text-center pt-3">
                                    <Link className="p-2 d-flex  btnpostajob btn btn-sm  btn-secondary justify-content-center  font-weight-bold  " style={{ fontSize: 13 }} to="/signupcompany" >
                                        I want to hire talent
                                        </Link>
                                </div>
                            </div>
                            <div className="p-2 col-9 col-md-3 text-center mx-auto ">
                                <Link className="" to="/signupdev" >
                                    <img src={selectanaccount2} className="img-fluid" />
                                </Link>
                                <div className=" text-center pt-3">
                                    <Link className="p-2 d-flex  btnpostajob btn btn-sm  btn-secondary justify-content-center font-weight-bold " style={{ fontSize: 13 }} to="/signupdev" >
                                        I`m looking for job opportunities
                                    </Link>
                                </div>
                            </div>


                            <div className="p-1 col-0 col-md-3">
                            </div>

                        </div>
                    </div>
                </div>


                <Footer />


            </>
        );
    }
}

export default Selectanaccount;
