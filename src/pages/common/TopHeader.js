import React from 'react';
import {Button, FormControl} from "react-bootstrap";
import {Link} from "react-router-dom";
import btnsearch from "../../assets/images/btnsearch.png";

function TopHeader({title,subtitle}) {
    return (
        <div className="companybigcover">
            <div className="container">
                <div className="row d-flex">
                    <div className="p-1 ml-5 col-6  text-left   ">
                        <div className=" border-0">
                            <div className="card-body p-3">
                                <h1  className="m-2 text-white font-weight-bold">{title}</h1>
                                <h6  className="m-2 text-white font-weight-bold">{subtitle}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopHeader;
