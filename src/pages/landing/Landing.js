import React, { Component } from 'react';

import dashboard from "../../assets/images/man_woman_freelancers_transparent.png"

import {
    Link, withRouter
} from "react-router-dom";

import Header from "../common/Header"
import Footer from "../common/Footer"
import WhyUs from "./partialComponents/WhyUs"
import Hire from "./partialComponents/Hire"
import Statistics from "./partialComponents/Statistics"

import { connect } from "react-redux";
import loadingAction from "../../core/redux/actions/loadingAction";
import Testimonials from "./partialComponents/Testimonials"
import EasyToStart from "./partialComponents/EasyToStart"
import MostActive from "./partialComponents/MostActive"


import { Button, Form, FormControl } from "react-bootstrap";
import mapbanner from "../../assets/images/map-banner.png";
import btnsearch from "../../assets/images/btnsearch.png";
import RequestEngine from "../../core/RequestEngine";

import { Utilites } from "../../core/Utilites";
import { Memory } from "../../core/Memory";
import strings from "../../core/translate";

class Landing extends Component {


    constructor(props) {
        super(props);
        this.state = {
            skilllist: [],
            statistics: {},
            testimonials: [],
            companylist: [],
            loading: false,
            searchkey: "",
        }
        this.engine = new RequestEngine();
    }

    componentWillMount() {
        const isLoggedin = Memory.getItem("isloggedin")

        const accounttype = Memory.getItem('accounttype');
        const userid = Memory.getItem("userid")

        let iscompany = accounttype=="company"
        let homelink = "/"
        if(isLoggedin){
            homelink = iscompany ?"/company/home":"/dev/home"
            this.props.history.push(homelink);
        }
    }


    componentDidMount() {
        this.callPage()
    }
    async callPage() {
        this.props.loadingAction(true);
        const response = await this.engine.getItem("home", "/frontend");

        this.setState({
            loading: true,
        })

        if (response && response.status === 200) {
            this.setState({
                loading: false,
                skilllist: response.data.data.skilllist,
                statistics: response.data.data.statistics,
                testimonials: response.data.data.testimonials,
                companylist: response.data.data.companylist


            }
            );
        }
        this.props.loadingAction(false);
    }



    render() {


        const { skilllist, statistics, testimonials, searchkey, companylist } = this.state;
        let isloggedin = Memory.getItem('isloggedin');
        const accounttype = Memory.getItem('accounttype');

        let iscompany = accounttype == "company";
        return (
            <>
                <Header />
                <div className="landing-first-banner">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <h1 className="mb-3 font-weight-bold">Find Quality Tech Professionals</h1>
                                <p className="lead">Search jobs by skills & experience needed. Hire full-time, part-time, or project-based tech professionals.</p>
                                <div className="btnGroup">
                                    <Button to="/postajob" onClick={() => {
                                        const accounttype = Memory.getItem("accounttype");
                                        if (accounttype && accounttype == "company") {
                                            this.props.history.push('/postajob');
                                        } else {
                                            this.props.history.push('/login', {
                                                redirect: '/postajob'
                                            });
                                        }

                                    }} className="btnpostajob btn btn-sm btn-secondary font-weight-bold" >
                                        Post a job
                                    </Button>
                                    <Link to="/jobs" className="btnfindajob btn btn-sm btn-outline-secondary font-weight-bold border-2" >
                                        Find a job
                                    </Link>
                                    <FormControl maxlength="250" type="text" value={searchkey} onKeyPress={event => {
                                        if (event.key === "Enter") {
                                            this.props.history.push('/talentdirectory?' + searchkey);
                                        }
                                    }} onChange={searchkey => {
                                        this.setState({ searchkey: searchkey.target.value }
                                        )
                                    }} placeholder={strings.search_talent} className="txtsearch " />
                                    <a href="#" id="searchicon" onClick={() => {
                                        this.props.history.push('/talentdirectory?' + searchkey);
                                    }}><img src={btnsearch} /></a>
                                </div>
                            </div>

                            <div className="col-md-7 d-none d-md-block">
                                <img src={mapbanner} className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>


                <Statistics statistics={statistics} />
                <WhyUs />
                <Hire />
                <EasyToStart />


                <div className="py-1 bg-primary mb-4">
                    <div className="container">
                        <div id="mostsearchedskillssect" className="row">
                            <div className="text-center col-md-4 mx-auto text-light pt-5">
                                <h3 className="">Most Searched Skills</h3>
                            </div>
                        </div>
                        <div className="row align-content-center text-white paddingmobile">

                            {skilllist.map((item, index) => {
                                return (<div key={index} className=" col-md-3 mx-auto mostsearchd">
                                    <li><Link to={"talentdirectory?" + item.name} className="text-white pointer"><div className="skillstyle">{item.name}</div></Link></li>
                                </div>)
                            })}

                            <div className="text-center col-md-12 mx-auto pb-4">

                                <Link to="/allskills" style={{ border: "2px solid white" }} className="btn btn-sm btnpostajob btn-secondary bg-transparent  p-2 m-2 pr-5 pl-5 font-weight-bold " >
                                    View all
                                </Link>
                            </div>


                        </div>


                    </div>
                    <div id="mostactivecompaniessect2"></div>
                </div>
                <MostActive companylist={companylist} />

                <Testimonials testimonials={testimonials} />
                <div className="py-1  ">
                    <div className="container">

                        <div className="row d-flex justify-content-center text-center mobilereverse ">
                            <div className="col-lg-6 col-md-6">
                                <div className="border-0">
                                    <img src={dashboard} width="560" style={{
                                        position: "relative",
                                        top: 5
                                    }} className="img-fluid mt-5" />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 ">
                                <div className=" border-0">
                                    <div className="card-body mt-0 mb-0 mt-sm-4 mb-sm-4 text-left mobilecenter">
                                        <h1 className="mt-5 ml-3 p-1 text-left mobilecenter" style={{
                                            fontFamily: "Proxima Nova Bold", color: "#4A4A4A", letterSpacing: 0.2, lineHeight: "48px", fontSize: "40px",
                                        }}>Join Us & Start Earning Money Today </h1>

                                        {isloggedin || iscompany ? "" :

                                            <Link to="/selectanaccount" variant="primary" className="btn btn-sm btnpostajob  btn-secondary p-3 m-4 pr-4 pl-4 ml-0 font-weight-bold"
                                                style={{ letterSpacing: 0.3, fontSize: 16, height: "56px", width: "237px", lineHeight: "20px" }}>
                                                {strings.create_an_account}
                                            </Link>}
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


const mapDispatchToProps = dispatch => ({
    loadingAction: (payload) => dispatch(loadingAction(payload))
});
export default connect(null, mapDispatchToProps)(withRouter(Landing));
