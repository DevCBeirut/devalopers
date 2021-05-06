import React, { Component } from 'react';




import Header from "../common/Header";
import Footer from "../common/Footer";

import SelectRow from "../../components/Select/SelectRow"
import ProfileCover from "../common/ProfileCover";
import DevHeader from "./DevHeader";
import { selectCountryList } from '../../core/countries';
import { Button } from "reactstrap";
import CoreEngine from "../../core/CoreEngine";
import RequestEngine from "../../core/RequestEngine";
import profile from "../../assets/images/profile.png";
import FontAwesome from "react-fontawesome";
import { AvForm } from "availity-reactstrap-validation";
import ImageUpload from "../../components/CustomUpload/ImageUpload";
import FormRow from "../../components/Row/FormRow";
import loadingAction from "../../core/redux/actions/loadingAction";
import updateInfoAction from "../../core/redux/actions/updateInfoAction";
import refreshAction from "../../core/redux/actions/refreshAction";

import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Memory } from "../../core/Memory";
import strings from "../../core/translate";
import { Utilites } from "../../core/Utilites";
import NotFound from "../notfound/NotFound";

class DevProfile extends CoreEngine {


    constructor(props) {
        super(props);
        this.state = {
            data: [],

            info: {},
            removepic:false,
            activejobs: [],
            about: [],
            previousjob: [],
            profileprogress: {},
            loading: false,
            edit: false,
            canedit: false,
            editlang: false,
            editabout: false,
            editskills: false,
            editeducation: false,
            editworkexp: false,
            skillslist: [],
            skills: [],
            name: "",
            last: "",
            first: "",
            location: "",
            website: "",
            description: "",
            rate: "",
            type: "",

            notfound:false,
            linkfb: "",
            linklinking: "",
            linkgithub: "",

            pictureprofilefile: "",
            pictureprofile: "",
            cv: "",
            cvfile: "",
            showLandModal: false,
            showEduModal: false,
            showExpModal: false,
            language: [],
            languagename: "",
            languageproficienty: "",



            school: "",
            degree: "",
            startschoolyear: "",
            endschoolyear: "",



            companyname: "",
            companyposition: "",
            startcompanyyear: "",
            companydescription: "",
            endcompanyear: "",
            allowsendmsg: false,

            talentsList: [],
            formErrorMessage: ""
        }
        this.engine = new RequestEngine();
    }
    componentDidMount() {
        this.callPage();

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.refresh !== this.props.refresh) {
            if (nextProps.refresh.refresh) {
                this.callPage()
                this.props.refreshAction(false)
            }
        }
    }
    async callSkills() {
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
    async callPage() {
        this.props.loadingAction(true);

        // debugger
        const userid = this.props.match.params.id
        let response = await this.engine.getItem("user", "/info/" + userid);

        this.setState({
            loading: true,
        })

        if (response && response.status === 200) {

            if(!response.data.success){


                this.setState({
                    notfound:true,
                    loading: false,
                })
                this.props.loadingAction(false);
                return;
            }
            const info = response.data.data.info;


            let skills = []
            if (info && info.skills) {
                info.skills.map(item => {
                    skills.push({ value: item._id, label: item.name })
                })
            }

            const accounttype = Memory.getItem("accounttype");
            if (accounttype && accounttype == "company" && info.accounttype != "company") {

                this.setState({
                    allowsendmsg: true
                })
            }

            this.setState({
                loading: false,
                info: info,
                activejobs: response.data.data.activejobs,
                previousjob: response.data.data.previousjob,
                profileprogress: response.data.data.profileprogress,
                name: info && info.name,
                first: info && info.first,
                last: info && info.last,

                location: info && info.location,
                website: info && info.website,
                description: info && info.description,
                type: info && info.type,
                about: info && info.about,
                rate: info && info.rate,
                linkfb: info && info.linkfb,
                linklinking: info && info.linklinking,
                linkgithub: info && info.linkgithub,
                cv: info && info.cv,
                skills: skills,
                canedit: response.data.data.canedit,
                language: info && info.language,
            }
            );
        }

        //
        response = await this.engine.getItem("talenttype");
        if (response && response.status === 200) {
            const data = response.data.data;
            let talentsList = []
            data.map(p =>
                talentsList.push({ value: p._id, label: p.name })
            )
            this.setState({
                loading: false,
                talentsList: talentsList
            }
            );
        }

        this.props.loadingAction(false);
    }


    handleValidSubmit = async () => {
        this.setState({
            loading: true
        })
        // debugger
        try {

            const { removepic,first, last, linkfb, linklinking, linkgithub, rate, location, website, description, type, pictureprofilefile } = this.state
            const formData = new FormData();
            if(removepic){
                formData.append('picture', "")
            }else{
                formData.append('picture', pictureprofilefile)
            }

            formData.append('first', first)
            formData.append('last', last)
            formData.append('removepic', removepic)

            formData.append('rate', rate)
            formData.append('location', location)

            formData.append('description', description)
            if (type && !type.name) {
                formData.append('type', type)
            }


            formData.append('website', website)
            formData.append('linkfb', linkfb)
            formData.append('linklinking', linklinking)
            formData.append('linkgithub', linkgithub)
            const response = await this.engine.postItemData("user", formData, "update")
            if (response && response.status === 200) {
                if (response.data.success) {
                    const picture = response.data.data.picture;
                    if(removepic){
                        Memory.setItem('picture', "");
                    }else{
                        Memory.setItem('picture', picture);
                    }

                    this.props.updateInfoAction(true);
                    this.callPage();
                    this.setState({ edit: false,removepic:false })
                } else {
                    this.setState({
                        formErrorMessage: response.message
                    })
                }

            }
        } catch (e) {
            this.showErrorMessage("error please try again")
        }

        this.setState({
            loading: false,
        })

    };




    handleValidSubmitSkills = async () => {
        this.setState({ editskills: false })
        this.setState({
            loading: true
        })
        try {

            const data = { skills: this.state.skills ? this.state.skills.map(p => p.value) : [] }

            const response = await this.engine.postItem("user", data, "updateskills")

            if (response && response.status === 200) {
                this.callPage()
            }
        } catch (e) {
            console.log(e);
            this.showErrorMessage("error please try again")
        }

        this.setState({
            loading: false
        })

    };
    handleValidSubmitAbout = async () => {
        this.setState({ editabout: false })
        this.setState({
            loading: true
        })
        try {
            const { about } = this.state
            const data = {
                about: about
            }
            const response = await this.engine.postItem("user", data, "updateabout")

            if (response && response.status === 200) {
                this.callPage()
            }
        } catch (e) {
            this.showErrorMessage("error please try again")
        }

        this.setState({
            loading: false
        })

    };

    handleValidSubmitLang = async () => {

        const { languagename, languageproficienty } = this.state


        if (languagename.length === 0 || languageproficienty.length === 0) {
            this.showErrorMessage("Please fill all fields");
            return;
        }
        this.setState({
            loading: true
        })
        try {

            const data = {
                languagename: languagename,
                languageproficienty: languageproficienty
            }

            const response = await this.engine.postItem("user", data, "updatelang")
            if (response && response.status === 200) {
                this.showSucessMessage("Sucess")
                this.setState({ showLandModal: false })
                this.callPage()
            }
        } catch (e) {
            this.showErrorMessage("error please try again")
        }

        this.setState({
            loading: false
        })

    };

    handleValidSubmitEdu = async () => {
        const { school,
            degree,
            startschoolyear,
            endschoolyear } = this.state


        if (school.length === 0 || degree.length === 0 || startschoolyear.length === 0 || endschoolyear.length === 0) {
            this.showErrorMessage("Please fill all fields");
            return;
        }


        if (startschoolyear> endschoolyear) {
            this.showErrorMessage("End date should be bigger than start date");
            return;
        }

        this.setState({
            loading: true
        })
        try {


            const data = {
                school: school,
                degree: degree,
                startschoolyear: startschoolyear,
                endschoolyear: endschoolyear,
            }

            const response = await this.engine.postItem("user", data, "updateeducation")

            if (response && response.status === 200) {
                this.setState({
                    showEduModal: false,
                    school: "",
                    degree: "",
                    startschoolyear: "",
                    endschoolyear: "",
                })
                this.callPage()
            }
        } catch (e) {
            this.showErrorMessage("error please try again")
        }

        this.setState({
            loading: false
        })

    };

    handleValidSubmitExp = async () => {

        const { companyname,
            companyposition,
            startcompanyyear,
            companydescription,
            endcompanyear } = this.state

        if (companyname.length === 0 || companyposition.length === 0 || startcompanyyear.length === 0 || endcompanyear.length === 0) {
            this.showErrorMessage("Please fill the required fields");
            return;
        }

        if (startcompanyyear> endcompanyear) {
            this.showErrorMessage("End date should be bigger than start date");
            return;
        }


        this.setState({
            loading: true
        })
        try {

            const data = {
                companyname: companyname,
                companyposition: companyposition,
                startcompanyyear: startcompanyyear,
                endcompanyear: endcompanyear,
                companydescription: companydescription
            }

            const response = await this.engine.postItem("user", data, "updateworkexp")

            if (response && response.status === 200) {
                this.showSucessMessage("Sucess")
                this.setState({
                    showExpModal: false, companyname: "",
                    companyposition: "",
                    startcompanyyear: "",
                    companydescription: "",
                    endcompanyear: ""
                })
                this.callPage()
            }
        } catch (e) {
            this.showErrorMessage("error please try again")
        }

        this.setState({
            loading: false
        })

    };
    onChangePic(e) {
        this.setState({ pictureprofilefile: e.target.files[0],removepic:false })
    }
    onChangeProfilePic(e) {
        this.setState({ pictureprofile: e,removepic:false })
        Utilites.setTimeout(() => this.handleValidSubmit(), 500)
    }

    onChangeCv(e) {
        this.setState({ cvfile: e.target.files[0] }, () => this.onSubmitCV())
    }

    async onSubmitCV() {
        this.setState({
            loading: true
        })
        try {
            this.props.loadingAction(true);
            const { cvfile } = this.state
            const formData = new FormData();
            // debugger
            formData.append('cv', cvfile)
            formData.append('cvrealfilename', cvfile.name)



            const response = await this.engine.postItemData("user", formData, "updatecv")
            if (response && response.status === 200) {
                if (response.data.success) {
                    this.showSucessMessage("Sucess")
                    this.callPage()
                } else {
                    this.setState({ cv: "", cvfile: "" });
                    this.showErrorMessage(response.data.message)
                }

            } else {
                this.showErrorMessage("error please try again")
            }
        } catch (e) {
            this.showErrorMessage("error please try again")
        }

        this.setState({
            loading: false
        })

        this.props.loadingAction(false);

    }
    onChangeProfileCV(e) {
        this.setState({ cv: e })
    }

    renderStaticInfo() {

        const { info, canedit, allowsendmsg,removepic } = this.state
        let profilepicture = profile
        if (info && info.fullpicture && !removepic) {
            profilepicture = info.fullpicture
        }




        return (
            <div className="bg-white mb-3  borderwrap">
                <div className="row">

                    <div className="companyprofileimg " onClick={(e) => {
                        canedit && this.refs.fileInput.handleClick()
                        e.stopPropagation();
                        return;
                    }}>
                        <img src={profilepicture} className="pt-0" />

                        {canedit && <button onClick={(e) => {
                            this.refs.fileInput.handleClick()
                            e.stopPropagation();
                            return;

                        }}  style={{    position: "absolute",
                          zIndex: 9999,
                            bottom: 0,
                            left: 65}} className="">
                            <FontAwesome name="edit"
                                         size="1x" />
                        </button>}

                        {canedit && <button onClick={(e) => {
                            this.setState({removepic:true},()=>this.handleValidSubmit())
                            e.stopPropagation();
                            return;
                        }}  style={{    position: "absolute",
                            zIndex: 9999,
                            bottom: 0,
                            left: 105}} className="">
                            <FontAwesome name="trash"
                                         size="1x" />
                        </button>}




                    </div>
                    {allowsendmsg && <Link to={"/company/messages/" + (info && info._id)} className="btnpostajob btn btn-sm  btn-secondary p-2 m-2 pr-3 pl-3 font-weight-bold" >
                        Send Message
                </Link>}
                    {canedit && <Button onClick={() => this.setState({ edit: true })} className="cleanborder mb-3 btntag searchtag btn-secondary bg-transparent border-0">
                        <FontAwesome name="edit"
                            size="1x" />
                    </Button>}
                    <div className="col-md-12  font-weight-bold">
                        <h3 className="mb-1 ">{info && info.name}</h3>
                        <h6 className="mb-2 jobdate ">{info && info.type && info.type.name}</h6>
                    </div>
                    <div className="col-md-12 pt-2  font-weight-bold">
                        {info && info.website && <h6><a target={"_blank"} className="mb-1 text-primary font-weight-bold" href={info && info.website && info.website.includes("http")?info.website:"http://"+info.website}><FontAwesome name="globe" className="m-1" size="1x" />{info.website}</a></h6>}
                        {info && info.location && <h6><FontAwesome name="map-marker" className="m-1" size="1x" />{info && info.location}</h6>}
                        {info && info.description ? <h6><FontAwesome name="none" className="m-1" size="1x" />{info && info.description.substring(0, 255)}...</h6> : strings.no_description}
                        {info && info.rate && info.rate != "-" && <h6 className="pl-1 mt-3 font-weight-bold">Hourly Rate ${info && info.rate}</h6>}
                    </div>


                    <div className="text-primary ml-3">
                        {info.linkfb && <a href={info.linkfb} target="_blank"><FontAwesome name="facebook-square" size="1x" /></a>}
                        {info.linklinking && <a href={info.linklinking} target="_blank"><FontAwesome name="linkedin" size="1x" /></a>}
                        {info.linkgithub && <a href={info.linkgithub} target="_blank"><FontAwesome name="github" size="`1x" /></a>}
                    </div>


                </div>

            </div>
        )

    }

    renderEditInfo() {


        const { info, last, first, location, website, description, type, pictureprofile, rate, linkfb, linklinking, linkgithub,removepic } = this.state
        let profilepicture = profile
        if (info && info.fullpicture && !removepic) {
            profilepicture = info.fullpicture
        }
        if (pictureprofile) {
            profilepicture = pictureprofile;
        }

        return (
            <AvForm onValidSubmit={() => this.handleValidSubmit()} className="form-horizontal liteinput" id="TypeValidation">

                <div className="bg-white mb-3 borderwrap">
                    <div className="row">
                        <div className="companyprofileimg " onClick={() => {
                            this.refs.fileInput.handleClick()
                        }}>
                            <img src={profilepicture} className="pt-0" />
                        </div>
                        <Button onClick={() => this.handleValidSubmit()} className="cleanborder  mb-3 btntag searchtag btn-secondary bg-transparent border-0">
                            <FontAwesome name="save" size="1x" />
                        </Button>
                        <div className="col-md-12">
                            {
                                this.state.formErrorMessage && (
                                    <div className="alert alert-danger">
                                        {this.state.formErrorMessage}
                                    </div>
                                )
                            }
                            <FormRow label={"First Name"} placeholder="First Name" name="first" data={first} changeInput={this.changeInput.bind(this)} />
                            <FormRow label={"Last Name"} placeholder="Last Name" name="last" data={last} changeInput={this.changeInput.bind(this)} />
                            <SelectRow label={"I am a .."} name="type" changeInput={this.changeInput.bind(this)} defaultValue={type._id} data={this.state.talentsList} />
                            <FormRow required={false} label={strings.label_website} placeholder={strings.label_placeholder_website} name="website" data={website} changeInput={this.changeInput.bind(this)} />
                            <SelectRow
                                required={false}
                                label={strings.label_location} placeholder={strings.label_placeholder_location} name="location"
                                defaultValue={location}
                                changeInput={this.changeInput.bind(this)}
                                data={selectCountryList}
                            />
                            <FormRow required={false} label={strings.label_description} placeholder={strings.label_placeholder_description} type={"textarea"} name="description" data={description} changeInput={this.changeInput.bind(this)} />
                            <FormRow required={false} label={strings.label_rate} placeholder={strings.label_placeholder_rate} type={"number"} name="rate" data={rate} changeInput={this.changeInput.bind(this)} />
                            <FormRow required={false} type="url" errorMessage="Insert a valid url" label={strings.label_facebook} placeholder={strings.label_placeholder_facebook} name="linkfb" data={linkfb} changeInput={this.changeInput.bind(this)} />
                            <FormRow required={false} type="url" errorMessage="Insert a valid url" label={strings.label_linkedin} placeholder={strings.label_placeholder_linkedin} name="linklinking" data={linklinking} changeInput={this.changeInput.bind(this)} />
                            <FormRow required={false} type="url" errorMessage="Insert a valid url" label={strings.label_github} placeholder={strings.label_placeholder_github} name="linkgithub" data={linkgithub} changeInput={this.changeInput.bind(this)} />

                        </div>

                    </div>

                </div>
            </AvForm>


        )
    }


    async deleteLang(languagename) {
        this.props.loadingAction(true);
        try {
            const data = {
                languagename: languagename
            }
            const response = await this.engine.postItem("user", data, "deletelang")
            if (response && response.status === 200) {
                this.showSucessMessage("Sucess")
                this.callPage()
            }
        } catch (e) {
            this.showErrorMessage("error please try again")
        }
        this.props.loadingAction(false);
    }

    async deleteSchool(school) {
        this.props.loadingAction(true);
        try {
            const data = {
                school: school
            }
            const response = await this.engine.postItem("user", data, "deleteschool")
            if (response && response.status === 200) {
                this.showSucessMessage("Sucess")
                this.callPage()
            }
        } catch (e) {
            this.showErrorMessage("error please try again")
        }
        this.props.loadingAction(false);
    }

    async deleteWork(companyname) {
        this.props.loadingAction(true);
        try {
            const data = {
                companyname: companyname
            }
            const response = await this.engine.postItem("user", data, "deletework")
            if (response && response.status === 200) {
                this.showSucessMessage("Sucess")
                this.callPage()
            }
        } catch (e) {
            this.showErrorMessage("error please try again")
        }
        this.props.loadingAction(false);
    }
    render() {

        const { info,notfound ,profileprogress, edit, editabout, editlang, editskills, editeducation, skillslist, skills, about, cv, showLandModal, showEduModal, showExpModal, languagename, languageproficienty, school,
            degree,
            startschoolyear,
            endschoolyear,
            companyname,
            companydescription,
            companyposition,
            startcompanyyear,
            endcompanyear, language, canedit } = this.state


        if(notfound) {
            return <NotFound/>
        }
        let cover = ""
        if (info && info.fullcover) {
            cover = info.fullcover
        }

        let fullcv = ""
        if (info && info.fullcv) {
            fullcv = info.fullcv
        }

        const langfulllist = this.createSelectValue(["Arabic", "English", "French"], false, language, "languagename")

        return (
            <>
                <Header />

                {canedit && <DevHeader selected={4} />}
                <ProfileCover cover={cover} canedit={canedit} />
                <div className="profileinfo">
                    <div className="container">

                        <div className="row">

                            <div className="staticinfo col-lg-4 col-md-4">
                                <ImageUpload ref="fileInput" showimg={false} onChangeImageUrl={(e) => this.onChangeProfilePic(e)} onChange={(e) => this.onChangePic(e)} />

                                {!edit ? this.renderStaticInfo() : this.renderEditInfo()}

                                <div className="row mt-4">
                                    <div className="col-md-8">
                                        <h4 className="mt-1 font-weight-bold ">CV</h4>
                                    </div>
                                    <div className="col-md-4">
                                        {cv.length < 2 ? canedit && <Button style={{ float: "right" }} onClick={() => this.refs.fileInputcv.handleClick()} className="cleanborder searchtag btn-secondary bg-transparent text-secondary border-0 p-0">
                                            <FontAwesome name="plus" size="1x" /> Add
                                            </Button> : ""
                                        }
                                    </div>
                                </div>

                                <div className="bg-white mb-3 borderwrap">
                                    <div className="row">
                                        <div className="col-md-12">
                                            {cv.length < 2 && <div className="no-data">
                                                No CV available..
                                                    </div>}

                                            {cv.length > 2 && <h5 className="mb-1 font-weight-bold">
                                                <a href={fullcv} target="_blank" className="searchtag btn-secondary bg-transparent text-primary border-0">
                                                    {info && info.cvrealfilename}
                                                    </a>
                                                {canedit && <Button style={{ float: "right" }} onClick={() => this.setState({ cv: "", cvfile: "" }, () => this.onSubmitCV())} className="cleanborder mb-3 searchtag btn-secondary bg-transparent text-secondary border-0">
                                                    <FontAwesome name="minus" size="1x" /> remove
                                                    </Button>}
                                            </h5>}
                                            <ImageUpload ref="fileInputcv" onlyimage={false} showimg={false} onChangeImageUrl={(e) => this.onChangeProfileCV(e)} onChange={(e) => this.onChangeCv(e)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-md-8">
                                        <h4 className="mt-1 font-weight-bold ">Languages</h4>
                                    </div>
                                    <div className="col-md-4">
                                        {langfulllist.length > 0 && canedit && <div className="text-right">
                                            <Button onClick={() => this.setState({
                                                showLandModal: true
                                            })} className="cleanborder mt-1 mb-0 searchtag btn-secondary bg-transparent text-secondary border-0 p-0">
                                                <FontAwesome name="plus" size="1x" /> Add
                                                </Button>
                                        </div>}
                                    </div>
                                </div>

                                <div className="bg-white mb-3 borderwrap languages">
                                    {language.length === 0 &&
                                        <div className="no-data">No Language yet</div>}
                                    {info && info.language && info.language.map((item, index) => {
                                        return (<div className="d-flex" key={index}>
                                            <div className="col-md-9 font-weight-bold">
                                                <h5 className="mb-1 ">{item.languagename}</h5>
                                                <h6 className="mb-1 ">{item.languageproficienty}</h6>
                                            </div>

                                            <div className="col-md-3  font-weight-bold">
                                                {canedit && <Button style={{
                                                    top: 0, color: "#373F41"
                                                }} onClick={() => this.deleteLang(item.languagename)} className="cleanborder mb-3 btntag searchtag bg-transparent border-0">
                                                    <FontAwesome name="trash" size="1x" />
                                                </Button>}
                                            </div>
                                            <hr />
                                        </div>)
                                    })}
                                </div>
                            </div>


                            <div className="col-lg-8 col-md-8">
                                <div className="row">
                                    {canedit && <div className="p-1 pl-3 col-lg-12 col-md-12 mx-auto text-left">
                                        <h4 className="font-weight-bold">Complete your profile </h4>
                                    </div>}
                                </div>

                                {canedit && <div className="bg-white mb-3 borderwrap">
                                    <div className="row">
                                        <div className="col-md-12  font-weight-bold ">
                                            <h6 className="mb-1 "><span className="font-weight-bold">{profileprogress.score} </span>{profileprogress && profileprogress.completemsg} </h6>
                                            <div className="progress mt-3 mb-3" style={{ height: 15 }}>
                                                <div className="progress-bar bg-secondary" role="progressbar" style={{ width: profileprogress.percent + "%" }}
                                                    aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" />
                                            </div>
                                            <h6 className="mb-2 mt-2 ">{profileprogress.message}</h6>
                                        </div>
                                    </div>
                                </div>}


                                <div className="row">
                                    <div className="p-1 pl-3 col-lg-12 col-md-12 mx-auto text-left">
                                        <h4 className="mt-1 font-weight-bold">About
                                            {canedit && !editabout && <Button style={{
                                                float: "right"
                                            }} onClick={() => this.setState({ editabout: true })} className="cleanborder searchtag btn-secondary bg-transparent text-primary border-0">
                                                <FontAwesome name="edit" size="1x" />
                                            </Button>}
                                            {canedit && editabout && <Button style={{
                                                float: "right"
                                            }} onClick={() => this.handleValidSubmitAbout()} className="cleanborder searchtag btn-secondary bg-transparent text-primary border-0">
                                                <FontAwesome name="save" size="1x" />
                                            </Button>}
                                        </h4>
                                    </div>
                                </div>
                                <AvForm onValidSubmit={() => this.handleValidSubmitAbout()} className="form-horizontal liteinput" id="TypeValidation">
                                    <div className="bg-white mb-3 borderwrap">
                                        <div className="row ">
                                            <div className="col-md-12  font-weight-bold ">
                                                {!editabout && about.length === 0 &&
                                                    <h5 className="mb-0">No About yet</h5>}
                                                {!editabout && <h6 className=" " style={{ whiteSpace: "break-spaces" ,wordBreak: "break-word"}}>{info && info.about}</h6>}
                                                {editabout && <FormRow hidelabel={true} placeholder="About" type="textarea" name="about" data={about} changeInput={this.changeInput.bind(this)} />}
                                            </div>
                                        </div>
                                    </div>
                                </AvForm>

                                <div className="row">
                                    <div className="p-1 pl-3 col-lg-12 col-md-12 mx-auto text-left">
                                        <h4 className="mt-1 font-weight-bold">Skills
                                            {canedit && !editskills && <Button style={{
                                                float: "right"
                                            }} onClick={() => {

                                                this.callSkills()
                                                this.setState({ editskills: true })

                                            }} className="cleanborder searchtag btn-secondary bg-transparent text-primary border-0">
                                                <FontAwesome name="edit" size="1x" />
                                            </Button>}
                                            {canedit && editskills && <Button style={{
                                                float: "right"
                                            }} onClick={() => this.handleValidSubmitSkills()} className="cleanborder searchtag btn-secondary bg-transparent text-primary border-0">
                                                <FontAwesome name="save" size="1x" />
                                            </Button>}</h4>
                                    </div>
                                </div>
                                <AvForm onValidSubmit={() => this.handleValidSubmitSkills()} className="form-horizontal liteinput" id="TypeValidation">

                                    <div className="bg-white mb-3 borderwrap">
                                        {skills.length === 0 && !editskills &&
                                            <h5 className="mb-0">No Skills yet</h5>}
                                        {!editskills && <div className="row ">
                                            <div className="col-md-12  font-weight-bold ">
                                                {info && info.skills && info.skills.map(item => {
                                                    return <div className="tag mb-1 rounded btntag searchtag bg-white">{item.name}</div>
                                                })}
                                            </div>
                                        </div>}

                                        {editskills && <div className="row ">
                                            <div className="col-md-12  font-weight-bold ">
                                                <SelectRow hidelabel={true} isMulti={true} data={skillslist} name="skills" defaultValue={skills} changeInput={this.changeInput.bind(this)} />

                                            </div>
                                        </div>}


                                    </div>
                                </AvForm>

                                <div className="row">
                                    <div className="p-1 pl-3 col-lg-8 mx-auto text-left">
                                        <h4 className="mt-1 font-weight-bold">Work Experience </h4>
                                    </div>
                                    <div className="p-1 pl-3 col-lg-4 mx-auto text-left">
                                        {canedit && <Button style={{ float: "right" }} onClick={() => this.setState({ showExpModal: true })} className="cleanborder mb-1 btntag searchtag btn-secondary bg-transparent text-secondary border-0">
                                            <FontAwesome name="plus" size="1x" /> Add
                                        </Button>}
                                    </div>
                                </div>

                                <div className="bg-white mb-3 borderwrap educationcontainer">
                                    <div className="row ">
                                        <div className="col-md-12   ">

                                            <div className="clearfix"></div>
                                            {info && info.exp && info.exp.length === 0 && <h5 className="mb-0">No Work Experience yet</h5>}
                                            {info && info.exp && info.exp.map((item, index) => {
                                                return <div className="m-0 " key={index}>
                                                    <div className="row">
                                                        <div className="col-md-12  font-weight-bold">
                                                            <h4 className="mb-1  font-weight-bold">{item.companyname} {canedit && <Button style={{
                                                                float: "right"
                                                            }} onClick={() => this.deleteWork(item.companyname)} className="cleanborder mb-3 btntag searchtag btn-secondary bg-transparent text-primary border-0">
                                                                <FontAwesome name="trash" size="1x" />
                                                            </Button>}</h4>

                                                            <h5 className="mb-2  ">{item.companydescription}</h5>
                                                            <h5 className="mb-2  ">{item.companyposition}</h5>
                                                            <h6 className="mb-2  ">{item.startcompanyyear} - {item.endcompanyear}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="p-1 pl-3 col-lg-8 mx-auto text-left">
                                        <h4 className="mt-1 font-weight-bold">Education</h4>
                                    </div>
                                    <div className="p-1 pl-3 col-lg-4 mx-auto text-left">
                                        {canedit && <Button style={{ float: "right" }} onClick={() => this.setState({ showEduModal: true })} className="cleanborder mb-1 btntag searchtag btn-secondary bg-transparent text-secondary border-0">
                                            <FontAwesome name="plus" size="1x" /> Add
                                            </Button>}
                                    </div>
                                </div>
                                <div className="bg-white mb-3 borderwrap educationcontainer">
                                    <div className="row ">
                                        <div className="col-md-12">

                                            <div className="clearfix"></div>
                                            {info && info.education && info.education.length === 0 && <h5 className="mb-0">No Education yet</h5>}
                                            {info && info.education && info.education.map((item, index) => {
                                                return <div className="m-0 " key={index}>
                                                    <div className="row">
                                                        <div className="col-md-12  font-weight-bold">
                                                            <h4 className="mb-1  font-weight-bold">{item.school} {canedit && <Button style={{
                                                                float: "right"
                                                            }} onClick={() => this.deleteSchool(item.school)} className="cleanborder mb-3 btntag searchtag btn-secondary bg-transparent text-primary border-0">
                                                                <FontAwesome name="trash" size="1x" />
                                                            </Button>}</h4>
                                                            <h5 className="mb-2  ">{item.degree}</h5>
                                                            <h6 className="mb-2  ">{item.startschoolyear} - {item.endschoolyear}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>


                    </div>
                </div>


                <Modal show={showLandModal} onHide={() => this.setState({ showLandModal: false })}  >
                    <AvForm onValidSubmit={() => this.handleValidSubmitLang()} className="form-horizontal liteinput" id="TypeValidation">
                        <Modal.Header closeButton>
                            <Modal.Title className="mx-auto " ><h3 className="font-weight-bold align-content-center mx-auto ">Add language</h3></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <SelectRow hidelabel={true} label={"Language"} defaultValue={languagename} name={"languagename"} data={langfulllist} changeInput={this.changeInput.bind(this)} />
                            <SelectRow hidelabel={true} label={"Proficiency"} defaultValue={languageproficienty} name={"languageproficienty"} data={this.createSelectValue(["Elementary proficiency", "Limited working proficiency", "Professional working proficiency", "Full professional proficiency", "Native or bilingual proficiency"], false)} changeInput={this.changeInput.bind(this)} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleValidSubmitLang()}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </AvForm>
                </Modal>



                <Modal show={showEduModal} onHide={() => this.setState({ showEduModal: false })}  >
                    <AvForm onValidSubmit={() => this.handleValidSubmitEdu()} className="form-horizontal liteinput" id="TypeValidation">
                        <Modal.Header closeButton>
                            <Modal.Title className="mx-auto " ><h3 className="font-weight-bold align-content-center mx-auto ">Add Education</h3></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FormRow name="school" label={"College"} data={school} changeInput={this.changeInput.bind(this)} />
                            <FormRow name="degree" label={"Degree"} data={degree} changeInput={this.changeInput.bind(this)} />
                            <SelectRow required={true} label={"start year"} defaultValue={startschoolyear} name={"startschoolyear"} data={this.createSelectValueYear()} changeInput={this.changeInput.bind(this)} />
                            <SelectRow required={true} label={"end year"} defaultValue={endschoolyear} name={"endschoolyear"} data={this.createSelectValueYear()} changeInput={this.changeInput.bind(this)} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleValidSubmitEdu()}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </AvForm>
                </Modal>




                <Modal show={showExpModal} onHide={() => this.setState({ showExpModal: false })}  >
                    <AvForm onValidSubmit={() => this.handleValidSubmitExp()} className="form-horizontal liteinput" id="TypeValidation">
                        <Modal.Header closeButton>
                            <Modal.Title className="mx-auto " ><h3 className="font-weight-bold align-content-center mx-auto ">Add Work Experience</h3></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <SelectRow required={true} label={"Employment type"} defaultValue={companyposition} name={"companyposition"} data={this.createSelectValue(["Full-time", "Part-time", "Contract", "Internship", "Volunteer"], false)} changeInput={this.changeInput.bind(this)} />
                            <FormRow required={true} name="companyname" label={"Company name"} data={companyname} changeInput={this.changeInput.bind(this)} />
                            <SelectRow required={true} label={"start year"} defaultValue={startcompanyyear} name={"startcompanyyear"} data={this.createSelectValueYear(false)} changeInput={this.changeInput.bind(this)} />
                            <SelectRow required={true} label={"end year"} defaultValue={endcompanyear} name={"endcompanyear"} data={this.createSelectValueYear()} changeInput={this.changeInput.bind(this)} />
                            <FormRow required={false} name="companydescription" label={"Description"} data={companydescription} type="textarea" changeInput={this.changeInput.bind(this)} />

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleValidSubmitExp()}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </AvForm>
                </Modal>


                <Footer />


            </>
        );
    }
}

const mapStateToProps = state => ({
    refresh: state.refresh
});

const mapDispatchToProps = dispatch => ({
    loadingAction: (payload) => dispatch(loadingAction(payload)),
    updateInfoAction: (payload) => dispatch(updateInfoAction(payload)),
    refreshAction: (payload) => dispatch(refreshAction(payload))
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DevProfile));
