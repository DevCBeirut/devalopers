import React, { Component } from 'react';



import Header from "../common/Header";
import Footer from "../common/Footer";
import { Link, withRouter } from "react-router-dom";
import CompanyHeader from "./CompanyHeader";
import CoreEngine from "../../core/CoreEngine";
import RequestEngine from "../../core/RequestEngine";
import loadingAction from "../../core/redux/actions/loadingAction";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import FontAwesome from "react-fontawesome";

import strings from "../../core/translate";

class ActiveJobs extends CoreEngine {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            previous: [],
            loading: false
        }
        this.engine = new RequestEngine();
    }
    componentDidMount() {
        this.callPage()
    }

    async callPage() {
        this.props.loadingAction(true);
        const response = await this.engine.getItem("company", "/my/job");
        this.setState({
            loading: true,
        })
        if (response && response.status === 200) {
            this.setState({
                loading: false,
                data: response.data.data.active,
                previous: response.data.data.previous
            }
            );
        }
        this.props.loadingAction(false);
    }
    async deleteJob(id) {
        this.props.loadingAction(true);
        const response = await this.engine.getItem("job", "/delete/" + id);
        this.setState({
            loading: true,
        })
        if (response && response.status === 200) {
            this.showSucessMessage("Deleted!");
            this.callPage()
        }
        this.props.loadingAction(false);
    }


    render() {

        const { data, loading, previous } = this.state
        return (
            <>
                <Header />

                <CompanyHeader selected={1} />
                <div className="py-5 bg-info activejobs">
                    <div className="container">
                        <div className="row ">
                            <div className="p-1 pl-3 col-lg-12 col-md-12 mx-auto text-left">
                                <h4 className="mt-1 font-weight-bold">
                                    Active Jobs
                                </h4>
                            </div>
                        </div>
                        <div className="row d-flex ">
                            <div className="col-lg-12 col-md-12">
                                <div className=" border-0">

                                    {!loading && data.length === 0 && <div className=" p-1 bg-white mb-3 mt-2 jobsitem">
                                        <div className="row p-3 pl-4">
                                            <div className="col-md-7  font-weight-bold">
                                                <h5 className="mb-1 ">No Active Jobs yet</h5>
                                            </div>
                                        </div>
                                    </div>}
                                    {data.map((item, index) => {
                                        return <div key={index} className=" p-1 bg-white mb-3 jobsitem mt-3">
                                            <div className="row p-3 pl-4">
                                                <div className="col-md-8  font-weight-bold">
                                                    <Link to={"/viewjobinfo/" + item._id} className="text-dark"><h5 className="mb-1 ">{item.name}</h5></Link>
                                                    <h6 className="mb-2 jobdate ">{item.company.name} • {item.jobtype} • {this.renderDate(item.fromduration)} • ({item.salary ? item.salary : strings.no_salary})</h6>
                                                    <p>{item.description.substring(0, 255)}{item.description.length>255 && "..."}</p>
                                                </div>
                                                <div className="col-md-4 font-weight-bold text-right">
                                                    <Link to={"/company/filterapplicantslist/"+item._id} className="btn mb-3 btntag btn-secondary text-black-50">View Applicants</Link>
                                                    <Button style={{
                                                    }} onClick={() => this.deleteJob(item._id)} className="cleanborder mb-3 btntag searchtag btn-secondary bg-transparent border-0">
                                                        <FontAwesome name="trash" size="1x" />
                                                    </Button>
                                                    <Button style={{
                                                    }} onClick={() => this.goToScreen("/editjob/" + item._id)} className="cleanborder mb-3 btntag searchtag btn-secondary bg-transparent border-0">
                                                        <FontAwesome name="edit" size="1x" />
                                                    </Button>
                                                </div>
                                            </div>

                                        </div>
                                    })}
                                </div>
                            </div>

                        </div>

                        <div className="row ">
                            <div className="p-1 pl-3 col-lg-12 col-md-12 mx-auto text-left">
                                <h4 className="mt-1 font-weight-bold">Previous Jobs  <span className="greyheader font-weight-light"> (Only visible to you)</span></h4>
                            </div>
                        </div>
                        <div className="row d-flex ">
                            <div className="col-lg-12 col-md-12">
                                <div className=" border-0">
                                    {!loading && previous.length === 0 && <div className="p-1 bg-white mb-3 mt-2 jobsitem">
                                        <div className="row p-3 pl-4">
                                            <div className="col-md-7  font-weight-bold">
                                                <h5 className="mb-1 ">No Previous Jobs yet</h5>
                                            </div>
                                        </div>
                                    </div>}

                                    {previous.map((item, index) => {
                                        return <div key={index} className=" p-1 bg-white mb-3 jobsitem mt-3">
                                            <div className="row p-3 pl-4">
                                                <div className="col-md-8  font-weight-bold">
                                                    <Link to={"/viewjobinfo/" + item._id} className="text-dark"><h5 className="mb-1 ">{item.name}</h5></Link>
                                                    <h6 className="mb-2 jobdate ">{item.company.name} • {this.renderDate(item.fromduration)} • ({item.salary ? item.salary : strings.no_salary})</h6>
                                                    <p>{item.description.substring(0, 255)}...</p>
                                                </div>
                                                <div className="col-md-4 font-weight-bold text-right">
                                                    <Link to={"/company/filterapplicantslist/"+item._id} className="btn mb-3 btntag text-black-50">View Applicants</Link>
                                                    <Button style={{
                                                    }} onClick={() => this.deleteJob(item._id)} className="cleanborder mb-3 btntag searchtag bg-transparent border-0">
                                                        <FontAwesome name="trash" size="1x" />
                                                    </Button>
                                                    <Button onClick={() => this.goToScreen("/editjob/" + item._id)} className="cleanborder mb-3 btntag searchtag bg-transparent border-0">
                                                        <FontAwesome name="edit" size="1x" />
                                                    </Button>
                                                </div>
                                            </div>

                                        </div>
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
export default connect(null, mapDispatchToProps)(withRouter(ActiveJobs));
