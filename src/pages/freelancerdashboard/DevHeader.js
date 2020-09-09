import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { Memory } from "../../core/Memory";
import FontAwesome from "react-fontawesome";
import { connect } from "react-redux";

function DevHeader({ selected = 0, count }) {
    const userid = Memory.getItem("userid")
    let msgcount = count.count;
    return (
        <div className="profilemenu">
            <div className="container">
                <div className="menu">
                    <div className="menu-tab">
                        <Link to="/dev/home" className={"mt-3 font-weight-bold greyheader " + (selected === 0 && "linkselected")}><FontAwesome name="home" className="social" size="1x" />Home</Link>
                    </div>
                    <div className="menu-tab">
                        <Link to="/dev/messages" className={"mt-3 font-weight-bold greyheader " + (selected === 1 && "linkselected")}>{msgcount > 0 && <span className="msgcount">{msgcount}</span>}<FontAwesome name="inbox" className="social" size="1x" />Messages</Link>
                    </div>
                    <div className="menu-tab">
                        <Link to={"/dev/savedjobs"} className={"mt-3 font-weight-bold greyheader " + (selected === 2 && "linkselected")}><FontAwesome name="save" className="social" size="1x" />Saved Job</Link>
                    </div>
                    <div className="menu-tab">
                        <Link to={"/dev/submitapplication"} className={"mt-3 font-weight-bold greyheader " + (selected === 3 && "linkselected")}><FontAwesome name="edit" className="social" size="1x" />Applications</Link>
                    </div>
                    <div className="menu-tab">
                        <Link to={"/dev/profile/" + userid} className={"mt-3 font-weight-bold greyheader " + (selected === 4 && "linkselected")}><FontAwesome name="user" className="social" size="1x" />Profile</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}



const mapStateToProps = state => ({
    count: state.count
});

const mapDispatchToProps = dispatch => ({
    // resetMsg: () => dispatch(resetMsg()),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DevHeader));
