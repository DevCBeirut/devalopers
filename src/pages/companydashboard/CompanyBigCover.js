import React, { useState } from 'react';
import { Button, FormControl } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import btnsearch from "../../assets/images/btnsearch.png";

function CompanyBigCover(props) {

    const [searchkey, setSearchkey] = useState("");
    return (
        <div className="companybigcover">
            <div className="container">
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-5 text-left">
                        <div className=" border-0">
                            <h1 className="text-white font-weight-bold">Find Quality Tech Professionals</h1>
                            <div className="flex-lg-row">
                                <div className="d-flex-inline">
                                    <FormControl maxlength="250" type="text" value={searchkey} onKeyPress={event => {
                                        if (event.key === "Enter") {
                                            props.history.push('/talentdirectory?' + searchkey);
                                        }
                                    }} onChange={searchkey => {
                                        setSearchkey(searchkey.target.value)
                                    }} placeholder="Search by Skill" className="txtsearch " />

                                    <a href="#" id="searchicon" style={{ bottom: "22%", right: "15px" }}><img src={btnsearch} /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <Link to="/allskills" className="viewskills">View all skills</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(CompanyBigCover);
