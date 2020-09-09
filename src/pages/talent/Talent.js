import React, { Component } from 'react';


import {
    Pagination,
    PaginationItem,
    PaginationLink,
} from 'reactstrap';
import { FormControl } from "react-bootstrap";
import Header from "../common/Header";
import Footer from "../common/Footer";
import SideSearch from "../common/SideSearch";
import CoreEngine from "../../core/CoreEngine";
import RequestEngine from "../../core/RequestEngine";
import loadingAction from "../../core/redux/actions/loadingAction";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import profile from "../../assets/images/profile.png";
import { Memory } from "../../core/Memory";

class Talent extends CoreEngine {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            skills: [],
            searchkey: "",
            loading: false,
            page: 0,
            count: 0
        }
        this.engine = new RequestEngine();
    }
    componentDidMount() {
        let key = this.props.history.location.search
        if (key) {
            let { skills } = this.state
            key = key.replace("?", "");
            skills.push({ value: key, label: key });
            this.setState({ skills: skills })
            this.searchAction(null, null, skills)
        } else {
            const { page } = this.state
            this.callPage(page)
        }


    }
    async callPage(page) {
        this.props.loadingAction(true);
        const response = await this.engine.getItem("dev", "/list/" + page);

        this.setState({
            loading: true,
        })

        if (response && response.status === 200) {
            this.setState({
                loading: false,
                data: response.data.data.data,
                count: response.data.data.count,
                page: page,
            }
            );
        }
        this.props.loadingAction(false);
    }
    async searchAction(startdate, enddate, skills, fulltime, parttime, projectbasis, isremote, minsalary, maxsalary, matchesAllSkills, excludeNoSalary, country, selectedtalent = []
    ) {

        this.props.loadingAction(true);
        this.setState({
            loading: true,
        })

        let isguest = false;
        let isloggedin = Memory.getItem('isloggedin');
        if (!isloggedin || isloggedin === "false") {
            isguest = true;
        }
        const data = {
            skills: skills,
            fulltime: fulltime,
            parttime: parttime,
            projectbasis: projectbasis,
            isremote: isremote,
            minsalary: minsalary,
            maxsalary: maxsalary,
            startdate: startdate,
            enddate: enddate,
            isguest: isguest,
            isjob: false,
            selectedtalent: selectedtalent,
            matchesAllSkills,
            excludeNoSalary,
            country,

        }
        const response = await this.engine.postItem("job", data, "search");

        if (response && response.status === 200) {
            this.setState({
                loading: false,
                data: response.data.data,
                    count:1,
                    page:0
            }
            );
        }
        this.props.loadingAction(false);
    }




    render() {

        const { data, skills, searchkey, loading, count } = this.state;
        let filteredData = data;
        if (searchkey.length > 0) {
            filteredData = data.filter(i => i.name.toLowerCase().includes(searchkey) || i.description.toLowerCase().includes(searchkey))
        }

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= count; i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map((number, index) => {
            return (
                <PaginationItem key={index}>
                    <PaginationLink
                        onClick={() => this.callPage(number)}
                    >
                        {number}

                    </PaginationLink>
                </PaginationItem>
            );
        });

        return (
            <>
                <Header />

                <div className="bg-info ">
                    <div>
                        <div className="row">
                            <SideSearch skills={skills} istalent={true} searchAction={this.searchAction.bind(this)} />

                            <div className="talents-filter col-md-9">
                                <h2 className="mb-0 font-weight-bold">Talent</h2>
                                <div className="row">
                                    <div className="col-lg-4" style={{ height: 58 }}>
                                        <FormControl maxlength="250" type="text" value={searchkey} placeholder="&#xF002; Search by Keyword" onChange={searchkey => {
                                            this.setState({ searchkey: searchkey.target.value.toLowerCase() })
                                        }} className="txtsearch mr-sm-2 mt-2 mb-2" style={{ fontFamily: "FontAwesome, Arial", padding: "10px 8px 10px 8px", height: "37px" }} />
                                    </div>
                                </div>

                                {!loading && filteredData.length === 0 && <div className="jobsitem mt-4">
                                    <div className="row">
                                        <div className="col-md-7 font-weight-bold">
                                            <h4 className="mb-3 font-weight-bold ">No Talents Found !</h4>
                                        </div>
                                    </div>
                                </div>}
                                <div className="row talents">
                                    {filteredData && filteredData.map((item, index) => {
                                        let profilepicture = profile
                                        if (item.fullpicture) {
                                            profilepicture = item.fullpicture
                                        }
                                        return <div key={index} className="pt-0 col-xl-4 col-lg-6 col-md-6  talent-profile">
                                            <div className="text-center">
                                                <Link to={"/dev/profile/" + item._id}   >
                                                    <img src={profilepicture} width="80" height="80" className="pt-0" alt={item.name} />
                                                </Link>
                                            </div>
                                            <div className="card border-0">
                                                <div className="card-body text-center">
                                                    <Link to={"/dev/profile/" + item._id} className="text-primary">
                                                        <h4 className="font-weight-bold deepgray ">{item.name}</h4>
                                                    </Link>
                                                    <h5 className="mt-1 ">{item.type.name}</h5>
                                                    <h5 className=" text-primary font-weight-bold">
                                                        <FontAwesome name="map-marker" className="m-2" size="1x" />
                                                        {item.location}
                                                    </h5>
                                                    <div className="filter-tags" style={{ textOverflow: "ellipsis" }}>
                                                        {item.skills && item.skills.map(i => {
                                                            return <div className="mb-1 tag btntag searchtag bg-white">{i.name}</div>
                                                        })}
                                                    </div>

                                                    <hr />
                                                    <Link to={"/dev/profile/" + item._id} style={{ color: "#4A4A4A" }}>
                                                        <h6 className="mt-3 mb-3">
                                                            View Profile
                                                        </h6>
                                                    </Link>
                                                </div>

                                            </div>
                                        </div>
                                    })}
                                </div>


                                {filteredData.length > 0 && <nav aria-label="Page navigation example">
                                    <Pagination
                                        className="pagination pagination-primary"
                                        listClassName="pagination-primary"
                                    >
                                        {renderPageNumbers}
                                    </Pagination>
                                </nav>}

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
export default connect(null, mapDispatchToProps)(withRouter(Talent));
