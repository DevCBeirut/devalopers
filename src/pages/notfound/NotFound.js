import React, { Component } from 'react';



import strings from "../../core/translate";
import Header from "../common/Header";
import contact from "../../assets/images/contact.jpg";
import Footer from "../common/Footer";
import { AvForm } from "availity-reactstrap-validation";
import FormRow from "../../components/Row/FormRow";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TopHeader from "../common/TopHeader";


class NotFound extends Component {


    constructor(props) {
        super(props);
        this.state = {}
    }



    render() {
        return (
            <>
                <Header />
                <div className="main-cover">
                    <TopHeader title={"Page not found"}
                               subtitle={""}
                    />

                </div>
                <div className="py-5 bg-info">
                    <div className="container contact-us">

                        <div className="row d-flex  bg-white bordershadow ">
                            <div className="p-5 m-5 col-lg-12 col-md-12">

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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NotFound));
