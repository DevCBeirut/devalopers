import React, { Component } from 'react';



import Header from "../common/Header";
import Footer from "../common/Footer";
import { Link, withRouter } from "react-router-dom";
import DevHeader from "./DevHeader";
import CoreEngine from "../../core/CoreEngine";
import RequestEngine from "../../core/RequestEngine";
import loadingAction from "../../core/redux/actions/loadingAction";
import { connect } from "react-redux";

class SavedJob extends CoreEngine {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false
        }
        this.engine = new RequestEngine();
    }
    componentDidMount() {
        this.callPage()
    }
    async callPage() {
        this.props.loadingAction(true);
        const response = await this.engine.getItem("user", "/my/saved");

        this.setState({
            loading: true,
        })

        if (response && response.status === 200) {
            this.setState({
                loading: false,
                data: response.data.data
            }
            );
        }
        this.props.loadingAction(false);
    }


    render() {

        const { data, loading } = this.state
        return (
            <>
                <Header />

                <DevHeader selected={2} />
                <div className="py-5 bg-info">
                    <div className="container">
                        <div className="row ">
                            <div className="p-1 pl-3 col-lg-12 col-md-12 mx-auto text-left">
                                <h4 className="mt-1 font-weight-bold">Saved Job</h4>
                            </div>
                        </div>
                        <div className="row d-flex ">
                            <div className="p-3 col-lg-12 col-md-12">
                                <div className=" border-0">
                                    {!loading && data.length === 0 && <div className=" p-1 bg-white mb-4 jobsitem mt-2">
                                        <div className="row p-3 pl-4">
                                            <div className="col-md-7  font-weight-bold">
                                                <h5 className="mb-1 ">No Saved Jobs</h5>
                                            </div>
                                        </div>
                                    </div>}

                                    {data.map((item, index) => {

                                        if (item.job) {
                                            return <div key={index} className=" p-1 bg-white mb-3 jobsitem mt-4">
                                                <div className="row p-3 pl-4">
                                                    <div className="col-md-12  font-weight-bold">
                                                        <Link to={"/viewjobinfo/" + item.job._id} className="text-dark"><h5 className="mb-1 ">{item.job.name}</h5></Link>
                                                        <h6 className="mb-2 jobdate ">{this.renderDate(item.job.createdAt)}</h6>
                                                    </div>

                                                    <div className="pl-3">
                                                        {item.job.description.substring(0, 255)}...
                                                    </div>

                                                </div>

                                            </div>
                                        }

                                    })}
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



const mapDispatchToProps = dispatch => ({
    loadingAction: (payload) => dispatch(loadingAction(payload))
});
export default connect(null, mapDispatchToProps)(withRouter(SavedJob));