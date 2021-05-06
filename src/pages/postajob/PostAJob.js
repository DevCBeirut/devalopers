import React from 'react';
import Header from "../common/Header";
import { Button } from "react-bootstrap";
import Footer from "../common/Footer";
import { AvForm } from "availity-reactstrap-validation";
import FormRow from "../../components/Row/FormRow";
import SelectRow from "../../components/Select/SelectRow"
import CoreEngine from "../../core/CoreEngine";
import RequestEngine from "../../core/RequestEngine";
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";
import loadingAction from "../../core/redux/actions/loadingAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import { Input } from "reactstrap";
import ImageUpload from "../../components/CustomUpload/ImageUpload";
import { selectCountryList } from '../../core/countries';

class PostAJob extends CoreEngine {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            location: "",
            skillslist: [],
            skills: [],
            questionlist: [],
            educationlist:this.createSelectValue(["Bacheloar Degree","Brevet","Eng.","Student"]),
            yearsexp: "",
            _id: "",
            whoview: "",
            jobtype: "",
            toduration: "",
            fromduration: "",
            education: "",
            fileattach: "",
            file: null,
            acceptremote: false,
            salary: "",
            loading: false
        };

        this.questionlistvalue = []
        this.requirelistvalue = []
        this.yesnolistvalue = []
        this.engine = new RequestEngine();
    }
    componentDidMount() {
        this.callPage()
        const edit = this.props.edit
        if (edit) {
            const jobinfoid = this.props.match.params.id
            this.callPageInfo(jobinfoid)
        }
    }

    componentWillReceiveProps(nextProps) {
        //debugger
        if (!this.props.edit || !nextProps.edit) {

               this.setState({
                   name: "",
                   description: "",
                   location: "",
                   //skillslist: [],
                   skills: [],
                   yearsexp: "",
                   _id: "",
                   whoview: "",
                   jobtype: "",
                   toduration: "",
                   fromduration: "",
                   education: "",
                   fileattach: "",
                   file: null,
                   fullfile:"",
                   acceptremote: false,
                   salary: "",
                   loading: false
               })

        }
    }
    async callPageInfo(jobinfoid) {
        this.props.loadingAction(true);
        const response = await this.engine.getItem("job/info", "/" + jobinfoid);
        this.setState({
            loading: true,
        })
        if (response && response.status === 200) {
            const info = response.data.data.info
            let toduration = info.toduration.split("T");
            let fromduration = info.fromduration.split("T");

            const questionlist = info.questionlist
            const acceptremote = info.acceptremote
            questionlist.map((item, index) => {
                this.questionlistvalue.push({ key: "selector" + index, value: item.question })
                this.requirelistvalue.push({ key: "selector" + index, value: item.required })
                this.yesnolistvalue.push({ key: "selector" + index, value: item.yesno })
            })
            this.setState({
                loading: false,
                ...response.data.data.info,
                toduration: toduration[0],
                fromduration: fromduration[0],
            }
            );
        }
        this.props.loadingAction(false);
    }

    changeQuestionValue = (event, stateName) => {
        let found = this.questionlistvalue.find(v => v.key === stateName)
        if (found) {
            found.value = event.target.value;
        } else {
            this.questionlistvalue.push({ key: stateName, value: event.target.value })
        }
        this.forceUpdate()
    };

    changeRequireValue = (event) => {
        const stateName = event.target.name
        let found = this.requirelistvalue.find(v => v.key === stateName)
        if (found) {
            found.value = event.target.checked;
        } else {
            this.requirelistvalue.push({ key: stateName, value: event.target.checked })
        }
        this.forceUpdate()
    };

    changeYesNoValue = (event) => {
        const stateName = event.target.name
        let found = this.yesnolistvalue.find(v => v.key === stateName)
        if (found) {
            found.value = event.target.checked;
        } else {
            this.yesnolistvalue.push({ key: stateName, value: event.target.checked })
        }
        console.log("this.yesnolistvalue", this.yesnolistvalue)
        this.forceUpdate()
    };
    async callPage() {
        this.props.loadingAction(true);
        const response = await this.engine.getItem("skills");
        this.setState({
            loading: true,
        })
        if (response && response.status === 200) {

            const data = response.data.data;
            let skillslist = []
            data.map(p =>
                skillslist.push({ value: p._id, label: p.name })
            )
            this.setState({
                loading: false,
                skillslist: skillslist
            }
            );
        }
        this.props.loadingAction(false);
    }
    handleValidSubmit = async () => {
        const { jobtype, whoview,  toduration,
            fromduration,fileattach} = this.state
        const {edit} = this.props;



        if (jobtype.length === 0 ) {
            this.showErrorMessage("Please fill Job Type");
            return;
        }
        if (whoview.length === 0) {
            this.showErrorMessage("Please Who can view this Job");
            return;
        }

        let moment = require('moment');


        if(moment(fromduration).isAfter(moment(toduration))){
            this.showErrorMessage("Job end date can't be prior than post date");
            return;
        }



        this.setState({
            loading: true
        })
        try {
            let data = { ...this.state }


            // debugger
            let skills = []

            let questionlist = []

            data.questionlist.map((item, index) => {
                let questionfound = this.questionlistvalue.find(v => v.key === "selector" + index);
                let requirefound = this.requirelistvalue.find(v => v.key === "selector" + index);
                let yesnofound = this.yesnolistvalue.find(v => v.key === "selector" + index);

                let required = false
                if (requirefound) {
                    required = requirefound.value;
                }

                let yesno = false
                if (yesnofound) {
                    yesno = yesnofound.value;
                }
                if (questionfound) {
                    questionlist.push({ question: questionfound.value, required: required, yesno: yesno })
                }
            })

            data.questionlist = questionlist;
            data.skills && data.skills.map(p => {
                skills.push(p.value)
            })
            data.skills = skills;
            data.skillslist = []
            if(fileattach && fileattach.name){
                data.realfileattachedname = fileattach.name;
            }

            const response = await this.engine.postItem("job", data, "save")
            if (response && response.status === 200) {
                const jobinfoid = this.props.match.params.id
                if(edit){
                    this.props.history.push('/viewjobinfo/'+jobinfoid);
                }else{
                    this.props.history.push('/company/activejobs');
                }

                this.showSucessMessage("Updated ")
            }
        } catch (e) {
            this.showErrorMessage("error please try again")
        }

        this.setState({
            loading: false
        })

    };

    addQuestion() {
        let { questionlist } = this.state
        if (questionlist.length === 3) {
            this.showErrorMessage("Max 3 question allowed")
            return;
        }
        questionlist.push({ parent: "new question" })
        this.setState({ questionlist })
    }

    deleteQuestion(index) {
        let { questionlist } = this.state
        const newquestions = questionlist.filter((_, i) => i !== index)
        this.setState({ questionlist: newquestions })
    }

    onChangeProfileCV(e) {
        this.setState({ file: e })
    }
    onChangeCv(e) {
        this.setState({ fileattach: e.target.files[0] })
    }
    render() {

        const { name,
            description,
            location,
            skillslist,
            skills,
            yearsexp,
            jobtype,
            acceptremote,
            toduration,
            fromduration,
            salary, loading, questionlist, whoview, file, education,fullfile ,educationlist,fileattach} = this.state
        const { edit } = this.props


        const renderquestionlist = questionlist.map((p, index) => {
            let questionvalue = this.questionlistvalue && this.questionlistvalue.find(item => item.key === "selector" + index)
            let keyvalue = ""
            // debugger
            if (questionvalue) {
                keyvalue = questionvalue.value;
            }

            let requirevalue = this.requirelistvalue && this.requirelistvalue.find(item => item.key === "selector" + index)
            let requirkey = false
            if (requirevalue) {
                requirkey = requirevalue.value;
            }

            let yesnovalue = this.yesnolistvalue && this.yesnolistvalue.find(item => item.key === "selector" + index)
            let yesnokey = false
            if (yesnovalue) {
                yesnokey = yesnovalue.value;
            }



            return (<div className="mb-3">
                <h6 className="mb-3 font-weight-bold ">#{1 + index}
                    <div className="toggle-btn" style={{ float: "right", width: "auto" }}>
                        <label className="switch" style={{ float: "right" }}>
                            <Input type="checkbox" name={"selector" + index} data={requirkey} checked={requirkey} onChange={this.changeRequireValue.bind(this)} />
                            <span className="slider round"></span>
                        </label>
                        <span style={{ width: "92px", paddingRight: 8, lineHeight: 1.2 }}> Required</span>
                    </div>

                    <div className="toggle-btn pr-3" style={{ float: "right", width: "auto" }}>
                        <label className="switch" style={{ float: "right" }}>
                            <Input type="checkbox" name={"selector" + index} data={yesnokey} checked={yesnokey} onChange={this.changeYesNoValue.bind(this)} />
                            <span className="slider round"></span>
                        </label>
                        <span style={{ width: "92px", paddingRight: 8, lineHeight: 1.2 }}> Answer with yes/no </span>
                    </div>
                </h6>
                <FormRow hidelabel={true} name={"selector" + index} data={keyvalue} changeInput={this.changeQuestionValue.bind(this)} />
                <Button className="bg-transparent cleanborder pr-0 mr-0 pl-0 ml-0" style={{ color: "red" }} onClick={(e) => this.deleteQuestion(index)}  ><FontAwesome name="trash" className="m-1 " size="1x" /> Remove</Button>
            </div>)
        })

        return (
            <>
                <Header />
                <div className="py-5 bg-info">
                    <div className="container">
                        <div className="row">
                            <div className=" col-md-9">
                                <h3>{edit ? "Edit Job" : "Post A Job"}</h3>
                            </div>
                        </div>
                        <AvForm onValidSubmit={() => this.handleValidSubmit()} className="form-horizontal liteinput" id="TypeValidation">
                            <div className="row d-flex  ">
                                <div className="p-3 col-lg9- col-md-9">
                                    <div className="card border-0">
                                        <div className="card-body p-4">
                                            <h6 className="mb-3 font-weight-bold ">Job Title <span style={{ color: "red" }}>*</span></h6>
                                            <FormRow hidelabel={true} required={true} name="name" data={name} changeInput={this.changeInput.bind(this)} />
                                            <h6 className="mb-3 font-weight-bold ">Education Level <span style={{ color: "red" }}>*</span></h6>
                                           <SelectRow
                                                hidelabel={true}
                                                required={true}
                                                name="education"
                                                defaultValue={education}
                                                changeInput={selectedCountry => this.setState({ education: selectedCountry.value })}
                                                data={educationlist}
                                            />
                                            <h6 className="mb-3 font-weight-bold ">Description <span style={{ color: "red" }}>*</span></h6>
                                            <FormRow hidelabel={true} type={"textarea"} name="description" data={description} changeInput={this.changeInput.bind(this)} />
                                            <ImageUpload ref="fileInputcv" onlyimage={false} showimg={false} onChangeImageUrl={(e) => this.onChangeProfileCV(e)} onChange={(e) => this.onChangeCv(e)} />

                                            {!file && <div className="text-right">
                                                <Button color="primary" onClick={() => this.refs.fileInputcv.handleClick()}  >
                                                    <FontAwesome name="plus" style={{ paddingRight: 10 }} />
                                                    Add file</Button>
                                            </div>}

                                            {file && <div className="text-right">
                                                <a href={fullfile} target="_blank" className="mb-3 btntag searchtag btn-secondary bg-transparent text-primary border-0">
                                                    {fileattach.name}
                                                </a>
                                                <Button color="primary" className="cleanborder mb-3 btntag searchtag btn-secondary bg-transparent text-primary border-0" onClick={() => {
                                                    this.setState({ file: null, fileattach: null });
                                                    this.refs.fileInputcv.value = '';
                                                    // document.querySelector('#input-field').value = '';
                                                }}  >
                                                    <FontAwesome name="trash" style={{ paddingRight: 10, color: "red" }} /></Button>
                                            </div>}


                                            <h6 className="mb-3 font-weight-bold ">Location <span style={{ color: "red" }}>*</span></h6>

                                            <SelectRow
                                                hidelabel={true}
                                                required={true}
                                                name="country"
                                                defaultValue={location}
                                                changeInput={selectedCountry => this.setState({ location: selectedCountry.value })}
                                                data={selectCountryList}
                                            />

                                            <FormRow required={false} row={true} includeRow={false} label="Accepting Remote Work" labelStyle={{ fontSize: 16, marginLeft: 20 }} name="acceptremote" data={acceptremote} type="checkbox" changeInput={this.changeCheckbox.bind(this)} />
                                            <h6 className="mt-4 mb-3 font-weight-bold ">Skills</h6>
                                            <SelectRow hidelabel={true} required={true} isMulti={true} data={skillslist} name="skills" defaultValue={skills && skills.map((item) => {
                                                return skillslist.find(v => v.value === item._id || v.value === item.value)
                                            })} changeInput={this.changeInput.bind(this)} />
                                            <h6 className="mb-3 font-weight-bold ">Years of Experience</h6>
                                            <SelectRow hidelabel={true} required={true} name="yearsexp" defaultValue={yearsexp} changeInput={this.changeInput.bind(this)} data={this.createSelectValue(["Less than a year", "1 - 2", "2 - 3", "3 - 5", "5+"], false)} />
                                            <h6 className="mb-3 font-weight-bold ">Salary</h6>
                                            <SelectRow hidelabel={true} required={true} name="salary" defaultValue={salary} changeInput={this.changeInput.bind(this)} data={this.createSelectValue(["No Salary","$500 - $1500", "$1500 - $2500", "$2500 - $5000", "$5000+"], false)} />
                                            {renderquestionlist}
                                            <div className="text-right">
                                                <Button color="primary" onClick={(e) => this.addQuestion()}  >
                                                    <FontAwesome name="plus" style={{ paddingRight: 10 }} />
                                                     Add question</Button>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                                <div className="p-3 col-lg-3 col-md-3">
                                    <div className="card border-0">
                                        <div className="card-body p-4">
                                            <h6 className="mb-3 font-weight-bold ">Job Type <span style={{ color: "red" }}>*</span></h6>
                                            <SelectRow required={true} hidelabel={true} name="jobtype" defaultValue={jobtype} changeInput={this.changeInput.bind(this)} data={this.createSelectValue(["Full time", "Part Time", "Project Basis"], false)} />
                                            <h6 className="mb-3 font-weight-bold ">Who can view this job <span style={{ color: "red" }}>*</span></h6>
                                            <SelectRow required={true} hidelabel={true} name="whoview" defaultValue={whoview} data={this.createSelectValue(["Everyone", "Registered"])} changeInput={this.changeInput.bind(this)} />
                                            <h6 className="mb-3 font-weight-bold ">Post <span style={{ color: "red" }}>*</span></h6>
                                            <FormRow hidelabel={true} name="fromduration" data={fromduration} type={"date"} changeInput={this.changeInput.bind(this)} />
                                            <h6 className="mb-3 font-weight-bold ">Active until <span style={{ color: "red" }}>*</span></h6>
                                            <FormRow hidelabel={true} name="toduration" data={toduration} type={"date"} changeInput={this.changeInput.bind(this)} />
                                            <div className=" align-content-center align-items-center mx-auto text-center">
                                                <ButtonLoader variant="primary" className="btnpostajob btn btn-sm  btn-secondary p-2 m-2 pr-4 pl-4 font-weight-bold" loading={loading}> {edit ? "Save" : "Post Job"}</ButtonLoader>
                                                {edit && <Button variant="secondary" style={{background:"#243E85"}}  onClick={()=>{
                                                    //alert("dd")
                                                    this.props.history.push('/company/home');

                                                }} className="btn btn-primary p-2 m-2 pr-4 pl-4 font-weight-bold" >Cancel</Button>}

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </AvForm>
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
export default connect(null, mapDispatchToProps)(withRouter(PostAJob));
