import React, { Component } from 'react';


import Header from "../common/Header";
import Footer from "../common/Footer";
import AboutDev from "../common/AboutDev";
import CompanyBigCover from "./CompanyBigCover";
import CompanyHeader from "./CompanyHeader";

import { Link, withRouter } from "react-router-dom";
import CoreEngine from "../../core/CoreEngine";
import RequestEngine from "../../core/RequestEngine";
import loadingAction from "../../core/redux/actions/loadingAction";
import { connect } from "react-redux";
import profile from "../../assets/images/profile.png";
import strings from "../../core/translate";

class CompanyHome extends CoreEngine {


    constructor(props) {
        super(props);
        this.state = {

            info: {},
            countactivejobs: 0,
            countapplicant: 0,
            countprofileview: 0,
            lastestapplicant: [],
            mostactivecompanies: [],
            mostsearchedskills: [],
            statistics: {},
            loading: false
        }
        this.engine = new RequestEngine();
    }
    componentDidMount() {
        this.callPage()
    }
    async callPage() {
        this.props.loadingAction(true);
        const response = await this.engine.getItem("company", "/dashboard");
        this.setState({
            loading: true,
        })

        if (response && response.status === 200) {
            const data = response.data.data;
            this.setState({
                loading: false,
                info: data.info,
                countactivejobs: data.countactivejobs,
                countapplicant: data.countapplicant,
                countprofileview: data.countprofileview,
                lastestapplicant: data.lastestapplicant,
                mostactivecompanies: data.mostactivecompanies,
                mostsearchedskills: data.mostsearchedskills,
                statistics: data.statistics,
                profileprogress: data.profileprogress
            }
            );
        }
        this.props.loadingAction(false);
    }




    render() {

        const { info,
            countactivejobs,
            countapplicant,
            countprofileview,
            lastestapplicant,
            mostactivecompanies,
            mostsearchedskills,
            profileprogress,
            statistics,
            loading } = this.state

        let profilepicture = profile
        if (info && info.fullpicture) {
            profilepicture = info.fullpicture
        }
        return (
            <>
                <Header />

                <CompanyHeader selected={0} />
                <CompanyBigCover />
                <div className="bg-info homedashboard">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="borderwrap bg-white topcompanysection">
                                    <div className="d-flex">
                                        <div className="dashboardprofile">
                                            <img src={profilepicture} className="pt-0" />
                                        </div>

                                        <div className="col-md-8 font-weight-bold">
                                            <h5> {info && info.name}</h5>
                                        </div>
                                    </div>

                                    <hr />
                                    <h6><span className="font-weight-bold">{profileprogress && profileprogress.score}</span> {profileprogress && profileprogress.completemsg}</h6>

                                    <div className="progress" style={{ height: 6 }}>
                                        <div className="progress-bar bg-secondary" role="progressbar" style={{ width: profileprogress && profileprogress.percent + "%" }}
                                            aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" />
                                    </div>
                                    {profileprogress && profileprogress.completed && <Link to={"/company/profile/" + info._id} className="text-secondary font-weight-bold" >Edit your profile  &nbsp; ></Link>}
                                    {profileprogress && !profileprogress.completed && <Link to={"/company/profile/" + info._id} className="text-secondary font-weight-bold" >Complete your profile &nbsp; ></Link>}

                                </div>

                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <h4 className="mt-1 font-weight-bold">Most Searched Skills</h4>
                                    </div>
                                </div>

                                <div className="borderwrap bg-white">
                                    {mostsearchedskills.map((item, index) => {
                                        return <div key={index}>
                                            <h6 className="mb-3">{item.name}</h6>
                                        </div>
                                    })}

                                    <Link to="/allskills" className="text-secondary font-weight-bold" style={{ marginLeft: 0 }}>View all ></Link>
                                </div>

                                <AboutDev statistics={statistics} />
                            </div>
                            <div className="col-lg-8 col-md-8">

                                <div className="row dashboardstatistics text-left text-white">
                                    <div className="col-lg-4">
                                        <div className="cards card-1">
                                            <h4 className="font-weight-bold">{countapplicant}</h4>
                                            <h5 className="">Applicants this week</h5>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="cards card-2">
                                            <h4 className="font-weight-bold">{countactivejobs}</h4>
                                            <h5 className="">Active job post</h5>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="cards card-3">
                                            <h4 className="font-weight-bold">{countprofileview}</h4>
                                            <h5 className="">Profile views this month</h5>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12 col-md-12 mx-auto text-left">
                                        <h5 className="mt-1 font-weight-bold">Applicants</h5>
                                    </div>
                                </div>

                                <div className=" borderwrap">

                                    {lastestapplicant.map(item => {

                                        let profilepicture = profile
                                        // debugger
                                        if (item && item.user && item.user.fullpicture) {
                                            profilepicture = item.user.fullpicture
                                        }
                                        return <div className="  bg-white   ">
                                            <div className="row p-2 pl-1">
                                                <div className="col-md-1 ">
                                                    <Link to={"/dev/profile/" + (item.user && item.user._id)} className={"cursor"} ><img src={profilepicture} width="40" className="pt-0" /></Link>
                                                </div>
                                                <div className="col-md-8  font-weight-bold">
                                                    <h6 className="mt-2 "><Link to={"/dev/profile/" + (item.user && item.user._id)} ><span className="font-weight-bold text-primary">{item.user && item.user.name || "Deleted User"}</span></Link> <span> applied for</span> <Link to={"/viewjobinfo/" + item.job._id} ><span className="text-secondary font-weight-bold"> {item.job && item.job.name || "Deleted Job"}</span></Link>  </h6>
                                                </div>
                                                <div className="col-md-2 font-weight-bold text-right">
                                                </div>
                                            </div>

                                        </div>

                                    })}


                                </div>

                                <div className="text-right pt-2">
                                    {
                                        !loading && lastestapplicant.length === 0
                                            ? (
                                                <div className="alert alert-dark bg-white d-flex justify-content-between align-items-center">
                                                    <div className="text-left">{strings.no_applicants}</div>
                                                    <Link to='/postajob'>
                                                        <button class="btn btn-secondary">Post a job</button>
                                                    </Link>
                                                </div>
                                            )
                                            : <Link className="btn btn-sm  btn text-secondary font-weight-bold " to="/company/applicantslist">View all applicants ></Link>
                                    }

                                </div>

                                <div className="row">
                                    <div className="col-lg-12 col-md-12 mx-auto text-left">
                                        <h5 className="mt-1 font-weight-bold">Most Active Companies  </h5>
                                    </div>
                                </div>

                                <div className="mostactivecompanies borderwrap">
                                    {mostactivecompanies.length === 0 &&
                                        <div className="p-3 mb-0">No Active Companies yet</div>}
                                    {mostactivecompanies.map((item, index) => {
                                        let profilepicture = profile;
                                        if (item && item.fullpicture) {
                                            profilepicture = item.fullpicture
                                        }
                                        return (

                                            <div className=" bg-white">
                                                <div className="d-flex pl-1">
                                                    <div className="col-md-1 ">
                                                        <img src={profilepicture} width="40" className="pt-0" />
                                                    </div>
                                                    <div className="col-md-11 font-weight-bold">
                                                        <Link to={`/company/profile/${item._id}`} key={item._id}>
                                                            <h6>{item.name}</h6>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )

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
export default connect(null, mapDispatchToProps)(withRouter(CompanyHome));
