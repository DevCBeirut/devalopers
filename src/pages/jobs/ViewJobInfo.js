import React, { Component } from 'react';



import { Button, Form, Modal } from "react-bootstrap";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { Link, withRouter } from "react-router-dom";
import loadingAction from "../../core/redux/actions/loadingAction";
import redirectAction from "../../core/redux/actions/redirectAction";

import { connect } from "react-redux";
import RequestEngine from "../../core/RequestEngine";
import CoreEngine from "../../core/CoreEngine";
import { AvForm } from "availity-reactstrap-validation";
import FormRow from "../../components/Row/FormRow";
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";
import { Memory } from "../../core/Memory";
import FontAwesome from "react-fontawesome";
import SelectRow from "../../components/Select/SelectRow";

import strings from "../../core/translate";

class ViewJobInfo extends CoreEngine {


    constructor(props) {
        super(props);
        this.state = {
            otherjob: [],
            similar: [],
            info: {},
            coverletter: "",
            saved: false,
            btnloading: false,
            loading: false,
            show: false,
            showsuccess: false,
            alreadyapplied: false,
            expired:false,
        }
        this.engine = new RequestEngine();
        this.questionlistvalue = []
    }
    componentDidMount() {
        const jobinfoid = this.props.match.params.id
        this.callPage(jobinfoid)
    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.callPage(nextProps.match.params.id)
        }
    }
    async callPage(jobinfoid) {
        this.props.loadingAction(true);
        const response = await this.engine.getItem("job/info", "/" + jobinfoid);
        this.setState({
            loading: true,
        })
        if (response && response.status === 200) {
            this.setState({
                loading: false,
                info: response.data.data.info,
                otherjob: response.data.data.otherjob,
                similar: response.data.data.similar,
                saved: response.data.data.saved,
                alreadyapplied: response.data.data.alreadyapplied,
                expired:response.data.data.expired,
            }
            );
        }
        this.props.loadingAction(false);
    }

    handleValidSubmit = async () => {

        const { coverletter, show, info } = this.state

        // if(coverletter.length<1){
        // this.showErrorMessage("Cover letter is required")
        //  return
        // }

        let missingAns = false
        info.questionlist && info.questionlist.map((item, index) => {
            let questionfound = this.questionlistvalue.find(v => v.key === "selector" + index);
            if (item.required && !questionfound) {
                missingAns = true;
            }
        })

        if (missingAns) {
            this.showErrorMessage("Please answer the required questions")
            return
        }
        // debugger
        const jobinfoid = this.props.match.params.id
        this.setState({
            loading: true
        })
        try {


            let data = {
                jobid: jobinfoid,
                coverletter: coverletter
            }


            let questionlistdata = []
            info.questionlist && info.questionlist.map((item, index) => {
                let questionfound = this.questionlistvalue.find(v => v.key === "selector" + index);
                if (questionfound) {
                    questionlistdata.push({ question: item.question, answer: questionfound.value })
                }
            })

            data.answerlist = questionlistdata;
            const response = await this.engine.postItem("job", data, "applicant/submit")

            if (response && response.status === 200) {
                if (response.data.success) {
                    this.setState({
                        alreadyapplied: true,
                        showsuccess: true
                    })
                } else {
                    this.showErrorMessage(response.data.message)
                }

            }
        } catch (e) {
            this.showErrorMessage("Error please try again")
        }

        this.setState({
            loading: false
        })

    };
    handleClose(show) {
        this.setState({
            show: !show
        })
    }

    async saveJob() {

        const jobinfoid = this.props.match.params.id
        this.setState({
            loading: true,
            btnloading: true,
        })
        try {
            const response = await this.engine.getItem("user", "/savejob/" + jobinfoid)
            if (response && response.status === 200) {
                this.setState({ saved: response.data.data.saved, btnloading: false })
            }
        } catch (e) {
            this.showErrorMessage("Error please try again")
        }

        this.setState({
            loading: false,
            btnloading: false
        })
    }

    changeQuestionValue = (event, stateName) => {
        let found = this.questionlistvalue.find(v => v.key === stateName)
        // debugger
        const value = event.target ? event.target.value : event.value;
        if (found) {
            found.value = value;
        } else {
            this.questionlistvalue.push({ key: stateName, value: value })
        }
        this.forceUpdate()
    };


    hideApplyForm() {
        const { show } = this.state
        this.handleClose(show)
    }
    render() {

        const { similar, alreadyapplied, otherjob, info, show, coverletter,expired, loading, saved, btnloading, showsuccess } = this.state
        let companyname = ""
        let companyid = ""
        let loggedid = Memory.getItem("userid")
        if (info && info.company && info.company.name) {
            companyname = info.company.name;
            companyid = info.company._id;
        }

        let owner = (loggedid === companyid);

        let showsalery = false
        if (info && info.salary) {
            showsalery = true;
        }

        let showskills = false
        if (info && info.skills && info.skills.length) {
            showskills = true;
        }

        let showeducation = false
        if (info && info.education) {
            showeducation = true;
        }



        let showeyearsexp = false
        if (info && info.yearsexp) {
            showeyearsexp = true;
        }

        let showlocation = false
        if (info && info.location) {
            showlocation = true;
        }



        const renderquestionlist = info && info.questionlist && info.questionlist.map((qus, index) => {
            let questionvalue = this.questionlistvalue && this.questionlistvalue.find(item => item.key === "selector" + index)
            let keyvalue = ""
            if (questionvalue) {
                keyvalue = questionvalue.value;
            }

            let showrequired = false;
            if (qus.required && qus.required === true) {
                showrequired = true
            }
            // debugger

            return (<div>
                <h6 className="mb-3 font-weight-bold ">{qus.question} <span className="required">{showrequired && "*"}</span></h6>
                {qus.yesno && <SelectRow hidelabel={true} required={true} name={"selector" + index} defaultValue={keyvalue} changeInput={this.changeQuestionValue.bind(this)} data={this.createSelectValue(["Yes", "No"], false)} />}
                {!qus.yesno && <FormRow hidelabel={true} type={"textarea"} name={"selector" + index} data={keyvalue} changeInput={this.changeQuestionValue.bind(this)} />}
            </div>)
        })
        return (
            <>
                <Header />
                <div className="py-5 bg-info viewjobs">
                    <div className="container">
                        <div className="row d-flex">

                            <div className="col-7">
                                <div className="card border-0 borderwrap bg-white m-2 p-1">
                                    <div className="card-body p-4 pt-0">
                                        <div className={"row"}>
                                            <div className="pl-3 pt-0 text-left">
                                                <h4 className="mt-0 font-weight-bold">{info && info.name}</h4>

                                                <h6 className="mt-3 ">{info && info.jobtype} • Posted {info && this.renderDate(info.createdAt)} </h6>
                                            </div>
                                        </div>
                                        <h5 className="mt-3 greyheader ">Description </h5>
                                        <div className="description-info">
                                            {info && info.description ? info.description : strings.no_description}
                                        </div>

                                        {showskills && <h5 className="mt-3 greyheader ">Skills </h5>}
                                        <div>
                                            {
                                                info.skills && info.skills.map(i => {
                                                    return <div className="mb-3 tag btntag searchtag btn-secondary bg-white text-primary border-primary">{i.name}</div>
                                                })
                                            }
                                        </div>

                                        {showeyearsexp && <><h5 className="mt-3 greyheader ">Years of Experience </h5>
                                            <div className="font-weight-bold">
                                                {info && info.yearsexp}
                                            </div></>}

                                        {showsalery && <><h5 className="mt-3 greyheader ">Salary </h5>
                                            <div className="font-weight-bold">
                                                {info && info.salary}
                                            </div></>}

                                        {showeducation && <><h5 className="mt-3 greyheader ">Education Level </h5>
                                            <div className="font-weight-bold">
                                                {info && info.education}
                                            </div></>}
                                        {showlocation && <><h5 className="mt-3 greyheader ">Location </h5>
                                            <div className="font-weight-bold">
                                                {info && info.location}
                                            </div></>}



                                        {info && info.fullfile && <><h5 className="mt-3 greyheader ">Attachment </h5>
                                            <div className="font-weight-bold">
                                                <a href={info.fullfile} target="_blank" className="mb-3 btntag searchtag btn-secondary bg-transparent text-primary border-0">
                                                    Download <FontAwesome name="file" size="1x" />
                                                </a>
                                            </div></>}




                                    </div>
                                    <div className="font-weight-bold">
                                        {info.acceptremote && <div className="tag mb-3  btntag  text-secondary ">Remote</div>}

                                    </div>
                                </div>
                                {owner ? <div className="mt-4">
                                    <Link to={"/editjob/" + info._id} className="btnpostajob btn btn-sm  btn-secondary p-2 m-2 pr-5 pl-5 font-weight-bold" >
                                        Edit
                                    </Link>
                                    <Link to={"/company/filterapplicantslist/"+info._id} className="btnfindajob btn-sm  btn btn-sm  btn-outline-secondary p-2 m-2 pr-5 pl-5 font-weight-bold" >
                                        View Applicants
                                    </Link>
                                </div> : <div className="mt-4">
                                        {!alreadyapplied && <Link onClick={() => {

                                            if(expired){
                                                this.showErrorMessage("Job Already Expired ");
                                                return;
                                            }
                                            const isloggedin = Memory.getItem('isloggedin');
                                            const jobinfoid = this.props.match.params.id
                                            if (!isloggedin) {
                                                this.props.redirectAction("/viewjobinfo/" + jobinfoid)
                                                this.goToScreen('/login')
                                            } else {
                                                this.setState({ showsuccess: false, coverletter: "" })
                                                this.handleClose(show)
                                            }

                                        }} className="btnpostajob btn btn-sm  btn-secondary p-2 m-2 pr-5 pl-5 font-weight-bold" >
                                            Apply
                                    </Link>}
                                        {alreadyapplied && <Link onClick={() => {

                                            this.showErrorMessage("You have already applied to this job")

                                        }} className="btnpostajob btn btn-sm  btn-secondary p-2 m-2 pr-5 pl-5 font-weight-bold" >
                                            Applied
                                    </Link>}
                                        <ButtonLoader variant="primary" loading={btnloading} onClick={() => {

                                            const isloggedin = Memory.getItem('isloggedin');
                                            const jobinfoid = this.props.match.params.id
                                            if (!isloggedin) {
                                                this.props.history.push('/login', {
                                                    redirect: '/viewjobinfo/' + jobinfoid
                                                });
                                            } else {
                                                this.saveJob(info)
                                            }
                                        }} className="btnfindajob btn-sm  btn btn-sm  btn-outline-secondary p-2 m-2 pr-5 pl-5 font-weight-bold" >
                                            {saved ? "Saved" : "Save"}
                                        </ButtonLoader>
                                    </div>}
                            </div>

                            <div className=" col-lg-4 col-md-4 pl-0 pr-0   ml-5 m-2">

                                <h5 className="m-3 font-weight-bold ">Other Jobs By  <Link to={"/company/profile/" + companyid} className=" p-1 text-primary"  >
                                    {companyname}
                                </Link></h5>
                                {otherjob.length === 0 && <h5 className="m-2">No data available</h5>}


                                <div className="bg-white">
                                    {otherjob.map((item, index) => {
                                        return <div key={index} className=" p-1 borderwrap">
                                            <Link to={"/viewjobinfo/" + item._id}><h5 className="m-3 font-weight-bold text-primary ">{item.name} </h5></Link>
                                            <h6 className="m-3  ">{companyname} . {item.jobtype} </h6>
                                            <h6 className="m-3  ">{item.jobtype} . {item.company.name} • {this.renderDate(item.fromduration)} • ({item.salary ? item.salary : strings.no_salary}) </h6>
                                            <h6 className="m-3  ">{item.description.substring(0, 120)}...</h6>
                                        </div>
                                    })}

                                </div>

                                <h5 className="m-3 font-weight-bold ">Recommended Jobs </h5>
                                {similar.length === 0 && <h5 className="m-2">No data available</h5>}

                                <div className="bg-white">
                                    {similar.map((item, index) => {
                                        return <div key={index} className=" p-1 borderwrap">
                                            <Link to={"/viewjobinfo/" + item._id}><h5 className="m-3 font-weight-bold text-primary ">{item.name} </h5></Link>
                                            <h6 className="m-3  ">{companyname} . {item.jobtype} </h6>
                                            <h6 className="m-3  ">{item.jobtype} . {item.company.name} • {this.renderDate(item.fromduration)} • ({item.salary ? item.salary : strings.no_salary}) </h6>
                                            <h6 className="m-3  ">{item.description.substring(0, 120)}...</h6>
                                        </div>
                                    })}

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <Modal show={show} onHide={() => this.handleClose(show)}  >
                    <AvForm onValidSubmit={() => this.handleValidSubmit()} className="form-horizontal liteinput" id="TypeValidation">
                        <Modal.Header closeButton>
                            {!showsuccess && <Modal.Title className="mx-auto " ><h3 className="font-weight-bold align-content-center mx-auto ">Apply to {info && info.name} at {companyname}</h3>
                                <h5>Please make sure you have uploaded your latest CV version on your profile before applying to the job</h5>
                            </Modal.Title>}
                        </Modal.Header>
                        <Modal.Body>
                            {!showsuccess && <div>
                                <h6 className="mb-3 font-weight-bold ">Cover letter </h6>
                                <FormRow hidelabel={true} required={false} style={{ height: 180 }} type={"textarea"} name="coverletter" data={coverletter} changeInput={this.changeInput.bind(this)} />
                                {renderquestionlist}
                            </div>}

                            {showsuccess && <div className=" text-center ">
                                <FontAwesome name="check" className="text-secondary" size="5x" />

                                <h6 className="m-3 font-weight-bold text-center text-black-50 ">Your Application has been sent successfully!</h6>
                                <Button variant="secondary" className=" text-center " onClick={() => this.hideApplyForm()}>
                                    Done
                            </Button>
                            </div>}
                        </Modal.Body>
                        {!showsuccess && <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleValidSubmit()}>
                                Apply
                        </Button>

                        </Modal.Footer>}
                    </AvForm>
                </Modal>
                <Footer />
            </>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    loadingAction: (payload) => dispatch(loadingAction(payload)),
    redirectAction: (payload) => dispatch(redirectAction(payload))
});

export default connect(null, mapDispatchToProps)(withRouter(ViewJobInfo));
