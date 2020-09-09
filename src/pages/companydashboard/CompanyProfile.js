import React, { Component } from 'react';



import map from "../../assets/images/map.png";
import profile from "../../assets/images/profile.png";
import Header from "../common/Header";
import Footer from "../common/Footer";

import ProfileCover from "../common/ProfileCover";
import CompanyHeader from "./CompanyHeader";

import { Button } from "reactstrap";
import CoreEngine from "../../core/CoreEngine";
import RequestEngine from "../../core/RequestEngine";
import loadingAction from "../../core/redux/actions/loadingAction";
import updateInfoAction from "../../core/redux/actions/updateInfoAction";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import { AvForm } from "availity-reactstrap-validation";
import FormRow from "../../components/Row/FormRow";
import ImageUpload from "../../components/CustomUpload/ImageUpload";
import Constants from "../../core/Constants"
import { Memory } from "../../core/Memory";
import SelectRow from "../../components/Select/SelectRow";
import refreshAction from "../../core/redux/actions/refreshAction";
import strings from '../../core/translate';
import { selectCountryList } from "../../core/countries";
import { Utilites } from "../../core/Utilites";


class CompanyProfile extends CoreEngine {


    constructor(props) {
        super(props);
        this.state = {
            data: [],

            info: {},
            activejobs: [],
            previousjob: [],
            profileprogress: {},
            loading: false,
            edit: false,
            canedit: false,
            email:"",
            name: "",
            location: "",
            website: "",
            description: "",
            type: "",
            pictureprofilefile: "",
            pictureprofile: "",
            linkfb: "",
            removepic:false,
            linklinking: "",
            linkgithub: "",



            address: "",

        }
        this.engine = new RequestEngine();
    }
    componentDidMount() {
        this.callPage()
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.refresh !== this.props.refresh) {
            if (nextProps.refresh.refresh) {
                this.callPage()
                this.props.refreshAction(false)
            }
        }
    }
    async callPage() {
        this.props.loadingAction(true);
        const userid = this.props.match.params.id
        const response = await this.engine.getItem("company", "/info/" + userid);
        this.setState({
            loading: true,
        })
        if (response && response.status === 200) {
            const info = response.data.data.info;
            this.setState({
                loading: false,
                info: info,
                activejobs: response.data.data.activejobs,
                previousjob: response.data.data.previousjob,
                profileprogress: response.data.data.profileprogress,
                name: info && info.name,
                location: info && info.location,
                website: info && info.website,
                description: info && info.description,
                type: info && info.type,
                address: info && info.address,
                linkfb: info && info.linkfb,
                linklinking: info && info.linklinking,
                linkgithub: info && info.linkgithub,
                canedit: response.data.data.canedit,
                    companyemail:info && info.companyemail,

            }
            );
        }


        this.props.loadingAction(false);
    }


    handleValidSubmit = async () => {

        this.setState({ edit: false })
        this.setState({
            loading: true
        })
        try {
            const { companyemail,removepic,name, location, website, description, address, type, pictureprofilefile, linkfb, linklinking, linkgithub } = this.state
            const formData = new FormData();

            if(removepic){
                formData.append('picture', "")
            }else{
                formData.append('picture', pictureprofilefile)
            }
            formData.append('removepic', removepic)
            formData.append('name', name)
            formData.append('location', location)
            formData.append('companyemail', companyemail);
            formData.append('website', website)
            formData.append('linkfb', linkfb)
            formData.append('linklinking', linklinking)
            formData.append('linkgithub', linkgithub)
            formData.append('description', description)
            formData.append('type', type)

            formData.append('address', address)

            const response = await this.engine.postItemData("company", formData, "update")

            if (response && response.status === 200) {
                const picture = response.data.data.picture;
                Memory.setItem('picture', picture);
                this.props.updateInfoAction(true);
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
        this.setState({ pictureprofile: e ,removepic:false})
        Utilites.setTimeout(() => this.handleValidSubmit(), 500)
    }
    renderStaticInfo() {

        const { info, canedit,removepic } = this.state
        let profilepicture = profile
        if (info && info.fullpicture && !removepic) {
            profilepicture = info.fullpicture
        }

        return (<div className="staticinfo col-lg-4 col-md-4">
            <div className="bg-white mb-3">
                <div className="companyprofileimg " onClick={() => {
                    canedit && this.refs.fileInput.handleClick()
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
                        bottom:0,
                        left: 105}} className="">
                        <FontAwesome name="trash"
                                     size="1x" />
                    </button>}
                </div>
                {canedit && <Button onClick={() => this.setState({ edit: true })}
                    className="mb-3 btntag btn-secondary bg-transparent text-primary border-0">
                    <FontAwesome name="edit" size="1x" />
                </Button>}
                <div className="borderwrap">
                    <div className="">
                        <h3 className="mb-2">{info && info.name}</h3>
                        <h5 className="mb-2">{info && info.companyemail}</h5>
                        <h5 className="mb-4">{info && info.type}</h5>
                    </div>
                    <div className="mb-4">
                        {info && info.description ? <h6>{info.description.substring(0, 255)}...</h6> : strings.no_description}
                    </div>
                    <div className="mb-4">
                        {info && info.address ? <h6>{info.address}</h6> : ""}
                    </div>

                    <div className="">
                        {info && info.website && <p className="text-primary pl-0 ml-0"><a className="mb-1 text-primary" target={"_blank"} href={info && info.website}><FontAwesome name="globe" className="mr-2" size="1x" />{info.website}</a></p>}
                        {info && info.location && <p className="text-primary"><FontAwesome name="map-marker" className="mr-1" size="1x" />{info && info.location}</p>}
                    </div>
                    <div className="text-primary">
                        {info.linkfb && <a href={info.linkfb} target="_blank"><FontAwesome name="facebook-square" size="1x" /></a>}
                        {info.linklinking && <a href={info.linklinking} target="_blank"><FontAwesome name="linkedin" size="1x" /></a>}
                        {info.linkgithub && <a href={info.linkgithub} target="_blank"><FontAwesome name="github" size="`1x" /></a>}
                    </div>
                </div>
            </div>
        </div>)
    }

    renderEditInfo() {

        const { info, name, linkfb,
            linklinking,
            linkgithub, website, description, type, pictureprofile, location, address ,companyemail,removepic} = this.state
        let profilepicture = profile
        if (info && info.fullpicture && !removepic) {
            profilepicture = info.fullpicture
        }
        if (pictureprofile) {
            profilepicture = pictureprofile;
        }

        return (<div className="staticinfo col-lg-4 col-md-4">
            <AvForm onValidSubmit={() => this.handleValidSubmit()} className="form-horizontal liteinput" id="TypeValidation">

                <div className="bg-white mb-3 borderwrap">
                    <div className="row">
                        <div className="companyprofileimg " onClick={() => {
                            this.refs.fileInput.handleClick()
                        }}>
                            <img src={profilepicture} className="pt-0" />
                        </div>
                        <Button onClick={() => this.handleValidSubmit()} className="cleanborder mb-3 btntag searchtag btn-secondary bg-transparent order-0">
                            <FontAwesome name="save" size="1x" />
                        </Button>
                        <div className="col-md-12">


                            <FormRow label={strings.label_company_name} placeholder={strings.label_placeholder_company_name} name="name" data={name} changeInput={this.changeInput.bind(this)} />

                            <FormRow label={"Email"} name="companyemail" data={companyemail} changeInput={this.changeInput.bind(this)} />

                            <SelectRow label={strings.label_company_type} placeholder={strings.label_placeholder_company_type} name="type" changeInput={this.changeInput.bind(this)} defaultValue={type} data={this.createSelectValue(
                                [strings.list_it_industry, strings.list_web_mobile, strings.list_web_solution]
                                , false)} />
                            <FormRow required={false} label={strings.label_description} placeholder={strings.label_placeholder_description} type={"textarea"} name="description" data={description} changeInput={this.changeInput.bind(this)} />
                            <FormRow required={false} label={"Address"} type={"textarea"} name="address" data={address} changeInput={this.changeInput.bind(this)} />


                            <FormRow required={false} label={strings.label_website} placeholder={strings.label_placeholder_website} name="website" data={website} changeInput={this.changeInput.bind(this)} />
                            <SelectRow
                                required={false}
                                label={strings.label_location} placeholder={strings.label_placeholder_location} name="location"
                                defaultValue={location}
                                changeInput={this.changeInput.bind(this)}
                                data={selectCountryList}
                            />
                            <FormRow required={false} type="url" errorMessage="Insert a valid url" label={strings.label_facebook} placeholder={strings.label_placeholder_facebook} name="linkfb" data={linkfb} changeInput={this.changeInput.bind(this)} />
                            <FormRow required={false} type="url" errorMessage="Insert a valid url" label={strings.label_linkedin} placeholder={strings.label_placeholder_linkedin} name="linklinking" data={linklinking} changeInput={this.changeInput.bind(this)} />
                            <FormRow required={false} type="url" errorMessage="Insert a valid url" label={strings.label_github} placeholder={strings.label_placeholder_github} name="linkgithub" data={linkgithub} changeInput={this.changeInput.bind(this)} />



                        </div>
                    </div>

                </div>
            </AvForm>
        </div>)
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
        const { info, activejobs, profileprogress, edit, previousjob, canedit, loading } = this.state
        let companycover = map
        if (info && info.fullcover) {
            // debugger
            companycover = info.fullcover
        }
        return (
            <>
                <Header />

                <div style={{ width: 300 }}>
                    <ImageUpload ref="fileInput" placeholder={this.state.fullpicture} showimg={false} labelupload="Select profile" onChangeImageUrl={(e) => this.onChangeProfilePic(e)} onChange={(e) => this.onChangePic(e)} />
                </div>

                {canedit && <CompanyHeader selected={4} />}
                <ProfileCover cover={companycover} canedit={canedit} iscompany={true} />
                <div className="profileinfo">
                    <div className="container">
                        <div className="row">

                            {!edit ? this.renderStaticInfo() : this.renderEditInfo()}

                            <div className="col-lg-8 col-md-8">
                                {canedit && <div className="mx-auto text-left">
                                    <h4 className="mt-1 font-weight-bold">Complete your profile</h4>
                                </div>}
                                {canedit && <div className="bg-white borderwrap">
                                    <div className=" font-weight-bold ">
                                        <h6 className="mb-1 "><span className="font-weight-bold">{profileprogress.score} </span>{profileprogress && profileprogress.completemsg} </h6>
                                        <div className="progress mt-3 mb-3" style={{ height: 15 }}>
                                            <div className="progress-bar bg-secondary" role="progressbar" style={{ width: profileprogress.percent + "%" }}
                                                aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" />
                                        </div>
                                        <h6 className="mb-0">{profileprogress.message}</h6>
                                    </div>
                                </div>}

                                <div className="mx-auto text-left">
                                    <h4 className="mt-1 font-weight-bold">{canedit && "Active"} Jobs </h4>
                                </div>

                                <div className=" border-0">
                                    {!loading && activejobs.length === 0 && <div className="bg-white borderwrap mt-2">
                                        <h5 className="mb-0">No Active Jobs yet</h5>
                                    </div>}

                                    {activejobs.map((item, index) => {
                                        return <div key={index} className="bg-white p-1 bg-white mb-3 jobsitem mt-4">
                                            <div className="row p-3 pl-4">
                                                <div className="col-md-8  font-weight-bold">
                                                    <h5 ><Link to={"/viewjobinfo/" + item._id} className="text-primary">{item.name}</Link></h5>
                                                    <h6 className="jobdate ">{item.company.name} • {this.renderDate(item.fromduration)} • ({item.salary ? item.salary : strings.no_salary})</h6>
                                                    <p>{item.description.substring(0, 255)}...</p>
                                                </div>
                                                {canedit && <div className="col-md-4 font-weight-bold text-right">
                                                    <Link to={"/company/filterapplicantslist/"+item._id} className="btn mb-3 btntag btn-secondary">View Applicants</Link>
                                                </div>}
                                            </div>
                                        </div>

                                    })}
                                </div>


                                {canedit && <div className="mx-auto text-left mt-5">
                                    <h4 className="mt-1 font-weight-bold">Previous Jobs  <span className="greyheader font-weight-light"> (Only visible to you)</span></h4>
                                </div>}

                                {canedit && !loading && previousjob.length === 0 && <div className="bg-white mb-4 borderwrap mt-2">
                                    <h5 className="mb-1 ">No Previous Jobs yet</h5>
                                </div>}

                                {canedit && <div className=" border-0 mb-4">
                                    {previousjob.map((item, index) => {
                                        return <div key={index} className="bg-white p-1 bg-white mb-3 jobsitem mt-4">
                                            <div className="row p-3 pl-4">
                                                <div className="col-md-8  font-weight-bold">
                                                    <h5 className="">{item.name}</h5>
                                                    <h6 className="jobdate ">{item.company.name} • {this.renderDate(item.fromduration)} • ({item.salary ? item.salary : strings.no_salary})</h6>
                                                    <p>{item.description}</p>
                                                </div>
                                                {canedit && <div className="col-md-4 font-weight-bold text-right">
                                                    <Link to={"/company/filterapplicantslist"+item._id} className="btn mb-3 btntag btn-secondary">View Applicants</Link>
                                                </div>}
                                            </div>
                                        </div>
                                    })}
                                </div>}
                            </div>

                        </div>


                    </div>
                </div>


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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CompanyProfile));
