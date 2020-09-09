import React from 'react';

import { Link } from "react-router-dom";
import { Memory } from "../../core/Memory";
import FontAwesome from "react-fontawesome";

function CompanyHeader({ selected = 0 }) {
    const userid = Memory.getItem("userid")
    const accounttype = Memory.getItem("accounttype")

    return (
        <div className="profilemenu">
            <div className="container">
                <div className="menu">
                    <div className="menu-tab">
                        <Link to="/company/home" className={"mt-3 font-weight-bold greyheader " + (selected === 0 && "linkselected")}><FontAwesome name="home" className="social" size="1x" />Home</Link>
                    </div>
                    {
                        accounttype && accounttype.toLowerCase() === 'company' &&
                        <div className="menu-tab">
                            <Link to="/company/activejobs" className={"mt-3 font-weight-bold greyheader " + (selected === 1 && "linkselected")}><FontAwesome name="briefcase" className="social" size="1x" />Job Posts</Link>
                        </div>
                    }
                    <div className="menu-tab">
                        <Link to="/company/applicantslist" className={"mt-3 font-weight-bold greyheader " + (selected === 2 && "linkselected")}><FontAwesome name="edit" className="social" size="1x" />Applicants</Link>
                    </div>
                    <div className="menu-tab">
                        <Link to="/company/messages" className={"mt-3 font-weight-bold greyheader " + (selected === 3 && "linkselected")}><FontAwesome name="inbox" className="social" size="1x" />Messages</Link>
                    </div>
                    <div className="menu-tab">
                        <Link to={"/company/profile/" + userid} className={"mt-3 font-weight-bold greyheader " + (selected === 4 && "linkselected")}><FontAwesome name="user" className="social" size="1x" />Profile</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyHeader;
