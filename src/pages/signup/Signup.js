import React, { Component } from 'react';



import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";
import Header from "../common/Header";
import signup from "../../assets/images/signup.jpg";
import Footer from "../common/Footer";
import { AvForm } from "availity-reactstrap-validation";
import FormRow from "../../components/Row/FormRow";
import RequestEngine from "../../core/RequestEngine"
import { Link, withRouter } from "react-router-dom";
import { Input } from "reactstrap";
import CoreEngine from "../../core/CoreEngine";
import LinkedinLogin from "../../components/LinkedinLogin";
import Constants from "../../core/Constants";
import GitHubLogin from "../../components/GitHubLogin";
import { Utilites } from "../../core/Utilites";
import strings from "../../core/translate";
import {Button, Modal, OverlayTrigger, Popover} from "react-bootstrap";
import FontAwesome from "react-fontawesome";

const popover = (
    <Popover id="popover-basic">
        <Popover.Title as="h3">Password</Popover.Title>
        <Popover.Content>
            The Password must have at least <strong>six</strong> digits , we recommand a combination of character and numbers
        </Popover.Content>
    </Popover>
);
class Signup extends CoreEngine {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            showterms:false,
            email: "",
            password: "",
            password2: "",
            agree: false,
            loading: false
        };
        this.engine = new RequestEngine();
    }

    componentDidMount() {
        Utilites.setCookie("regtype","company");
    }


    showInlineErrorMessage = error => this.setState({ error })



    handleValidSubmit = async () => {

        const { agree, password, password2 } = this.state
        if (!agree) {
            this.showInlineErrorMessage("You must agree to the terms and service")
            return
        }

        if (password != password2) {
            this.showInlineErrorMessage("Password not Match")
            return
        }

        if (!Utilites.isStrong(password)) {
            this.showInlineErrorMessage("Please put a Strong Password")
            return
        }
        this.setState({
            loading: true
        })
        try {
            const response = await this.engine.postItem("company", this.state)
            if (response && response.status === 200) {
                if (response.data.success) {
                    this.props.history.push('/login');
                    this.showSucessMessage("Sucess , Please login")
                } else {
                    this.showInlineErrorMessage(response.data.message)
                }
            }
        } catch (e) {
            this.showInlineErrorMessage("error please try again")
        }

        this.setState({
            loading: false
        })

    };
    requestProfile = () => {
        var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${Constants.LINK_REACT_APP_CLIENT_ID}&scope=r_liteprofile&state=123456&redirect_uri=${Constants.LINK_REACT_APP_REDICRECT_URL}`

        window.location = oauthUrl;

    };

    render() {
        const { loading, name,
            email,
            showterms,
            agree,
            password,
            password2 } = this.state
        const githubloginlink = "https://github.com/login/oauth/authorize?scope=user&client_id="+Constants.REACT_APP_CLIENT_ID+"&redirect_uri="+Constants.REACT_APP_REDICRECT_URL;

        return (
            <>
                <Header />
                <div className="py-5 bg-info">
                    <div className="container sign-up">

                        <div className="row d-flex  bg-white  bordershadow">
                            <div className=" col-lg-6 col-md-6 pl-0 ml-0 pr-0 mr-0 text-left">
                                <img src={signup} width="100%" className="img-fluid" alt="Against Cyber Theft" />

                            </div>
                            <div className="p-3 col-lg-6 col-md-6">
                                <div className="card border-0">
                                    <div className="card-body pr-5">
                                        <h2 className="mt-3 font-weight-bold">Sign Up</h2>
                                        {
                                            this.state.error && (
                                                <div className="alert alert-danger">
                                                    {this.state.error}
                                                </div>
                                            )
                                        }
                                        <AvForm onValidSubmit={() => this.handleValidSubmit()} className="contactinput noshadow">
                                            <FormRow label="Company Name" name="name" data={name} changeInput={this.changeInput.bind(this)} />
                                            <FormRow label="Email" type="email" name="email" data={email} changeInput={this.changeInput.bind(this)} />
                                             <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
                                                <div>
                                                    <FormRow label="Password" type="password" name="password" data={password} changeInput={this.changeInput.bind(this)} />
                                                </div>
                                            </OverlayTrigger>
                                            <FormRow label="Confirm Password" type="password" name="password2" data={password2} changeInput={this.changeInput.bind(this)} />

                                            <div className="row checkbox-row d-flex mt-1" style={{ fontSize: 14, paddingLeft: 15 }}>
                                                <Input type="checkbox" id="checkbox" value={agree} onChange={agree => {
                                                    this.setState({ agree: agree.target.checked ,error:''})
                                                }} /><label for="checkbox"></label>  {strings.agree_to} <a onClick={()=>{
                                                    this.setState({showterms:true})
                                            }}  className="nav-link text-primary pt-0 pl-1 font-weight-bold pointer" >{strings.terms_and_conditions}</a>
                                            </div>

                                            <div className="align-content-center align-items-center mx-auto text-center mb-3 mt-3">
                                                <ButtonLoader variant="primary" className="btnpostajob btn btn-sm  btn-secondary p-2 m-2 pr-5 pl-5 font-weight-bold" loading={loading}> {strings.create_an_account}</ButtonLoader>
                                            </div>

                                            <div class="separator">Or</div>

                                            <div className="row mt-3 mb-3 sm-media">

                                                <div className="col-9 col-md-6 text-right mt-2 mx-auto">
                                                    <a variant="primary" onClick={this.requestProfile} className="btn btn-sm  btn text-white d-flex" style={{background:"#057ABA"}} >
                                                        <FontAwesome name="linkedin" /> <span style={{    position: "relative",
                                                        top: 1,
                                                        left: 15,
                                                    }}>Sign Up with Linkedin</span>
                                                    </a>
                                                </div>

                                                <div className="col-9 col-md-6 text-right mt-2 mx-auto">

                                                    <a variant="primary"  href={githubloginlink}    className="btn btn-sm  btn text-white d-flex" style={{background:"#444444"}} ><FontAwesome name="github" /> <span style={{    position: "relative",
                                                        top: 1,
                                                        left: 15,
                                                    }}>Sign Up with github</span></a>
                                                </div>

                                            </div>
                                            <div className="align-content-center align-items-center mx-auto text-center d-flex justify-content-center">

                                                <div>
                                                    Already have an account?
                                                </div>
                                                <Link variant="primary" to="/login" className="btn btn-sm btn text-secondary font-weight-bold p-0 pl-1" >
                                                    Sign In
                                                </Link>
                                            </div>

                                        </AvForm>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                <Modal show={showterms} onHide={() => this.setState({showterms:!this.state.showterms})}  >
                    <AvForm onValidSubmit={() => this.handleValidSubmit()} className="form-horizontal liteinput" id="TypeValidation">
                        <Modal.Header closeButton>
                            <Modal.Title className="mx-auto " >
                                Terms & Conditions
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="col-lg-11 col-md-11 mx-auto">
                                {/* //TODO_D */}


                                <p>Please read these Terms & Conditions carefully before using the
                                    https://devalopers.com/ website (the "Service") operated by DEVALOPERS ("us", "we", or "our").</p>

                                <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
                                    These Terms apply to all visitors, users and others who access or use the Service.</p>

                                <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the
                                    terms then you may not access the Service.</p>




                                <h2>Links To Other Web Sites</h2>

                                <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by
                                    DEVALOPERS.</p>

                                <p>DEVALOPERS has no control over, and assumes no responsibility for, the content, privacy policies, or practices of
                                    any third party web sites or services. You further acknowledge and agree that DEVALOPERS shall not be
                                    responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or
                                    in connection with use of or reliance on any such content, goods or services available on or through any
                                    such web sites or services.</p>

                                <p>We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or
                                    services that you visit.</p>


                                <h2>Termination</h2>

                                <p>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any
                                    reason whatsoever, including without limitation if you breach the Terms.</p>

                                <p>All provisions of the Terms which by their nature should survive termination shall survive termination,
                                    including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of
                                    liability.</p>



                                <h2>Governing Law</h2>

                                <p>These Terms shall be governed and construed in accordance with the laws of Lebanon, without regard to its
                                    conflict of law provisions.</p>

                                <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those
                                    rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining
                                    provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us
                                    regarding our Service, and supersede and replace any prior agreements we might have between us regarding
                                    the Service.</p>


                                <h2>Changes</h2>

                                <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
                                    material we will try to provide at least 30 days notice prior to any new terms taking effect. What
                                    constitutes a material change will be determined at our sole discretion.</p>

                                <p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by
                                    the revised terms. If you do not agree to the new terms, please stop using the Service.</p>


                                <h2>Contact Us</h2>

                                <p>If you have any questions about these Terms, please contact us:</p>
                                <ul>
                                    <li>By email: info@devalopers.com</li>

                                </ul>
                            </div>

                        </Modal.Body>

                    </AvForm>
                </Modal>

                <Footer />


            </>
        );
    }
}

export default withRouter(Signup);
