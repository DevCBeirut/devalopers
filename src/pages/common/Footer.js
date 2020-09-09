import React from 'react';
import FontAwesome from "react-fontawesome";
import logotop from "../../assets/images/logowhite.png"
import strings from "../../core/translate";
import {Link, withRouter} from "react-router-dom";
import {Memory} from "../../core/Memory";

function Footer(props) {
    return (
        <div className="bg-primary text-light " id="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 p-3 d-none d-md-block">

                        <h5 className=""><img src={logotop}   alt="logo" /></h5>

                        <ul className="list-unstyled    ">
                            <li><a href="/termsandconditions">{strings.terms_and_conditions}</a></li>
                            <li><a href="/privacypolicy">{strings.data_protection}</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 p-3 footsection">
                        <h5 className="font-weight-bold">{strings.about}</h5>

                        <ul className="list-unstyled">
                            <li><a href="../#whyussection">{strings.why_us}</a></li>

                            <li><a href="../#mostsearchedskillssect">{strings.most_searched_skills}</a></li>
                            <li><a href="../#mostactivecompaniessect">{strings.most_active_companies}</a></li>

                            <li><a href="../#testimonialssect">{strings.testimonials}</a></li>
                            <li><Link to="/contactus">{strings.contact_us}</Link></li>
                        </ul>
                    </div>

                    <div className="col-lg-2 col-md-6 p-3 footsection">
                        <h5 className="font-weight-bold">{strings.services}</h5>
                        <ul className="list-unstyled ">
                            <li><Link onClick={() => {
                                const accounttype=Memory.getItem("accounttype");
                                if(accounttype && accounttype =="company"){
                                    props.history.push('/postajob');
                                }else {
                                    props.history.push('/login',{
                                        redirect:'/postajob'
                                    });
                                }

                            }}>{strings.post_jobs}</Link></li>
                            <li><Link to="/talentdirectory">{strings.hire_talents}</Link></li>
                        </ul>
                    </div>

                    <div className="col-lg-4 col-md-6 p-3 footsection text-center">
                        <h5 className="font-weight-bold">{strings.follow_us_on_social}</h5>

                        <div className="mobilecenter">
                            <a href="https://www.instagram.com/devalopers"><FontAwesome name="instagram" className="m-2 social" size="2x"/></a>
                            <a href='https://www.facebook.com/salah.awad.lb'><FontAwesome name="facebook-square" className="m-2 social" size="2x"/></a>
                            <a href="https://www.linkedin.com/devalopers"><FontAwesome name="linkedin" className="m-2 social" size="2x"/></a>
                            <a href="https://www.twitter.com/devalopers"><FontAwesome name="twitter" className="m-2 social" size="2x"/></a>
                        </div>
                    </div>

                </div>
                <div className="text-center pb-3 pl-4 align-content-center ">
                    <h5 className="font-weight-bold">{strings.copyright_2020}</h5>
                </div>

            </div>
        </div>
    );
}

export default withRouter(Footer);
