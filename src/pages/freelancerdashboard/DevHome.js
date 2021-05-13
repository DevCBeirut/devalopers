import React, { Component } from 'react';


import Header from "../common/Header";
import Footer from "../common/Footer";
import AboutDev from "../common/AboutDev";


import DevBigCover from "./DevBigCover";
import DevHeader from "./DevHeader";


import logotop from "../../assets/images/logowhite.png";
import { Link, withRouter } from "react-router-dom";
import CoreEngine from "../../core/CoreEngine";
import RequestEngine from "../../core/RequestEngine";
import loadingAction from "../../core/redux/actions/loadingAction";
import { connect } from "react-redux";
import profile from "../../assets/images/profile.png";
import strings from "../../core/translate";

class DevHome extends CoreEngine {


    constructor(props) {
        super(props);
        this.state = {

            info: {},
            countsavedjobs: 0,
            countapplicant: 0,
            countprofileview: 0,
            lastestapplicant: [],
            mostactivecompanies: [],
            mostsearchedskills: [],
            recommendedjob: [],
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
        const response = await this.engine.getItem("user", "/dashboard");

        this.setState({
            loading: true,
        })

        if (response && response.status === 200) {
            const data = response.data.data;
            
            this.setState({
                loading: false,
                info: data.info,
                countsavedjobs: data.countsavedjobs,
                countapplicant: data.countapplicant,
                countprofileview: data.countprofileview,
                mostactivecompanies: data.mostactivecompanies,
                statistics: data.statistics,
                profileprogress: data.profileprogress,
                recommendedjob: data.recommendedjob
            }
            );
        }
        this.props.loadingAction(false);
    }




    render() {

        const { info,
            countsavedjobs,
            countapplicant,
            countprofileview,
            mostactivecompanies,
            profileprogress,
            recommendedjob,
            statistics } = this.state

        let profilepicture = profile
        if (info && info.fullpicture) {
            profilepicture = info.fullpicture
        }
        return (
            <>
                <Header />

                <DevHeader selected={0} />
                <DevBigCover />
                <div className="bg-info homedashboard">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 ">
                                <div className="borderwrap bg-white topcompanysection ">
                                    <div className="d-flex">
                                        <div className="dashboardprofile">
                                            <img src={profilepicture} className="pt-0" />
                                        </div>

                                        <div className="col-md-8  font-weight-bold">
                                            <h6 className="mt-4 "> {info && info.name}</h6>
                                        </div>
                                    </div>

                                    <hr />
                                    <h6 className="ml-4 "><span className="font-weight-bold">{profileprogress && profileprogress.score}</span> {profileprogress && profileprogress.completemsg}</h6>

                                    <div className="progress" style={{ height: 8 }}>
                                        <div className="progress-bar bg-secondary" role="progressbar" style={{ width: profileprogress && profileprogress.percent + "%" }}
                                            aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" />
                                    </div>
                                    {profileprogress && profileprogress.completed && <Link to={"/dev/profile/" + info._id} className="text-secondary font-weight-bold" >Edit your profile &nbsp; ></Link>}
                                    {profileprogress && !profileprogress.completed && <Link to={"/dev/profile/" + info._id} className="text-secondary font-weight-bold" >Complete your profile &nbsp; ></Link>}

                                </div>

                                <AboutDev statistics={statistics} />

                            </div>

                            <div className="col-lg-8 col-md-8">
                                <div className="row dashboardstatistics text-left text-white">
                                    <div className="col-lg-4">
                                        <div className="cards card-1">
                                            <h4 className="font-weight-bold">{countapplicant}</h4>
                                            <h5 className="">Applied Jobs</h5>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="cards card-2">
                                            <h4 className="font-weight-bold">{countsavedjobs}</h4>
                                            <h5 className="">Saved Jobs</h5>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="cards card-3">
                                            <h4 className=" font-weight-bold">{countprofileview}</h4>
                                            <h5 className="">Profile views this month</h5>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12 col-md-12 mx-auto text-left">
                                        <h5 className="mt-1 font-weight-bold">Recommended Jobs</h5>
                                    </div>
                                </div>

                                <div className="borderwrap row bg-white pt-3 recommendedjob">
                                    {recommendedjob.length === 0 &&
                                        <h5 className="p-3 mb-0" style={{ fontSize: 20, fontWeight: 100 }} >No Recommended Jobs yet</h5>}
                                    {recommendedjob && recommendedjob.map((item, index) => {
                                        return (index < 3 &&
                                            <div key={item._id} className='bg-white col-12 col-md-4 pointer'>
                                                <Link to={`/viewjobinfo/${item._id}`}>
                                                    <div className={`${index !== 2 && 'borderwrap-color mr-2 ml-2'}`}>
                                                        <img src={item.company.fullpicture} width="50" className="pt-0" />
                                                        <h6>{item.company.name}</h6>
                                                        <h5>{item.name}</h5>
                                                        <p>
                                                            {item.jobtype} - {item.location}
                                                        </p>
                                                        <p>
                                                            {item.company.name} - {this.renderDate(item.fromduration)} - ({item.salary ? item.salary : strings.no_salary})
                                                        </p>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })}

                                    <div className="col-md-12 text-right pb-3 mt-3">
                                        <Link className="text-secondary font-weight-bold mr-2" to="/jobs">View more</Link>
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-lg-12 col-md-12 mx-auto text-left">
                                        <h5 className="mt-1 font-weight-bold">Most Active Companies</h5>
                                    </div>
                                </div>

                                <div className="mostactivecompanies borderwrap">
                                    {mostactivecompanies.length === 0 &&
                                        <h5 className="p-3 mb-0">No Active Companies yet</h5>}

                                    {mostactivecompanies.map((item, index) => {
                                        let profilepicture = profile
                                        if (item && item.fullpicture) {
                                            profilepicture = item.fullpicture
                                        }
                                        return <div key={index} className="p-1">
                                            <div className="d-flex pl-1">
                                                <div className="col-md-1 ">
                                                    <img src={profilepicture} width="40" className="pt-0" />
                                                </div>
                                                <div className="col-md-11  font-weight-bold">
                                                    <Link to={`/company/profile/${item._id}`} key={item._id}>
                                                        <h6>{item.name}</h6>
                                                    </Link>
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
export default connect(null, mapDispatchToProps)(withRouter(DevHome));
