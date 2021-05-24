import React, { Component } from 'react';



import SelectRow from "../../components/Select/SelectRow"
import { Button, Form, FormControl } from "react-bootstrap";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { Link, withRouter } from "react-router-dom";
import profile from "../../assets/images/profile.png";
import CompanyHeader from "./CompanyHeader";
import CoreEngine from "../../core/CoreEngine";
import RequestEngine from "../../core/RequestEngine";
import loadingAction from "../../core/redux/actions/loadingAction";
import { connect } from "react-redux";
import strings from "../../core/translate";

class Viewapplicantlist extends CoreEngine {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            selectedrow: -1,
            status: "",
            filterjobid :undefined,
            filterjobname:""

        }
        this.engine = new RequestEngine();
    }
    componentDidMount() {

        const filterjobid = this.props.match.params.id
      //  debugger
        if(filterjobid){
            this.setState({
                filterjobid:filterjobid
            })
        }
        this.callPage()
    }
    async callPage() {
        this.props.loadingAction(true);
        this.setState({
            loading: true,
        })
        const response = await this.engine.getItem("job", "/applicant/list");

        const {filterjobid} = this.state

        if (response && response.status === 200) {

            let data = response.data.data
            if(filterjobid){
                // debugger
                data = data.filter(i=>i.job && i.job.id==filterjobid)

                // debugger
                if(data && data[0] &&  data[0].job){
                    this.setState({
                        filterjobname:data[0].job.name
                    })
                }

            }

            this.setState({
                loading: false,
                data: data,
                selectedrow: 0,
                status: response.data.data.length > 0 ? response.data.data[0].status : ""
            }
            );
        }
        this.props.loadingAction(false);
    }

    changeConversation = (row) => this.setState({ selectedrow: row, status: this.state.data[row].status, });

    changeInputStatus = (event, stateName) => {
        // debugger
        if (!event) {
            this.setState({ [stateName]: "" });
        } else {
            this.setState({ [stateName]: event.value }, () => this.updateStatus()); // select input
        }
    };
    updateStatus = async () => {
        this.setState({
            loading: true
        })
        try {
            const { data, selectedrow, status } = this.state

            const params = {
                status: status,
                id: data[selectedrow]._id,
            }

           await this.engine.postItem("job/applicant", params, "updatestatus")

            this.callPage();
            //if(response && response.status === 200){
            //  this.showSucessMessage("Updated!")
            // }
        } catch (e) {
            this.showErrorMessage("error please try again")
        }

        this.setState({
            loading: false
        })

    };

    render() {

        const { data, selectedrow, loading, status,filterjobid,filterjobname } = this.state

        let profilepicture = profile
        if (selectedrow !== -1 && data[selectedrow] && data[selectedrow].user && data[selectedrow].user.fullpicture) {
            profilepicture = data[selectedrow].user.fullpicture
        }
        return (
            <>
                <Header />
                <CompanyHeader selected={2} />
                <div className="py-5 bg-info">
                    <div className="container">

                        {filterjobname && filterjobname.length>2 && <div className="row ">
                            <div className="p-3 col-lg-6 col-md-6 mx-auto text-center">
                                <h3 className="mt-3 font-weight-bold"> Job title : {filterjobname}</h3>
                            </div>
                        </div>}
                        <div className="row d-flex  bg-white  ">
                            <div className=" col-lg-4 col-md-4 pl-0 pr-0 borderwrap">
                                <div className="listscrollheader">
                                    <h5 className="font-weight-bold ">Applicants </h5>
                                    <h6 className="">Sort By: Skills Match </h6>
                                </div>

                                <div className="listscrollapplicant">
                                    {data && data.map((item, index) => {
                                        let profilepicture = profile
                                        if (item.user && item.user.fullpicture) {
                                            profilepicture = item.user.fullpicture
                                        }

                                        return <div key={item} className={"d-flex borderwrap pointer " + ((index === selectedrow) && "selectedmsg")} onClick={() => this.changeConversation(index)}>
                                            <div className="listscrollimg">
                                                <img src={profilepicture} width="60" className="pt-0" />
                                            </div>
                                            <div className="listscrolltext">
                                                <h5>{item.user && item.user.name}</h5>
                                                <h6> {item.job && <h6 className="mt-0  ">Applied for <Link className={"text-primary"} to={"/viewjobinfo/" + item.job._id}>{item.job.name}</Link></h6>}</h6>
                                                <h6>{item.user && item.user.skillsmatch!="0/0"?item.user.skillsmatch+" Skills Match":"No Matching Skill"}  </h6>

                                            </div>
                                        </div>
                                    })}
                                </div>

                            </div>
                            <div className="applicantprofile col-lg-8 col-md-8 borderwrap">
                                {
                                    !loading && data.length === 0
                                        ? <div>{strings.no_applicants}</div>
                                        : (selectedrow !== -1) && data[selectedrow] && data[selectedrow].user &&
                                        <>
                                            <div className="card border-0">
                                                <div className="card-body p-0">
                                                    <div className={"d-flex"}>
                                                        <div>
                                                            <img src={profilepicture} width="104" className="pt-0" />
                                                        </div>
                                                        <div className="pt-2 text-left">
                                                            <h5 className="mt-4 ">{data[selectedrow] && data[selectedrow].user.name}</h5>
                                                            {data[selectedrow].job && <h6 className="mt-0  ">Applied for <Link className={"text-primary"} to={"/viewjobinfo/" + data[selectedrow].job._id}>{data[selectedrow].job.name}</Link></h6>}
                                                            <h5 className="mt-2 ">{data[selectedrow] && data[selectedrow].user.type.name} </h5>


                                                            <div style={{ width: 200 }} >
                                                                <SelectRow hidelabel={true} name="status" defaultValue={status} changeInput={this.changeInputStatus.bind(this)} data={this.createSelectValue(["Contacted", "Interviewed", "Hired", "Rejected", "Pending"], false)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h5 className="mt-4 font-weight-bold ">Cover Letter </h5>
                                                    <div>
                                                        {data[selectedrow] && data[selectedrow].coverletter}
                                                    </div>
                                                    <h5 className="mt-3 font-weight-bold ">Skills </h5>
                                                    <div>
                                                        {data.length == !0 ? data[selectedrow] && data[selectedrow].user.skills.map((item, index) => {
                                                            return <div key={index} className="mb-3 tag btntag searchtag btn-secondary bg-white text-primary border-primary">{item.name}</div>
                                                        }) : <div>No matching skill</div>}
                                                    </div>
                                                    {data[selectedrow] && data[selectedrow].answers.map((item, index) => {
                                                        return <div key={index}>
                                                            <h5 className="mt-3 font-weight-bold ">{item.question} </h5>
                                                            <div>
                                                                {item.answer}
                                                            </div>
                                                        </div>
                                                    })}
                                                </div>
                                            </div>
                                            <div className="mt-5">
                                                {data[selectedrow] && data[selectedrow].user && data[selectedrow].user.cv && data[selectedrow].user.cv.length > 2 && <a target="_blank" href={data[selectedrow].user.fullcv} className="btnpostajob btn btn-sm text-white  btn-secondary p-2 m-2 pr-5 pl-5 font-weight-bold">
                                                    Download CV
                                                </a>}
                                                <Link to={"/dev/profile/" + (data[selectedrow] && data[selectedrow].user._id)} className="btnfindajob btn-sm  btn btn-sm  btn-outline-secondary p-2 m-2 pr-5 pl-5 font-weight-bold" >
                                                    View Profile
                                            </Link>
                                            </div>
                                        </>
                                }
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
export default connect(null, mapDispatchToProps)(withRouter(Viewapplicantlist));
