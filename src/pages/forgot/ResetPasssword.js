import React, { Component } from 'react';


import Header from "../common/Header";
import Footer from "../common/Footer";

import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";
import { AvForm } from "availity-reactstrap-validation";
import FormRow from "../../components/Row/FormRow";
import { Link, withRouter } from "react-router-dom";
import CoreEngine from "../../core/CoreEngine";
import RequestEngine from "../../core/RequestEngine";
import { Utilites } from "../../core/Utilites";
import redirectAction from "../../core/redux/actions/redirectAction";
import msgcountAction from "../../core/redux/actions/msgcountAction";
import { connect } from "react-redux";

class ResetPasssword extends CoreEngine {


    constructor(props) {
        super(props);
        this.state = {
            newpass: "",
            newpass2: "",
            token: "",
            loading: false,
        }
        this.engine = new RequestEngine();
    }

    componentDidMount() {

        const hash = this.props.match.params.hash
        this.setState({
            token: hash
        })

    }
    handleValidSubmit = async () => {

        const { newpass, newpass2 } = this.state


        if (newpass != newpass2) {
            this.showErrorMessage("Password not Match")
            return
        }

        if (!Utilites.isStrong(newpass)) {
            //  this.showErrorMessage("Please put a Strong Password")
            // return
        }
        this.setState({
            loading: true
        })

        try {
            const response = await this.engine.postItem("user", this.state, "reset")
            if (response && response.status === 200) {

                if (response.data.success) {

                    this.showSucessMessage("Password Changed")
                } else {
                    this.showErrorMessage(response.data.message)
                }



            }
        } catch (e) {
            this.showErrorMessage("error please try again")
        }

        this.setState({
            loading: false
        })

    };


    render() {
        const { loading,
            newpass,
            newpass2 } = this.state
        return (
            <>
                <Header />
                <div className="py-5 bg-info ">
                    <div className="container">

                        <div className="row d-flex  ">

                            <div className="p-3 col-lg-6 col-md-6 mx-auto">
                                <div className="card border-0 bg-white  bordershadow p-4 pl-5 pr-5">
                                    <div className="card-body p-3">
                                        <h2 className="mt-3 mb-3 font-weight-bold">Reset your password</h2>
                                        <AvForm onValidSubmit={() => this.handleValidSubmit()} className="pt-2 contactinput  noshadow">
                                            <FormRow label="Password" type="password" name="newpass" data={newpass} changeInput={this.changeInput.bind(this)} />
                                            <FormRow label="Confirm Password" type="password" name="newpass2" data={newpass2} changeInput={this.changeInput.bind(this)} />
                                            <div className="align-content-center align-items-center mx-auto text-center">
                                                <ButtonLoader loading={loading} variant="primary" className="btnpostajob btn btn-sm  btn-secondary p-2 m-2 pr-5 pl-5 font-weight-bold" >
                                                    Change
                                                </ButtonLoader>
                                            </div>
                                            <div className="row text-center mx-auto align-content-center align-items-center d-flex justify-content-center">
                                                Remember your password ?
                                                <Link className="nav-link text-secondary pt-2" to="/login">Sign In</Link>

                                            </div>

                                        </AvForm>
                                    </div>
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

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    redirectAction: () => dispatch(redirectAction()),
    msgcountAction: (payload) => dispatch(msgcountAction(payload))

});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ResetPasssword));
