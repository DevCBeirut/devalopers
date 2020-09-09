import React, { Component } from 'react';



import { Button, Form, FormControl } from "react-bootstrap";
import Header from "../common/Header";
import contact from "../../assets/images/contact.jpg";
import Footer from "../common/Footer";
import { AvForm } from "availity-reactstrap-validation";
import FormRow from "../../components/Row/FormRow";
import { Link, withRouter } from "react-router-dom";
import CoreEngine from "../../core/CoreEngine";
import RequestEngine from "../../core/RequestEngine";
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";

class Contact extends CoreEngine {


    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            message: "",
            loading: false,
            sent: false
        }
        this.engine = new RequestEngine();
    }

    handleValidSubmit = async () => {
        this.setState({
            loading: true
        })
        try {
            const response = await this.engine.postItem("home", this.state, "contactus")

            if (response && response.status === 200) {
                this.setState({
                    sent: true,
                    name: "",
                    email: "",
                    message: "",
                })
            }
        } catch (e) {
            this.showErrorMessage("error please try again")
        }

        this.setState({
            loading: false,
        })

    };


    render() {
        const { name,
            email,
            message, sent, loading } = this.state
        return (
            <>
                <Header />
                <div className="py-5 bg-info">
                    <div className="container contact-us">
                        <div className="row d-flex  bg-white bordershadow ">
                            <div className=" col-lg-6 col-md-6 pl-0 ml-0 pr-0 mr-0 text-left">
                                <img src={contact} width="100%" className="img-fluid" alt="Against Cyber Theft" />
                            </div>
                            <div className="p-3 col-lg-6 col-md-6">
                                <div className="card border-0">
                                    {!sent && <div className="card-body p-3">
                                        <h2 className="mt-3 font-weight-bold">Contact Us</h2>
                                        <AvForm onValidSubmit={() => this.handleValidSubmit()} className="contactinput noshadow">
                                            <FormRow label="Name" name="name" data={name} changeInput={this.changeInput.bind(this)} />
                                            <FormRow label="Email" name="email" data={email} changeInput={this.changeInput.bind(this)} />
                                            <FormRow label="Message" name="message" data={message} type={"textarea"} changeInput={this.changeInput.bind(this)} />
                                            <div className="align-content-center align-items-center mx-auto text-center">
                                                <ButtonLoader variant="primary" className="btnpostajob btn btn-sm  btn-secondary p-2 m-2 pr-5 pl-5 font-weight-bold" loading={loading}>Send</ButtonLoader>
                                            </div>
                                        </AvForm>
                                    </div>}
                                    {sent && <div className="card-body p-3">
                                        <h2 className="m-2 mt-5 pt-5 font-weight-bold">Message Sent!</h2>

                                        <h6 className="m-2 ">We`ll be in touch very soon.</h6>
                                        <div className="align-content-center align-items-center mx-auto text-left">
                                            <Button variant="primary" onClick={() => this.setState({
                                                sent: false
                                            })} className="btnpostajob btn btn-sm  btn-secondary p-2 m-2 pr-5 pl-5 font-weight-bold"  >Send another</Button>
                                        </div>
                                    </div>}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                <Footer />


            </>
        );
    }
}


export default withRouter(Contact);