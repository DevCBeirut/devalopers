import React, { Component } from 'react';


import Header from "../common/Header";
import login from "../../assets/images/login.jpg";
import Footer from "../common/Footer";
import { AvForm } from "availity-reactstrap-validation";
import FormRow from "../../components/Row/FormRow";
import { Link, withRouter } from "react-router-dom";
import { Input } from "reactstrap";

import CoreEngine from "../../core/CoreEngine";
import RequestEngine from "../../core/RequestEngine";
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";
import Constants from "../../core/Constants";
import { Memory } from "../../core/Memory";
import { connect } from "react-redux";
import redirectAction from "../../core/redux/actions/redirectAction";
import msgcountAction from "../../core/redux/actions/msgcountAction";
import FontAwesome from "react-fontawesome";
import {Utilites} from "../../core/Utilites";




class Login extends CoreEngine {


    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            rememberme: false,
            loading: false,
            error: undefined
        };

        this.engine = new RequestEngine();

    }


    componentDidMount() {

        if(this.props.location && this.props.location.search){
            const url = this.props.location.search;
            const hasCode = url.includes("?code=");
            const hasState = url.includes("&state=");

            debugger
            // If Github API returns the code parameter
            if (hasCode && !hasState) {
                const newUrl = url.split("?code=");
                this.socialBackgroundLogin(newUrl[1],true);
            }
            if (hasCode && hasState) {
                const newUrl = url.split("?code=");
                const code = newUrl[1].split("&state=");
                const state = url.split("&state=");
                this.socialBackgroundLogin(code[0],false,code[1]);
            }
        }
    }



    async socialBackgroundLogin(code,github= true,state=""){
        const regtype = Utilites.getCookie("regtype")
        let requestData = {}
        let proxy_url = "";
        if(github){
            proxy_url = Constants.GITHUBLOGIN;
            requestData = {
                client_id: Constants.REACT_APP_CLIENT_ID,
                redirect_uri: Constants.REACT_APP_REDICRECT_URL,
                client_secret: Constants.REACT_APP_CLIENT_SECRET,
                code: code,
                regtype: regtype
            };
        }else{
            proxy_url = Constants.LINKEDLOGIN;
            requestData = {
                client_id: Constants.LINK_REACT_APP_CLIENT_ID,
                redirect_uri: Constants.LINK_REACT_APP_REDICRECT_URL,
                client_secret: Constants.LINK_REACT_APP_CLIENT_SECRET,
                code: code,
                regtype: regtype,
                state:state
            };
        }
        var engine = new RequestEngine();
        const response = await engine.postFull(proxy_url,requestData);
        if (response && response.status === 200) {
            debugger
            let redirect = this.props.redirect.location
            if (response.data.success) {

                if(regtype!="login"){
                    this.showSucessMessage("Registred , Please login");
                    return;
                }
                const accounttype = response.data.data.accounttype;
                const token = response.data.data.token;
                const userid = response.data.data.userid;
                const picture = response.data.data.picture;
                const msgcount = response.data.data.msgcount;

                Memory.setItem('accounttype', accounttype);
                Memory.setItem('token', token);
                Memory.setItem('userid', userid);
                Memory.setItem('picture', picture);

                Memory.setItem('isloggedin', true);
                this.props.msgcountAction(msgcount)

                if (redirect && redirect.length) {
                    this.props.redirectAction("")
                    this.goToScreen(redirect);
                } else {
                    this.goToScreen((accounttype == "company") ? "/company/home" : "/dev/home");
                }
            }else{
                this.showInlineErrorMessage(response.data.message)
            }

        }

    }
    handleValidSubmit = async () => {

        let redirect = this.props.redirect.location
        this.setState({
            loading: true
        })
        const { rememberme } = this.state
        try {
            const response = await this.engine.postItem("user", this.state, "login")
            if (response && response.status === 200) {

                if (response.data.success) {
                    const accounttype = response.data.data.accounttype;
                    const token = response.data.data.token;
                    const userid = response.data.data.userid;
                    const picture = response.data.data.picture;
                    const msgcount = response.data.data.msgcount;

                    Memory.setRemeberMe(rememberme)

                    Memory.setItem('accounttype', accounttype);
                    Memory.setItem('token', token);
                    Memory.setItem('userid', userid);
                    Memory.setItem('picture', picture);

                    Memory.setItem('isloggedin', true);
                    this.props.msgcountAction(msgcount)
                    if (redirect && redirect.length) {
                        this.props.redirectAction("")
                        this.goToScreen(redirect);
                    } else {
                        this.goToScreen((accounttype == "company") ? "/company/home" : "/dev/home");
                    }
                } else {
                    this.showInlineErrorMessage(response.data.message)
                }



            }
        } catch (e) {
            this.showInlineErrorMessage("error please try again")
        }

        this.setState({
            loading: false
        })

    };



    requestProfile = () => {
        var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${Constants.LINK_REACT_APP_CLIENT_ID}&scope=r_liteprofile&state=123456&redirect_uri=${Constants.LINK_REACT_APP_REDICRECT_URL}`

        window.location = oauthUrl;

    };

    showInlineErrorMessage = error => this.setState({ error })

    render() {

        const { loading,
            rememberme,
            email,
            password } = this.state

        let redirect = ""
        if (this.props && this.props.location && this.props.location.state) {
            redirect = this.props.location.state.redirect;
        }

        const githubloginlink = "https://github.com/login/oauth/authorize?scope=user&client_id="+Constants.REACT_APP_CLIENT_ID+"&redirect_uri="+Constants.REACT_APP_REDICRECT_URL;
        return (
            <>
                <Header />
                <div className="py-5 bg-info">
                    <div className="container sign-in">

                        <div className="row d-flex  bg-white bordershadow ">
                            <div className=" col-lg-6 col-md-6 pl-0 ml-0 pr-0 mr-0 text-left">
                                <img src={login} width="100%" className="img-fluid" alt="Against Cyber Theft" />
                            </div>

                            <div className="p-3 col-lg-6 col-md-6">
                                <div className="card border-0">
                                    <div className="card-body pr-5">
                                        <h2 className="mt-3 font-weight-bold">Log In</h2>
                                        {
                                            this.state.error && (
                                                <div className="alert alert-danger">
                                                    {this.state.error}
                                                </div>
                                            )
                                        }
                                        <AvForm onValidSubmit={() => this.handleValidSubmit()} className="contactinput noshadow">
                                            <FormRow label="Email" name="email" data={email} changeInput={this.changeInput.bind(this)} />



                                                <FormRow label="Password" type="password" name="password" data={password} changeInput={this.changeInput.bind(this)} />


                                            <div className={"row"}>
                                                <div className="col-6 checkbox-row" style={{
                                                    paddingTop: 5, color: "#949292"
                                                }}>


                                                    <Input type="checkbox" id="checkbox" value={rememberme} onChange={rememberme => {
                                                        this.setState({ rememberme: rememberme.target.checked })
                                                    }} /><label for="checkbox"><div style={{ fontSize: 14, position: 'absolute', top: -1, whiteSpace: "nowrap" }} >Remember me?</div></label>
                                                </div>
                                                <div className="col-6 text-right">
                                                    <Link className="nav-link text-primary" to="/forgotpassword" style={{ fontSize: 14, paddingRight: 0, paddingTop: 0, whiteSpace: "nowrap", lineHeight: 2.2 }}>Forgot password?</Link>
                                                </div>
                                            </div>

                                            <div className="align-content-center align-items-center mx-auto text-center mb-3 mt-3">

                                                <ButtonLoader variant="primary" className="btnpostajob btn btn-sm  btn-secondary p-2 m-2 pr-5 pl-5 font-weight-bold" loading={loading}>Log In</ButtonLoader>

                                            </div>

                                            <div class="separator">Or</div>

                                            <div className="row mt-3 mb-3 sm-media">

                                                <div className="col-9 col-md-6 text-right mt-2 mx-auto">

                                                  <a variant="primary" onClick={this.requestProfile} className="btn btn-sm  btn text-white d-flex" style={{background:"#057ABA"}} >
                                                    <FontAwesome name="linkedin" /> <span style={{    position: "relative",
                                                    top: 1,
                                                    left: 15,
                                                }}>Log In with Linkedin</span>
                                                </a>
                                                </div>

                                                <div className="col-9 col-md-6 text-right mt-2 mx-auto">


                                                    <a variant="primary" onClick={()=>{
                                                        Utilites.setCookie("regtype","login");
                                                        window.location=githubloginlink
                                                    }}     className="btn btn-sm  btn text-white d-flex" style={{background:"#444444"}} ><FontAwesome name="github" /> <span style={{    position: "relative",
                                                        top: 1,
                                                        left: 15,
                                                    }}>Log In with GitHub</span></a>

                                                </div>

                                            </div>
                                            <div className="align-content-center align-items-center mx-auto text-center d-flex justify-content-center">

                                                <div style={{ whiteSpace: "nowrap" }}>
                                                    Don't have an account?
                                               </div>
                                                <Link variant="primary" onClick={() => this.goToScreen('/selectanaccount', redirect)} className="btn btn-sm  btn text-secondary font-weight-bold p-0 pl-1" style={{ whiteSpace: "nowrap" }}>
                                                    Sign Up
                                                </Link>
                                            </div>

                                        </AvForm>
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


const mapStateToProps = state => ({
    redirect: state.redirect
});

const mapDispatchToProps = dispatch => ({
    redirectAction: () => dispatch(redirectAction()),
    msgcountAction: (payload) => dispatch(msgcountAction(payload))

});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
