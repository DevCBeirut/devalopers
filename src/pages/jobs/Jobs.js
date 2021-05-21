import React from 'react';

import { Link, withRouter } from "react-router-dom";
import { PaginationItem, PaginationLink, Pagination } from 'reactstrap';
import { FormControl } from "react-bootstrap";
import Header from "../common/Header";
import Footer from "../common/Footer";
import SideSearch from "../common/SideSearch";
import loadingAction from "../../core/redux/actions/loadingAction";
import { connect } from "react-redux";
import RequestEngine from "../../core/RequestEngine";
import CoreEngine from "../../core/CoreEngine";
import { Memory } from "../../core/Memory";

import strings from "../../core/translate";

class Jobs extends CoreEngine {

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
           // const { page } = this.state
           // this.callPage(page)
            this.searchAction(null, null, [])
        }
    }
    async callPage(page) {
        this.props.loadingAction(true);
        this.setState({
            loading: true,
        })
        const response = await this.engine.getItem("job", "/list/" + page);



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
    async searchAction(startdate, enddate, skills, fulltime, parttime, projectbasis, isremote, minsalary, maxsalary, matchesAllSkills, excludeNoSalary, country) {

        this.props.loadingAction(true);

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
            isjob: true,
            matchesAllSkills,
            excludeNoSalary,
            country
        }
        const response = await this.engine.postItem("job", data, "search");

        this.setState({
            loading: true,
        })

        if (response && response.status === 200) {
            this.setState({
                loading: false,
                data: response.data.data,
                count:1,
                page:0,
                jobsCount:response.data.data.length
            }
            );
        }
        this.props.loadingAction(false);
    }


    render() {

        const { skills, data, searchkey, loading, count,jobsCount } = this.state
        let filteredData = data;
        if (searchkey.length > 0) {
            filteredData = data.filter(i => i.company.name.toLowerCase().includes(searchkey) 
            || i.name.toLowerCase().includes(searchkey) 
            || i.description.toLowerCase().includes(searchkey)
            || i.location.toLowerCase().includes(searchkey)
            || i.jobtype.toLowerCase().includes(searchkey)
            || i.skills.find(skill=> skill.name.toLowerCase().includes(searchkey))
            )
        }

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= count; i++) {
            pageNumbers.push(i);
        }
        let renderPageNumbers = pageNumbers.map((number, index) => {
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
        if(count<2){
            renderPageNumbers = <div></div>;
        }

        return (
            <>
                <Header />
                <div className="bg-info ">
                    <div>
                        <div className="row">
                            <SideSearch skills={skills} searchAction={this.searchAction.bind(this)} />
                            <div className="jobs-filter col-md-9">
                                <h2 className="mb-0 font-weight-bold">Jobs ({jobsCount})</h2>
                                <div className="row mb-4">
                                    <div className="col-lg-4" style={{ height: 58 }}>
                                        <FormControl maxlength="250" type="text" value={searchkey} placeholder="&#xF002; Search by Keyword" onChange={searchkey => {
                                            this.setState({ searchkey: searchkey.target.value.toLowerCase() })
                                        }} className="txtsearch mr-sm-2 mt-2 mb-2" style={{ fontFamily: "FontAwesome, Arial", padding: "10px 8px 10px 8px", height: "37px" }} />
                                    </div>
                                </div>



                                {!loading && filteredData.length === 0 && <div className="jobsitem mt-4">
                                    <div className="row">
                                        <div className="col-md-7 font-weight-bold">
                                            <h4 className="mb-3 font-weight-bold ">No Jobs Found !</h4>
                                        </div>
                                    </div>
                                </div>}

                                {filteredData.map((item, index) => {
                                    return <div key={index} className="jobsitem mb-4">
                                        <div className="row">
                                            <div className="col-md-7 font-weight-bold">
                                                <Link to={"/viewjobinfo/" + item._id} className="text-dark"><h4 className="mb-1 font-weight-bold ">{item.name}</h4></Link>
                                                <h5 className="mb-2 jobdate">{item.company && item.company.name} • {this.renderDate(item.fromduration)} • ({item.salary ? item.salary : strings.no_salary})</h5>
                                            </div>
                                            {item.jobtype && <div className="col-md-5 font-weight-bold text-right mobileleft">
                                                {item.acceptremote && <div className="tag mb-3 btntag  text-secondary ">Remote</div>}
                                                <div className="tag mb-3 btntag  text-secondary ">{item.jobtype}</div>
                                            </div>}

                                        </div>
                                        <div className="row">
                                            <div className="col-md-11">
                                                <h6>{item.description.substring(0, 255)}...</h6>
                                            </div>
                                        </div>
                                    </div>
                                })}

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
export default connect(null, mapDispatchToProps)(withRouter(Jobs));
