import React, { Component } from 'react';
import strings from "../../core/translate";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TopHeader from "../common/TopHeader";

class Terms extends Component {


    constructor(props) {
        super(props);
        this.state = {}
    }



    render() {
        return (
            <>
                <Header />
                <div className="main-cover">
                    <TopHeader title={strings.terms}
                        subtitle={strings.terms_last_updated}
                    />

                </div>
                <div className="py-5 bg-info">
                    <div className="container contact-us">

                        <div className="row d-flex  bg-white bordershadow ">
                            <div className="p-3 col-lg-12 col-md-12">
                                <div className="card border-0">

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
    ...state
});

const mapDispatchToProps = dispatch => ({
    // resetMsg: () => dispatch(resetMsg()),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Terms));