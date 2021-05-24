import React,{useEffect,useState} from 'react'
import {
    Link, withRouter
} from "react-router-dom";

import {connect} from "react-redux";
//import * as DarkModeToggle from 'dark-mode-toggle';
import {Navbar,Nav,Button,Form,FormControl,Dropdown} from "react-bootstrap"
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import strings from "../../core/translate";
import logotop from "../../assets/images/logo.png"
import logowhite from "../../assets/images/logowhite.png"
import profile from "../../assets/images/profile.png";
import {Memory} from "../../core/Memory";
import FontAwesome from "react-fontawesome";



function Header(props) {

    const [lang, setLang] = useState("en")
    const [picture, setPicture] = useState("");
    const isLoggedin = Memory.getItem("isloggedin")

    const accounttype = Memory.getItem('accounttype');
    const userid = Memory.getItem("userid")

    let iscompany = accounttype=="company"
    let homelink = "/"
    if(isLoggedin){
        homelink = iscompany ?"/company/home":"/dev/home"
    }


  //  const toggle = document.querySelector('dark-mode-toggle');
    const body = document.body;

// Set or remove the `dark` class the first time.
 //   toggle.mode === 'dark' ? body.classList.add('dark') : body.classList.remove('dark');

// Listen for toggle changes (which includes `prefers-color-scheme` changes)
// and toggle the `dark` class accordingly.
   // toggle.addEventListener('colorschemechange', () => {
   //     body.classList.toggle('dark', toggle.mode === 'dark');
  //  });


    useEffect( () => {
        window.scrollTo(0, 0);
    }, [props.location]);
    useEffect(() => {

        const checklang =  Memory.getItem("lang");
        if(checklang=="ar"){
            document.body.classList.add('langar');
            setLang("ar")
            strings.setLanguage('ar');
        }else{
            document.body.classList.remove('langar');
            strings.setLanguage('en');
        }
        const picturefile = Memory.getItem('picture');
        setPicture(picturefile);
    },[]);

    useEffect(() => {

        if(props.updateinfo){
            const picturefile = Memory.getItem('picture');
            setPicture(picturefile);
        }

    },[props.updateinfo]);

    let profileimg = profile;
    if(picture && picture.length){
        profileimg = picture;
    }

    let isdev = true;
    if(accounttype=="company"){
        isdev = false
    }


    const switchLand=(lang) =>{

        if(lang=="ar"){
            Memory.setItem("lang","ar");
            strings.setLanguage('ar');
            window.location.reload()
        }else{
            Memory.setItem("lang","en");
            strings.setLanguage('en');
            window.location.reload()
        }

    }
    //switchLand(lang)
    return (
            <div className="topnav sticky-top">
                <Loading
                    show={props.progress.loading}
                    color="#233E85"
                    showSpinner={true}
                />
                <div className="container">
                    <Navbar className="row navbar  navbar-expand-lg  d-flex d-lg-none fixed-top-mobile" expand="lg">
                        <Navbar.Brand href="/"><img src={logotop} width="160"  alt="logo" /></Navbar.Brand>
                        <Navbar.Toggle variant="dark" color="dark" aria-controls="basic-navbar-nav navbar-dark bg-dark" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto text-primary p-3">
                                {isLoggedin && !iscompany && <Link  to="/jobs"><Nav.Link  href="#home"  className="text-primary" >{strings.jobs}</Nav.Link></Link>}
                                {isLoggedin && iscompany && <Link  to="/talentdirectory"><Nav.Link  href="#talent"   className="text-primary" >{strings.talent}</Nav.Link></Link>}
                                {isLoggedin && <Link  ><Nav.Link  href="#whyus"   className="text-primary" >{strings.why_us}</Nav.Link></Link>}
                                <Link  to="/contactus"><Nav.Link href="#contactus"  className="text-primary" >{strings.contact_us}</Nav.Link></Link>
                                {!isLoggedin && <Link  to="/login"><Nav.Link href="#login"  className="text-primary font-weight-bold" >{strings.login}</Nav.Link></Link>}
                                {!isLoggedin && <Link  to="/selectanaccount"><Nav.Link href="#signup"  className="text-primary font-weight-bold" >{strings.register}</Nav.Link></Link>}
                                {isLoggedin && <Link  to={isdev?"/dev/profile/"+userid:"/company/profile/"+userid}>{strings.profile}</Link>}
                                {isLoggedin && <Link  onClick={() => {
                                    Memory.setItem("isloggedin",false)
                                    Memory.clear()
                                    props.history.push('/');
                                }} >{strings.logout}</Link>}
                            </Nav>

                        </Navbar.Collapse>
                    </Navbar>
                    <nav className="row navbar navbar-expand-lg navbar-dark d-none d-lg-flex">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon text-black-50"/>
                        </button>

                        <div className="col-3">
                            <Link className="blog-header-logo text-dark mainlogoblack" to={homelink}>
                                <img src={logotop} className="img-fluid" alt="logo" />
                            </Link>
                            <Link className="blog-header-logo text-dark mainlogowhite" to={homelink}>
                                <img src={logowhite} className="img-fluid" alt="logo" />
                            </Link>
                        </div>
                        <div className="col-6 col-md-6 pt-1 collapse navbar-collapse bs-navbar-collapse text-center" id="navigation">
                            <ul className="nav navbar-nav mx-auto">
                                {(isLoggedin && !iscompany || !isLoggedin) && <li className="nav-item"><Link className="nav-link text-dark" to="/jobs">{strings.jobs}</Link></li>}
                                {(isLoggedin && iscompany || !isLoggedin) && <li className="nav-item"><Link className="nav-link text-dark" to="/talentdirectory">{strings.talent}</Link></li>}
                                {(!isLoggedin) && <li className="nav-item"><a className="nav-link text-dark" href="../#whyussection">{strings.why_us}</a></li>}
                                <li className="nav-item"><Link className="nav-link text-dark" to="/contactus">{strings.contact_us}</Link></li>

                            </ul>
                        </div>

                        {!isLoggedin ?<div className="col-4 d-flex justify-content-end align-items-center">
                            <Link className="btn btn-sm  btn text-secondary" to="/login">{strings.log_in}</Link>

                            <Link to="/selectanaccount" className="btn btn-sm  btn-secondary p-2  "  >
                                {strings.create_an_account}
                            </Link>

                            {/* <Dropdown>
                                <Dropdown.Toggle className=" bg-transparent font-weight-bold" id="dropdown-basic">
                                    {lang=="ar"?"AR":"EN"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={()=>switchLand(lang=="ar"?"en":"ar")} href="#">{lang=="ar"?"EN":"AR"}</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> */}
                        </div>:<div className="col-4 d-flex justify-content-end align-items-center">

                            {iscompany && <Link to="/postajob" className="btn btn-sm  btn-secondary p-2 pr-3 "  style={{height:44, fontSize:"20px"}}>
                                <FontAwesome name="plus"  className="social" style={{marginTop:1}}  size="1x" />
                               Post a job
                            </Link>}
                            <Dropdown>
                                <Dropdown.Toggle className=" bg-transparent font-weight-bold" id="dropdown-basic">
                                       <div style={{    float: "left",
                                           marginTop:0}}>
                                           <div className="headerprofile">
                                               <img src={profileimg} className="pt-0"   />
                                           </div>
                                       </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Link  to={isdev?"/dev/profile/"+userid:"/company/profile/"+userid}><Dropdown.Item href={isdev?"/dev/profile/"+userid:"/company/profile/"+userid}>{strings.profile}</Dropdown.Item></Link>

                                    <a  onClick={() => {
                                        Memory.setItem("isloggedin",false)
                                        Memory.clear()
                                            props.history.push('/');
                                    }}><Dropdown.Item href="/">{strings.logout}</Dropdown.Item></a>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown>
                                {/* ALI J.: temp hidden till we get the final localization */}
                                {/* <Dropdown.Toggle className=" bg-transparent font-weight-bold" id="dropdown-basic">
                                    {lang=="ar"?"AR":"EN"}
                                </Dropdown.Toggle> */}
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={()=>switchLand(lang=="ar"?"en":"ar")} href="#">{lang=="ar"?"EN":"AR"}</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>}
                    </nav>
                </div>
            </div>
    );
}


const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
   // resetMsg: () => dispatch(resetMsg()),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
